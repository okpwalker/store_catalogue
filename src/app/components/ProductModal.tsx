import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { CORSImage } from './CORSImage';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from './ProductCard';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            View product details and specifications
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <CORSImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.1) contrast(1.15) saturate(1.1)',
                transform: 'scale(1.1)',
              }}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">
                  {product.category}
                </Badge>
                <Badge variant="secondary">
                  Item #{product.id}
                </Badge>
              </div>
              <p className="text-3xl mb-4">${Math.round(product.price).toLocaleString()}</p>
              <p className="text-gray-600 mb-3">{product.description}</p>
              {product.comment && (
                <p className="text-gray-500 italic border-l-4 border-gray-300 pl-3">
                  {product.comment}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className={product.inStock && product.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.inStock && product.quantity > 0 ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
              {product.quantity > 0 && (
                <span className="text-gray-600">
                  {product.quantity} {product.quantity === 1 ? 'unit' : 'units'} available
                </span>
              )}
            </div>
            
            {product.inStock && product.quantity > 0 && (
              <>
                <div className="flex items-center gap-3">
                  <span>Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                      disabled={quantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button className="flex-1 gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant={isLiked ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                    />
                  </Button>
                </div>
              </>
            )}
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Number:</span>
                <span>{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Quantity:</span>
                <span>{product.quantity} {product.quantity === 1 ? 'unit' : 'units'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Asking Price:</span>
                <span className="font-medium">${Math.round(product.price).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
