import { Product } from './ProductCard';
import { Badge } from './ui/badge';
import { CORSImage } from './CORSImage';
import splashImage from '../../imports/20260428_221711.jpg';

interface PrintCatalogueProps {
  products: Product[];
  title?: string;
}

export function PrintCatalogue({ products, title = 'Estate Collection Catalogue v2.0' }: PrintCatalogueProps) {
  // Helper function to pluralize category names
  const pluralize = (word: string): string => {
    const lower = word.toLowerCase();
    // Handle common irregular plurals
    if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('z') ||
        lower.endsWith('ch') || lower.endsWith('sh')) {
      return word + 'es';
    }
    if (lower.endsWith('y') && !'aeiou'.includes(lower[lower.length - 2])) {
      return word.slice(0, -1) + 'ies';
    }
    return word + 's';
  };

  return (
    <div className="print-catalogue bg-white">
      {/* Cover Page - Beautiful Splash */}
      <div className="page cover-page relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <CORSImage
            src={splashImage}
            alt="Estate Collection"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-12 text-white">
          <div className="text-center max-w-3xl">
            <div className="mb-8">
              <div className="inline-block px-6 py-2 border-2 border-white/50 rounded-full mb-6">
                <p className="text-sm uppercase tracking-widest">Fine Collectibles & Antiques</p>
              </div>
            </div>

            <h1 className="text-7xl mb-6 font-serif leading-tight">{title}</h1>

            <div className="w-24 h-1 bg-white/70 mx-auto mb-6"></div>

            <p className="text-2xl text-white mb-12 font-medium splash-subtitle">
              A Curated Selection of Vintage Treasures
            </p>

            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="text-center">
                <p className="text-4xl font-light mb-1">{products.length}</p>
                <p className="text-sm uppercase tracking-wider">Items</p>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <p className="text-4xl font-light mb-1">{Array.from(new Set(products.map(p => p.category))).length}</p>
                <p className="text-sm uppercase tracking-wider">Categories</p>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <p className="text-lg font-light mb-1">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p className="text-sm uppercase tracking-wider">Catalogue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant bottom decoration */}
        <div className="absolute bottom-12 left-0 right-0 text-center">
          <div className="inline-block px-8 py-3 border border-white/30 backdrop-blur-sm">
            <p className="text-white/70 text-sm tracking-wide">Carefully curated • Authentically sourced • Expertly catalogued</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="page min-h-screen p-12 break-before-page bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4 font-serif">Table of Contents</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Browse our curated collection by category</p>
          </div>

          <div className="grid gap-4">
            {Array.from(new Set(products.map(p => p.category))).map((category, idx) => {
              const categoryProducts = products.filter(p => p.category === category);
              const minPrice = Math.min(...categoryProducts.map(p => p.price));

              return (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl mb-2 font-serif">{category}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">{categoryProducts.length}</span>
                          <span>{categoryProducts.length === 1 ? 'item' : 'items'}</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <span>prices from</span>
                          <span className="font-medium">${minPrice.toFixed(0)}</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <span>{categoryProducts.filter(p => p.inStock && p.quantity > 0).length}</span>
                          <span>in stock</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <span className="text-sm text-gray-400 uppercase tracking-wider">Section {idx + 1}</span>
                      <p className="text-gray-500 text-sm mt-1">Page {idx + 3}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Items in Catalogue</span>
              <span className="font-medium text-lg">{products.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Pages - Grouped by Category */}
      {Array.from(new Set(products.map(p => p.category))).map((category, categoryIndex) => {
        const categoryProducts = products.filter(p => p.category === category);
        const availableCount = categoryProducts.filter(p => p.inStock && p.quantity > 0).length;
        const totalValue = categoryProducts.reduce((sum, p) => sum + p.price, 0);
        const avgPrice = totalValue / categoryProducts.length;

        return (
          <div key={category}>
            {/* Category Header Page - Enhanced */}
            <div className="page min-h-screen p-12 break-before-page relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/30 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col justify-center items-center min-h-full">
                <div className="text-center max-w-2xl">
                  {/* Section indicator */}
                  <div className="mb-6">
                    <div className="inline-block px-6 py-2 border-2 border-gray-800 rounded-full">
                      <p className="text-sm uppercase tracking-widest text-gray-700">Section {categoryIndex + 1}</p>
                    </div>
                  </div>

                  {/* Category name */}
                  <h2 className="text-7xl mb-8 font-serif text-gray-900">{pluralize(category)}</h2>

                  <div className="w-32 h-1 bg-gray-800 mx-auto mb-8"></div>

                  {/* Category stats */}
                  <div className="grid grid-cols-2 gap-8 mb-12 max-w-xl mx-auto">
                    <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                      <p className="text-4xl font-light mb-2 text-gray-900">{categoryProducts.length}</p>
                      <p className="text-sm uppercase tracking-wider text-gray-600">Total Items</p>
                    </div>
                    <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                      <p className="text-4xl font-light mb-2 text-green-700">{availableCount}</p>
                      <p className="text-sm uppercase tracking-wider text-gray-600">Available</p>
                    </div>
                  </div>

                  {/* Category description */}
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {categoryProducts.length} curated items from ${Math.min(...categoryProducts.map(p => p.price)).toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Products - Grid Layout with Pagination */}
            {(() => {
              const itemsPerPage = 6; // 2 rows of 3 items
              const pageCount = Math.ceil(categoryProducts.length / itemsPerPage);
              const pages = [];

              for (let pageNum = 0; pageNum < pageCount; pageNum++) {
                const startIdx = pageNum * itemsPerPage;
                const endIdx = Math.min(startIdx + itemsPerPage, categoryProducts.length);
                const pageProducts = categoryProducts.slice(startIdx, endIdx);

                pages.push(
                  <div key={`${category}-page-${pageNum}`} className="page min-h-screen p-12 break-before-page">
                    {/* Section header */}
                    <div className="mb-6 pb-3 border-b-2 border-gray-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Section {categoryIndex + 1}</p>
                          <h3 className="text-2xl font-serif text-gray-900">{category}</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          {pageCount > 1 ? `Page ${pageNum + 1} of ${pageCount} • ` : ''}
                          {categoryProducts.length} total items
                        </p>
                      </div>
                    </div>

                    {/* Products Grid - 3 columns */}
                    <div className="grid grid-cols-3 gap-8">
                      {pageProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm break-inside-avoid"
                        >
                          {/* Product Image - Larger */}
                          <div className="aspect-square bg-gray-50 flex items-center justify-center p-3">
                            <CORSImage
                              src={product.image}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="p-4">
                            <div className="mb-2">
                              {!product.inStock || product.quantity === 0 ? (
                                <Badge className="bg-gray-400 text-white text-xs">Sold</Badge>
                              ) : (
                                <Badge className="bg-green-600 text-white text-xs">Available</Badge>
                              )}
                            </div>

                            {/* Full product name - no truncation */}
                            <h4 className="font-semibold text-base mb-3 leading-tight text-blue-600">{product.name}</h4>

                            {/* Smaller price */}
                            <div className="mb-3">
                              <p className="text-lg font-bold text-gray-900"><span className="font-normal text-sm">Asking Price:</span> ${product.price.toFixed(2)}</p>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1 mb-2">
                              <p><span className="font-medium">Item:</span> {product.id}</p>
                              <p><span className="font-medium">Qty:</span> {product.quantity}</p>
                            </div>

                            {/* Full comment - no truncation */}
                            {product.comment && (
                              <p className="text-xs text-gray-500 italic mt-2 leading-relaxed">
                                {product.comment}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Page Footer */}
                    <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-sm text-gray-400 border-t pt-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{title}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{category} Section</span>
                      </div>
                      <div className="text-gray-500">
                        Showing items {startIdx + 1}-{endIdx} of {categoryProducts.length}
                      </div>
                    </div>
                  </div>
                );
              }

              return pages;
            })()}
          </div>
        );
      })}

      {/* Price List Page - Organized by Category */}
      <div className="page min-h-screen p-12 break-before-page bg-gradient-to-br from-white to-gray-50">
        <div className="mb-8">
          <h2 className="text-5xl mb-4 font-serif">Complete Price List</h2>
          <div className="w-24 h-1 bg-gray-800 mb-4"></div>
          <p className="text-gray-600">All items organized by category</p>
        </div>

        {/* Price list grouped by category */}
        {Array.from(new Set(products.map(p => p.category))).map((category, catIdx) => {
          const categoryProducts = products.filter(p => p.category === category);
          const categoryTotal = categoryProducts.reduce((sum, p) => sum + p.price, 0);

          return (
            <div key={category} className={catIdx > 0 ? 'mt-8' : ''}>
              {/* Category header */}
              <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{category}</h3>
                <div className="text-sm">
                  <span className="opacity-80">{categoryProducts.length} items • </span>
                  <span className="font-medium">Total: ${categoryTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-100 border-b-2 border-gray-300 font-semibold text-sm uppercase tracking-wide">
                <div>Item #</div>
                <div>Description</div>
                <div>Asking Price</div>
                <div>Quantity</div>
                <div>Status</div>
              </div>

              {/* Products in category */}
              {categoryProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`grid grid-cols-5 gap-4 px-6 py-3 border-b border-gray-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <div className="text-gray-600 font-mono text-sm">{product.id}</div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</div>
                  <div className="text-gray-700">
                    {product.quantity} {product.quantity === 1 ? 'unit' : 'units'}
                  </div>
                  <div>
                    {product.inStock && product.quantity > 0 ? (
                      <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-gray-400 text-white rounded-full text-xs font-medium">
                        Sold
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Grand Total */}
        <div className="mt-8 bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider opacity-80 mb-1">Grand Total</p>
            <p className="text-lg">{products.length} items across {Array.from(new Set(products.map(p => p.category))).length} categories</p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-wider opacity-80 mb-1">Total Value</p>
            <p className="text-3xl font-light">${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Back Cover Page */}
      <div className="page min-h-screen break-before-page relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-12 text-center">
          <div className="max-w-2xl">
            <div className="mb-12">
              <div className="w-32 h-1 bg-white/50 mx-auto mb-8"></div>
              <h2 className="text-4xl mb-6 font-serif">Thank You</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                We hope you've enjoyed browsing our carefully curated collection of {products.length} fine items
                across {Array.from(new Set(products.map(p => p.category))).length} categories.
              </p>
            </div>

            <div className="border-t border-b border-white/30 py-8 mb-12">
              <p className="text-white/70 leading-relaxed">
                Each piece in this catalogue has been thoughtfully selected and authenticated.
                For inquiries about any item, please reference the item number when contacting us.
              </p>
            </div>

            <div className="space-y-3 text-white/60 text-sm">
              <p>Catalogue generated: {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p className="text-xs">
                All prices and availability subject to change without notice
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-xs text-white/40 uppercase tracking-widest">
                {title}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Override oklch colors with compatible formats for PDF generation */
        .print-catalogue {
          /* CSS Custom Properties - Convert oklch to standard formats */
          --foreground: #252525 !important;
          --card-foreground: #252525 !important;
          --popover: #ffffff !important;
          --popover-foreground: #252525 !important;
          --primary-foreground: #ffffff !important;
          --secondary: #f2f2f3 !important;
          --ring: #b3b3b3 !important;
          --chart-1: #f97316 !important;
          --chart-2: #3b82f6 !important;
          --chart-3: #1e40af !important;
          --chart-4: #facc15 !important;
          --chart-5: #fbbf24 !important;
          --sidebar: #fafafa !important;
          --sidebar-foreground: #252525 !important;
          --sidebar-primary-foreground: #fafafa !important;
          --sidebar-accent: #f5f5f5 !important;
          --sidebar-accent-foreground: #343434 !important;
          --sidebar-border: #ebebeb !important;
          --sidebar-ring: #b3b3b3 !important;
        }

        .print-catalogue * {
          /* Force standard color formats */
          color: inherit;
        }

        .print-catalogue .bg-gray-50 {
          background-color: #f9fafb !important;
        }

        .print-catalogue .bg-gray-100 {
          background-color: #f3f4f6 !important;
        }

        .print-catalogue .bg-gray-200 {
          background-color: #e5e7eb !important;
        }

        .print-catalogue .bg-gray-800 {
          background-color: #1f2937 !important;
        }

        .print-catalogue .bg-gray-900 {
          background-color: #111827 !important;
        }

        .print-catalogue .bg-white {
          background-color: #ffffff !important;
        }

        .print-catalogue .bg-green-100 {
          background-color: #dcfce7 !important;
        }

        .print-catalogue .bg-green-700 {
          background-color: #15803d !important;
        }

        .print-catalogue .text-gray-900 {
          color: #111827 !important;
        }

        .print-catalogue .text-gray-800 {
          color: #1f2937 !important;
        }

        .print-catalogue .text-gray-700 {
          color: #374151 !important;
        }

        .print-catalogue .text-gray-600 {
          color: #4b5563 !important;
        }

        .print-catalogue .text-gray-500 {
          color: #6b7280 !important;
        }

        .print-catalogue .text-gray-400 {
          color: #9ca3af !important;
        }

        .print-catalogue .text-gray-300 {
          color: #d1d5db !important;
        }

        .print-catalogue .text-white {
          color: #ffffff !important;
        }

        .print-catalogue .text-green-700 {
          color: #15803d !important;
        }

        .print-catalogue .text-green-800 {
          color: #166534 !important;
        }

        .print-catalogue .border-gray-200 {
          border-color: #e5e7eb !important;
        }

        .print-catalogue .border-gray-300 {
          border-color: #d1d5db !important;
        }

        .print-catalogue .border-gray-800 {
          border-color: #1f2937 !important;
        }

        .print-catalogue .border-white {
          border-color: #ffffff !important;
        }

        .print-catalogue .border-green-300 {
          border-color: #86efac !important;
        }

        .print-catalogue .border-green-700 {
          border-color: #15803d !important;
        }

        .print-catalogue .bg-green-600,
        .print-catalogue [data-slot="badge"].bg-green-600 {
          background-color: #16a34a !important;
        }

        .print-catalogue .bg-gray-400,
        .print-catalogue [data-slot="badge"].bg-gray-400 {
          background-color: #9ca3af !important;
        }

        .print-catalogue [data-slot="badge"].text-white {
          color: #ffffff !important;
        }

        /* Ensure cover page text is bright white */
        .print-catalogue .cover-page * {
          color: #ffffff !important;
        }

        .print-catalogue .cover-page .text-white,
        .print-catalogue .cover-page h1,
        .print-catalogue .cover-page p {
          color: #ffffff !important;
          opacity: 1 !important;
        }

        .print-catalogue .splash-subtitle {
          color: #ffffff !important;
          opacity: 1 !important;
          font-weight: 500 !important;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
        }

        .print-catalogue .border-gray-400 {
          border-color: #9ca3af !important;
        }

        /* Override any computed colors from CSS variables */
        .print-catalogue [class*="bg-primary"] {
          background-color: #030213 !important;
        }

        .print-catalogue [class*="text-primary-foreground"] {
          color: #ffffff !important;
        }

        .print-catalogue [class*="bg-secondary"] {
          background-color: #f2f2f3 !important;
        }

        .print-catalogue [class*="text-secondary-foreground"] {
          color: #030213 !important;
        }

        .print-catalogue [class*="bg-muted"] {
          background-color: #ececf0 !important;
        }

        .print-catalogue [class*="text-muted-foreground"] {
          color: #717182 !important;
        }

        .print-catalogue [class*="bg-accent"] {
          background-color: #e9ebef !important;
        }

        .print-catalogue [class*="text-accent-foreground"] {
          color: #030213 !important;
        }

        .print-catalogue [class*="text-foreground"] {
          color: #252525 !important;
        }

        .print-catalogue [class*="border-border"] {
          border-color: rgba(0, 0, 0, 0.1) !important;
        }

        /* Ensure images are properly contained and centered */
        .print-catalogue img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center;
        }

        /* Override for cover page - allow it to fill */
        .print-catalogue .cover-page img {
          object-fit: cover;
        }

        /* Prevent grid items from breaking across pages */
        .break-inside-avoid {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Line clamp for text overflow */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media print {
          @page {
            size: landscape;
            margin: 0;
          }

          .page {
            page-break-after: always;
            page-break-inside: avoid;
            min-height: auto !important;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          /* Hide non-print elements */
          .no-print {
            display: none !important;
          }

          /* Ensure proper sizing for print */
          .print-catalogue {
            width: 100%;
            max-width: none;
          }

          /* Ensure colors print correctly */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Ensure images fit properly on print */
          .print-catalogue img {
            max-width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
          }

          /* Ensure badge colors are visible in print */
          .print-catalogue .bg-green-600,
          .print-catalogue [data-slot="badge"].bg-green-600 {
            background-color: #16a34a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-catalogue .text-white,
          .print-catalogue [data-slot="badge"].text-white {
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-catalogue .bg-gray-400,
          .print-catalogue [data-slot="badge"].bg-gray-400 {
            background-color: #9ca3af !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-catalogue .bg-gray-200 {
            background-color: #e5e7eb !important;
            -webkit-print-color-adjust: exact !important;
          }

          .print-catalogue .text-gray-700 {
            color: #374151 !important;
            -webkit-print-color-adjust: exact !important;
          }

          /* Ensure all splash page text is bright white in print */
          .print-catalogue .cover-page * {
            color: #ffffff !important;
            opacity: 1 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-catalogue .cover-page .text-white,
          .print-catalogue .cover-page h1,
          .print-catalogue .cover-page p,
          .print-catalogue .cover-page .splash-subtitle {
            color: #ffffff !important;
            opacity: 1 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            filter: brightness(1.2) !important;
            font-weight: 500 !important;
          }

          .print-catalogue .splash-subtitle {
            color: #ffffff !important;
            opacity: 1 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-weight: 500 !important;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
          }
        }

        .print-catalogue {
          width: 100%;
        }

        .page {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
