import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../app/components/ProductCard';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jthsqhmseqiygkiayehp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0aHNxaG1zZXFpeWdraWF5ZWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTIzNzUsImV4cCI6MjA5NjI2ODM3NX0.Y74RTr_WnOXPykYVPz7fhHKF2ZmRuatSw2x3iS9OnBY';

// Singleton guard — prevents multiple GoTrueClient instances during HMR
const GLOBAL_KEY = '__supabase_singleton__';
declare global { interface Window { [GLOBAL_KEY]?: SupabaseClient } }

function getClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    if (!window[GLOBAL_KEY]) {
      window[GLOBAL_KEY] = createClient(supabaseUrl, supabaseAnonKey);
    }
    return window[GLOBAL_KEY]!;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getClient();

// Database types
export interface DbProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | null;
  description: string | null;
  comment: string | null;
  quantity: number;
  in_stock: boolean;
  row_order: number;
  created_at: string;
  updated_at: string;
}

// Whether the row_order column is confirmed to exist
let rowOrderColumnExists: boolean | null = null;

export function productToDb(product: Product, rowOrder = 0): Omit<DbProduct, 'created_at' | 'updated_at'> {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image || null,
    description: product.description || null,
    comment: product.comment || null,
    quantity: product.quantity,
    in_stock: product.inStock,
    row_order: rowOrder,
  };
}

// Same but omits row_order for use before the column exists
function productToDbLegacy(product: Product): Omit<DbProduct, 'created_at' | 'updated_at' | 'row_order'> {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image || null,
    description: product.description || null,
    comment: product.comment || null,
    quantity: product.quantity,
    in_stock: product.inStock,
  };
}

export function dbToProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.category,
    price: dbProduct.price,
    image: dbProduct.image || '',
    description: dbProduct.description || '',
    comment: dbProduct.comment || '',
    quantity: dbProduct.quantity,
    inStock: dbProduct.in_stock,
  };
}

// Fetch all products, using row_order if available, falling back to created_at
async function fetchProducts(category?: string): Promise<Product[]> {
  const buildQuery = (orderCol: string) => {
    let q = supabase.from('products').select('*');
    if (category) q = q.eq('category', category);
    return q.order(orderCol, { ascending: true });
  };

  // Try row_order first (fast path if we already know)
  if (rowOrderColumnExists !== false) {
    const { data, error } = await buildQuery('row_order');
    if (!error) {
      rowOrderColumnExists = true;
      return (data || []).map(dbToProduct);
    }
    if (error.code === '42703') {
      // Column doesn't exist yet — remember and fall through
      rowOrderColumnExists = false;
      console.warn('row_order column not found, falling back to created_at. Run: ALTER TABLE products ADD COLUMN row_order integer DEFAULT 0;');
    } else {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Fallback: order by created_at
  const { data, error } = await buildQuery('created_at');
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  return (data || []).map(dbToProduct);
}

export const productService = {
  async getAll(): Promise<Product[]> {
    return fetchProducts();
  },

  async getByCategory(category: string): Promise<Product[]> {
    return fetchProducts(category);
  },

  async upsert(product: Product, rowOrder = 0): Promise<void> {
    const payload = rowOrderColumnExists === false
      ? productToDbLegacy(product)
      : productToDb(product, rowOrder);
    const { error } = await supabase
      .from('products')
      .upsert(payload as any, { onConflict: 'id' });
    if (error) {
      console.error('Error upserting product:', error);
      throw error;
    }
  },

  // Replace all products — upsert new set, then delete any IDs no longer in the spreadsheet
  async bulkUpsert(products: Product[]): Promise<void> {
    const useRowOrder = rowOrderColumnExists !== false;

    // Step 1: upsert all products from the new spreadsheet
    let dbProducts: any[] = products.map((p, i) =>
      useRowOrder ? productToDb(p, i) : productToDbLegacy(p)
    );

    let { error: upsertError } = await supabase
      .from('products')
      .upsert(dbProducts, { onConflict: 'id' });

    // If row_order column is missing, retry without it
    if (upsertError?.code === '42703') {
      rowOrderColumnExists = false;
      dbProducts = products.map(productToDbLegacy);
      const { error: retryError } = await supabase
        .from('products')
        .upsert(dbProducts, { onConflict: 'id' });
      if (retryError) throw retryError;
      upsertError = null;
    }

    if (upsertError) throw upsertError;

    // Step 2: fetch every ID currently in the database
    const { data: existingRows, error: fetchError } = await supabase
      .from('products')
      .select('id');

    if (fetchError) throw fetchError;

    // Step 3: delete any ID that is not in the new spreadsheet
    const newIds = new Set(products.map(p => p.id));
    const idsToDelete = (existingRows || [])
      .map((r: any) => r.id)
      .filter((id: string) => !newIds.has(id));

    if (idsToDelete.length > 0) {
      console.log(`🗑️ Removing ${idsToDelete.length} deleted item(s):`, idsToDelete);
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        console.error('Error deleting removed products:', deleteError);
        throw deleteError;
      }
    }
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async deleteAll(): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .neq('id', '');
    if (error) {
      console.error('Error deleting all products:', error);
      throw error;
    }
  },
};
