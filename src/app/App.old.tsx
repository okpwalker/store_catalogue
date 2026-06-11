import { useState, useMemo, useRef, useEffect } from 'react';
import { ProductCard, Product } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Search, SlidersHorizontal, FileText, Grid3x3, Globe, LogOut, LogIn } from 'lucide-react';
import { ExcelImport } from './components/ExcelImport';
import { PrintCatalogue } from './components/PrintCatalogue';
import { PDFExport } from './components/PDFExport';
import { ImageUploadHelper } from './components/ImageUploadHelper';
import { ImageManager } from './components/ImageManager';
import { ScrollableCatalogue } from './components/ScrollableCatalogue';
import { AdminLogin } from './components/AdminLogin';

const mockProducts: Product[] = [
  {
    id: 'FN-001',
    name: 'Modern Accent Chair',
    category: 'Seating',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1760716478137-d861d5b354e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjI2MDM0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Elegant modern chair with premium upholstery and solid wood legs.',
    comment: 'Perfect for any contemporary space',
    quantity: 5,
    inStock: true,
  },
  {
    id: 'FN-002',
    name: 'Minimalist Desk',
    category: 'Tables',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1696087225391-eb97abf5ba20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdGFibGUlMjBkZXNrfGVufDF8fHx8MTc2MjYwMzQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Clean-lined desk with ample workspace.',
    comment: 'Features durable construction and timeless design',
    quantity: 3,
    inStock: true,
  },
  {
    id: 'FN-003',
    name: 'Contemporary Sofa',
    category: 'Seating',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1759722665935-0967b4e0da93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwY291Y2h8ZW58MXx8fHwxNzYyNTIyODg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Luxurious 3-seater sofa with plush cushioning and premium fabric.',
    comment: 'A statement piece for your living room',
    quantity: 0,
    inStock: false,
  },
  {
    id: 'FN-004',
    name: 'Modern Bookshelf',
    category: 'Storage',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1755696923054-df9b046619df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBzdG9yYWdlfGVufDF8fHx8MTc2MjUzNjkyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Spacious bookshelf with adjustable shelves.',
    comment: 'Perfect for displaying books, plants, and decorative items',
    quantity: 7,
    inStock: true,
  },
  {
    id: 'FN-005',
    name: 'Designer Table Lamp',
    category: 'Lighting',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1676318813569-569623e88339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYW1wJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzYyNTA2MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Sculptural table lamp with warm ambient lighting.',
    comment: 'Adds sophistication to any room',
    quantity: 12,
    inStock: true,
  },
  {
    id: 'FN-006',
    name: 'Decorative Wall Mirror',
    category: 'Decor',
    price: 229.99,
    image: 'https://images.unsplash.com/photo-1711006777187-2c991e1b90b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwbWlycm9yfGVufDF8fHx8MTc2MjYwMzQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Elegant wall mirror with unique frame design.',
    comment: 'Creates an illusion of more space and light',
    quantity: 4,
    inStock: true,
  },
  {
    id: 'FN-007',
    name: 'Platform Bed Frame',
    category: 'Bedroom',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWQlMjBiZWRyb29tfGVufDF8fHx8MTc2MjU3MjE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Sturdy platform bed with clean lines and modern aesthetics.',
    comment: 'Includes under-bed storage space',
    quantity: 2,
    inStock: true,
  },
  {
    id: 'FN-008',
    name: 'Dining Chair Set',
    category: 'Seating',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjBjaGFpcnxlbnwxfHx8fDE3NjI2MDM0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Set of 4 dining chairs with ergonomic design and durable construction.',
    comment: 'Ideal for family gatherings',
    quantity: 6,
    inStock: true,
  },
];

