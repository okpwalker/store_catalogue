import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Image, Upload, X } from 'lucide-react';
import { Product } from './ProductCard';
import { CORSImage } from './CORSImage';

interface ImageManagerProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export function ImageManager({ products, onUpdateProducts }: ImageManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, itemNo: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;

      // Update the product with the new image
      const updatedProducts = products.map(product => {
        if (product.id === itemNo) {
          return { ...product, image: imageData };
        }
        return product;
      });

      onUpdateProducts(updatedProducts);

      // Reset the input
      if (fileInputRefs.current[itemNo]) {
        fileInputRefs.current[itemNo]!.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (itemNo: string) => {
    const updatedProducts = products.map(product => {
      if (product.id === itemNo) {
        return { ...product, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' };
      }
      return product;
    });
    onUpdateProducts(updatedProducts);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Image className="w-4 h-4" />
        Manage Images
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-1">Manage Product Images</h2>
            <p className="text-gray-600">Upload or replace images for your products</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 relative group">
                  <CORSImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <input
                      ref={(el) => { fileInputRefs.current[product.id] = el; }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, product.id)}
                      className="hidden"
                      id={`manage-upload-${product.id}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => fileInputRefs.current[product.id]?.click()}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Replace
                    </Button>
                    {!product.image.includes('unsplash.com') && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveImage(product.id)}
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <span className="text-xs text-gray-500 shrink-0">{product.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span>${Math.round(product.price).toLocaleString()}</span>
                  </div>
                  {product.image.includes('unsplash.com') && (
                    <p className="text-xs text-orange-600 mt-2">Using placeholder image</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {products.filter(p => !p.image.includes('unsplash.com')).length} of {products.length} products have custom images
            </p>
            <Button onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
