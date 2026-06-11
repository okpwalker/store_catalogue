import { Product } from './ProductCard';
import { Badge } from './ui/badge';
import { CompressedImage } from './CompressedImage';
import splashImage from '../../imports/20260428_221711.jpg';
import houswaresImage from '../../imports/Houswares.jpg';
import { getSortedCategories, sortProductsById } from '../../lib/categoryOrder';

interface ScrollableCatalogueProps {
  products: Product[];
  title?: string;
}

export function ScrollableCatalogue({ products, title = 'Estate Collection Catalogue v2.0' }: ScrollableCatalogueProps) {
  const CATEGORY_FOLDER_MAP: Record<string, string> = {
    'Antique': 'Antiques',
    'China-Czec': 'China-Czecs',
    'China-Mikasa': 'China-Mikasas',
    'China-Johnson': 'China-Johnsons',
    'China-Hugh': 'China-Hughs',
    'China-Other': 'China-Others',
    'Figurine': 'Figurines',
    'Crystalware': 'Crystalwares',
    'Glassware': 'Glasswares',
    'Dinnerware': 'Dinnerwares',
    'Silverware': 'Silverwares',
    'Painting': 'Paintings',
    'Electronic': 'Electronics',
  };

  const pluralize = (word: string): string => CATEGORY_FOLDER_MAP[word] ?? (word + 's');
  const categories = getSortedCategories(products);

  return (
    <div className="scrollable-catalogue bg-white">
      {/* Cover Page */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <CompressedImage
            src={splashImage}
            alt="Estate Collection"
            className="w-full h-full object-cover"
            maxWidth={1920}
            maxHeight={1920}
            quality={0.85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-12 text-white">
          <div className="text-center max-w-3xl">
            <div className="mb-8">
              <div className="inline-block px-6 py-2 border-2 border-white/50 rounded-full mb-6">
                <p className="text-xs md:text-sm uppercase tracking-widest">Fine Collectibles & Antiques</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl mb-6 font-serif leading-tight">{title}</h1>

            <div className="w-24 h-1 bg-white/70 mx-auto mb-6"></div>

            <p className="text-xl md:text-2xl text-white mb-12 font-medium">
              A Curated Selection of Vintage Treasures
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-white/80">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light mb-1">{products.length}</p>
                <p className="text-xs md:text-sm uppercase tracking-wider">Items</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light mb-1">{categories.length}</p>
                <p className="text-xs md:text-sm uppercase tracking-wider">Categories</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <p className="text-base md:text-lg font-light mb-1">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-xs md:text-sm uppercase tracking-wider">Catalogue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="absolute bottom-6 md:bottom-12 left-0 right-0 text-center px-4">
          <div className="inline-block px-6 md:px-8 py-3 border border-white/30 backdrop-blur-sm mb-4">
            <p className="text-white/70 text-xs md:text-sm tracking-wide">Carefully curated • Authentically sourced • Expertly catalogued</p>
          </div>

          <div className="mb-3">
            <p className="text-white/90 text-xs md:text-sm mb-2 font-medium">To arrange viewing and for further enquiries:</p>
            <div className="text-white/80 text-xs md:text-sm space-y-1">
              <p className="font-medium">Orville Walker</p>
              <p>Cell: 876-320-2577</p>
              <p>Email: okp.walker@gmail.com</p>
            </div>
          </div>

          <p className="text-white/60 text-xs italic">* Items listed at $0 have not been priced.</p>
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category, categoryIndex) => {
        const categoryProducts = sortProductsById(products.filter(p => p.category === category));
        const availableCount = categoryProducts.filter(p => p.inStock && p.quantity > 0).length;

        return (
          <section key={category} id={`category-${category}`} className="min-h-screen bg-gray-50 py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              {/* Category Header */}
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-block px-4 md:px-6 py-2 border-2 border-gray-800 rounded-full mb-4 md:mb-6">
                  <p className="text-xs uppercase tracking-widest text-gray-700">Section {categoryIndex + 1}</p>
                </div>

                <h2 className="text-4xl md:text-7xl mb-6 md:mb-8 font-serif text-gray-900">{pluralize(category)}</h2>

                <div className="w-32 h-1 bg-gray-800 mx-auto mb-6 md:mb-8"></div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-6 md:mb-8">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-light mb-2 text-gray-900">{categoryProducts.length}</p>
                    <p className="text-xs md:text-sm uppercase tracking-wider text-gray-600">Total Items</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-light mb-2 text-green-700">{availableCount}</p>
                    <p className="text-xs md:text-sm uppercase tracking-wider text-gray-600">Available</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {categoryProducts.length} items from ${Math.round(Math.min(...categoryProducts.map(p => p.price))).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                      <CompressedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain object-center"
                        maxWidth={800}
                        maxHeight={800}
                        quality={0.85}
                        style={{ filter: 'brightness(1.15) contrast(1.2) saturate(1.15)' }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 md:p-5">
                      <div className="mb-2">
                        {!product.inStock || product.quantity === 0 ? (
                          <Badge className="bg-gray-400 text-white text-xs">Sold</Badge>
                        ) : (
                          <Badge className="bg-green-600 text-white text-xs">Available</Badge>
                        )}
                      </div>

                      <h4 className="font-semibold text-base md:text-lg mb-3 leading-tight text-blue-600">{product.name}</h4>

                      <div className="mb-3">
                        <p className="text-lg md:text-xl font-bold text-gray-900">
                          <span className="font-normal text-xs md:text-sm">Asking Price:</span> ${Math.round(product.price).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1 mb-2">
                        <p><span className="font-medium">Item:</span> {product.id}</p>
                        <p><span className="font-medium">Qty:</span> {product.quantity}</p>
                      </div>

                      {product.comment && (
                        <p className="text-xs text-gray-500 italic mt-2 leading-relaxed">
                          {product.comment}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Part II Teaser */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <CompressedImage
            src={houswaresImage}
            alt="Living and Dining Housewares"
            className="w-full h-full object-cover"
            maxWidth={1920}
            maxHeight={1920}
            quality={0.85}
            style={{ filter: 'brightness(0.95) contrast(1.1)', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center min-h-screen p-6 md:p-16">
          <div className="max-w-xl bg-white/90 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-lg">
            <div className="mb-6">
              <div className="inline-block px-5 py-2 border border-gray-300 rounded-full mb-6 md:mb-8">
                <p className="text-gray-600 text-xs uppercase tracking-widest">Coming Next</p>
              </div>
            </div>

            <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-4 font-medium">Estate Collection</p>

            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight mb-4">
              Part II
            </h2>

            <div className="w-20 h-1 bg-gray-800 mb-6 md:mb-8"></div>

            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 leading-snug mb-4 md:mb-6">
              Housewares
            </h3>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              A selection of well-cared-for Living and Dining Housewares, Appliances and Electronics — from everyday essentials to highly desired specialty items.
            </p>

            <div className="border-t border-gray-300 pt-6 md:pt-8">
              <p className="text-gray-500 text-sm italic">
                Look out for Part II of the Estate Collection Catalogue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Page */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-12 text-center">
          <div className="max-w-2xl">
            <div className="mb-12">
              <div className="w-32 h-1 bg-white/50 mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-4xl mb-6 font-serif">Thank You</h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                We hope you've enjoyed browsing our carefully curated collection of {products.length} fine items
                across {categories.length} categories.
              </p>
            </div>

            <div className="border-t border-b border-white/30 py-8 mb-12">
              <p className="text-white/70 leading-relaxed mb-6">
                Each piece in this catalogue has been thoughtfully selected and authenticated.
                For inquiries about any item, please reference the item number when contacting us.
              </p>

              {/* Contact Information */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/80 text-base mb-3 font-medium">To arrange viewing and for further enquiries:</p>
                <div className="text-white/70 space-y-1">
                  <p className="font-medium text-white/80">Orville Walker</p>
                  <p>Cell: 876-320-2577</p>
                  <p>Email: okp.walker@gmail.com</p>
                </div>
              </div>
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
              <p className="text-xs italic text-white/50">
                * Items listed at $0 have not been priced.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-xs text-white/40 uppercase tracking-widest">
                {title}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
