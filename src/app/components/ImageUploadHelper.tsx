import { useRef } from 'react';
import { Button } from './ui/button';
import { Image } from 'lucide-react';
import { Product } from './ProductCard';

interface ImageUploadHelperProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export function ImageUploadHelper({ products, onUpdateProducts }: ImageUploadHelperProps) {
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

  const productsWithoutImages = products.filter(p =>
    !p.image || p.image.includes('unsplash.com')
  );

  if (productsWithoutImages.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <Image className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-blue-900 mb-2">Upload Product Images</h3>
          <p className="text-sm text-blue-700 mb-3">
            {productsWithoutImages.length} product{productsWithoutImages.length !== 1 ? 's' : ''} {productsWithoutImages.length !== 1 ? 'are' : 'is'} using placeholder images. Click to upload specific images:
          </p>
          <div className="flex flex-wrap gap-2">
            {productsWithoutImages.map(product => (
              <div key={product.id}>
                <input
                  ref={(el) => { fileInputRefs.current[product.id] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, product.id)}
                  className="hidden"
                  id={`upload-${product.id}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    fileInputRefs.current[product.id]?.click();
                  }}
                  className="text-xs"
                  asChild={false}
                >
                  {product.id} - {product.name.substring(0, 20)}...
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
