import { useState, useEffect } from 'react';
import { Product } from './components/ProductCard';
import { ScrollableCatalogue } from './components/ScrollableCatalogue';
import { productService } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface PublicCatalogueProps {
  initialProducts: Product[];
}

export function PublicCatalogue({ initialProducts }: PublicCatalogueProps) {
  // Load products from database
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const dbProducts = await productService.getAll();
      if (dbProducts.length > 0) {
        console.log('✅ Loaded', dbProducts.length, 'products from database');
        setProducts(dbProducts);
      } else {
        console.log('ℹ️ No products in database, using initial products');
        setProducts(initialProducts);
      }
    } catch (error) {
      console.error('❌ Error loading products from database:', error);
      setProducts(initialProducts);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading catalogue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Scrollable Catalogue - No admin controls visible */}
      <ScrollableCatalogue products={products} />
    </div>
  );
}
