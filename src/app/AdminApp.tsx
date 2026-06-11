import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard, Product } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Search, SlidersHorizontal, FileText, Grid3x3, Globe, LogOut, Loader2, Trash2 } from 'lucide-react';
import { ExcelImport } from './components/ExcelImport';
import { PrintCatalogue } from './components/PrintCatalogue';
import { PDFExport } from './components/PDFExport';
import { ImageUploadHelper } from './components/ImageUploadHelper';
import { ImageManager } from './components/ImageManager';
import { ScrollableCatalogue } from './components/ScrollableCatalogue';
import { AdminLogin } from './components/AdminLogin';
import { productService } from '../lib/supabase';
import { getSortedCategories } from '../lib/categoryOrder';

interface AdminAppProps {
  initialProducts: Product[];
}

export function AdminApp({ initialProducts }: AdminAppProps) {
  const navigate = useNavigate();

  // Check admin authentication
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('admin-authenticated') === 'true';
  });

  // Load products from database
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'print' | 'web'>('grid');
  const printRef = useRef<HTMLDivElement>(null);

  // Print options
  const [showPriceList, setShowPriceList] = useState(true);
  const [showCategoryTotals, setShowCategoryTotals] = useState(true);
  const [showGrandTotal, setShowGrandTotal] = useState(true);

  // Load products from database on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoadingProducts(true);
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
      setIsLoadingProducts(false);
    }
  };

  const categories = useMemo(() => getSortedCategories(products), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleImport = (importedProducts: Product[]) => {
    console.log('📥 Imported', importedProducts.length, 'products to database');
    // Reload from database to get fresh data
    loadProducts();
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleResetToDefault = () => {
    if (confirm('Reset to default products? This will clear your uploaded catalogue.')) {
      setProducts(initialProducts);
      setSelectedCategory(null);
      setSearchQuery('');
    }
  };

  const handleClearAll = async () => {
    if (!confirm(`Clear ALL ${products.length} products from the database?\n\nAfter clearing, use "Import from Excel" to reload your spreadsheet.`)) return;
    setIsClearing(true);
    try {
      await productService.deleteAll();
      setProducts([]);
      setSelectedCategory(null);
      setSearchQuery('');
      alert('✅ Database cleared. Now import your Excel file to reload the catalogue.');
    } catch (err: any) {
      alert('❌ Failed to clear database: ' + err.message);
    } finally {
      setIsClearing(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    if (confirm('Logout from admin panel?')) {
      sessionStorage.removeItem('admin-authenticated');
      setIsAdmin(false);
      navigate('/');
    }
  };

  // Show login if not authenticated
  if (!isAdmin) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === 'grid' && (
        <>
          {/* Header */}
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl">Estate Collection Catalogue - Admin Panel</h1>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{filteredProducts.length} items</Badge>
                  <Badge className="bg-green-600 text-white">Logged in as Admin</Badge>
                  <ExcelImport onImport={handleImport} />
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    disabled={isClearing || products.length === 0}
                    className="gap-2 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    {isClearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    Clear All
                  </Button>
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
                  <Button
                    variant="destructive"
                    onClick={handleAdminLogout}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
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

      {viewMode === 'print' && (
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
                  <Badge className="bg-green-600 text-white">Admin Mode</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <PDFExport targetRef={printRef} filename="estate-catalogue.pdf" />
                  <Button
                    variant="destructive"
                    onClick={handleAdminLogout}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Print Options Panel - No Print */}
          <div className="bg-blue-50 border-t border-blue-200 py-4 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold mb-3 text-gray-900">Print Options</h3>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPriceList}
                      onChange={(e) => setShowPriceList(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Include Complete Price List Page</span>
                  </label>

                  {showPriceList && (
                    <>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showCategoryTotals}
                          onChange={(e) => setShowCategoryTotals(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Show Category Subtotals</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showGrandTotal}
                          onChange={(e) => setShowGrandTotal(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Show Grand Total</span>
                      </label>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  These options control what appears in the print preview and PDF export
                </p>
              </div>
            </div>
          </div>

          {/* Print Catalogue */}
          <div ref={printRef}>
            <PrintCatalogue
              products={products}
              showPriceList={showPriceList}
              showCategoryTotals={showCategoryTotals}
              showGrandTotal={showGrandTotal}
            />
          </div>
        </div>
      )}

      {viewMode === 'web' && (
        <div className="min-h-screen bg-white">
          {/* Web View Header */}
          <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setViewMode('grid')}
                    className="gap-2"
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Admin Panel
                  </Button>
                  <Badge variant="outline">{products.length} items in catalogue</Badge>
                  <Badge className="bg-green-600 text-white">Admin Preview</Badge>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleAdminLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Catalogue */}
          <ScrollableCatalogue products={products} />
        </div>
      )}
    </div>
  );
}