export default function App() {
  // Check if we're in public view mode (for hosted site)
  const isPublicView = window.location.hostname.includes('netlify.app') ||
                       window.location.hostname !== 'localhost';

  // Check admin authentication
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('admin-authenticated') === 'true';
  });

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Load products from localStorage or use mockProducts as default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('catalogue-products');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        console.log('✅ Loaded', parsed.length, 'products from localStorage');
        return parsed;
      } else {
        console.log('ℹ️ No saved products found, using mock products');
      }
    } catch (error) {
      console.error('❌ Error loading saved products:', error);
    }
    return mockProducts;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'print' | 'web'>(isPublicView ? 'web' : 'grid');
  const printRef = useRef<HTMLDivElement>(null);

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('catalogue-products', JSON.stringify(products));
      console.log('💾 Saved', products.length, 'products to localStorage');
    } catch (error) {
      console.error('❌ Error saving products:', error);
    }
  }, [products]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return cats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleImport = (importedProducts: Product[]) => {
    console.log('📥 Importing', importedProducts.length, 'products from Excel');
    setProducts(importedProducts);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleResetToDefault = () => {
    if (confirm('Reset to default products? This will clear your uploaded catalogue.')) {
      setProducts(mockProducts);
      setSelectedCategory(null);
      setSearchQuery('');
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setViewMode('grid');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('admin-authenticated');
    setIsAdmin(false);
    setViewMode('web');
  };

  const handleRequestAdminAccess = () => {
    setShowAdminLogin(true);
  };

  // Show admin login if requested
  if (showAdminLogin) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === 'grid' && (!isPublicView || isAdmin) && (
        <>
          {/* Header */}
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl">Estate Collection Catalogue v2.0</h1>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{filteredProducts.length} items</Badge>
                  {products !== mockProducts && products.length !== mockProducts.length && (
                    <Badge className="bg-green-600 text-white">Custom Data Loaded ✓</Badge>
                  )}
                  <ExcelImport onImport={handleImport} />
                  <ImageManager products={products} onUpdateProducts={setProducts} />
                  <Button
                    variant="outline"
                    onClick={() => setViewMode('web')}
                    className="gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Web View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setViewMode('print')}
                    className="gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Print View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleResetToDefault}
                    className="gap-2 text-xs"
                  >
                    Reset to Default
                  </Button>
                  {isPublicView && isAdmin && (
                    <Button
                      variant="destructive"
                      onClick={handleAdminLogout}
                      className="gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant={showFilters ? 'default' : 'outline'}
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Image Upload Helper */}
            <ImageUploadHelper
              products={products}
              onUpdateProducts={setProducts}
            />

            {/* Filters */}
            {showFilters && (
              <div className="bg-white rounded-lg p-6 mb-6 border">
                <h3 className="mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Modal */}
          <ProductModal
            product={selectedProduct}
            open={!!selectedProduct}
            onOpenChange={(open) => !open && setSelectedProduct(null)}
          />
        </>
      )}

      {viewMode === 'print' && (!isPublicView || isAdmin) && (
        <div className="min-h-screen bg-white">
          {/* Print View Header */}
          <div className="bg-white border-b sticky top-0 z-10 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setViewMode('grid')}
                    className="gap-2"
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Back to Grid View
                  </Button>
                  <Badge variant="outline">{products.length} items in catalogue</Badge>
                  {isAdmin && <Badge className="bg-green-600 text-white">Logged in as Admin</Badge>}
                </div>
                <div className="flex items-center gap-3">
                  <PDFExport targetRef={printRef} filename="furniture-catalogue.pdf" />
                  {isPublicView && isAdmin && (
                    <Button
                      variant="destructive"
                      onClick={handleAdminLogout}
                      className="gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Print Catalogue */}
          <div ref={printRef}>
            <PrintCatalogue products={products} />
          </div>
        </div>
      )}

      {viewMode === 'web' && (
        <div className="min-h-screen bg-white">
          {/* Web View Header */}
          {(!isPublicView || isAdmin) && (
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isAdmin && (
                      <Button
                        variant="outline"
                        onClick={() => setViewMode('grid')}
                        className="gap-2"
                      >
                        <Grid3x3 className="w-4 h-4" />
                        Admin Panel
                      </Button>
                    )}
                    <Badge variant="outline">{products.length} items in catalogue</Badge>
                    {isAdmin && <Badge className="bg-green-600 text-white">Logged in as Admin</Badge>}
                  </div>
                  {isPublicView && isAdmin && (
                    <Button
                      variant="destructive"
                      onClick={handleAdminLogout}
                      className="gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Admin Login Button - Fixed position for public non-admin users */}
          {isPublicView && !isAdmin && (
            <div className="fixed bottom-8 right-8 z-50">
              <Button
                onClick={handleRequestAdminAccess}
                className="gap-2 shadow-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-base"
              >
                <LogIn className="w-5 h-5" />
                Admin Login
              </Button>
            </div>
          )}

          {/* Scrollable Catalogue */}
          <ScrollableCatalogue products={products} />
        </div>
      )}
    </div>
  );
}
