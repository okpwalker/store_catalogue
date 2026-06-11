import { CORSImage } from './CORSImage';
import { Badge } from './ui/badge';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  comment?: string;
  quantity: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="group cursor-pointer rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <CORSImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
          style={{
            filter: 'brightness(1.1) contrast(1.15) saturate(1.1)',
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="flex-1">{product.name}</h3>
          <Badge variant="outline" className="shrink-0">
            {product.category}
          </Badge>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl">${Math.round(product.price).toLocaleString()}</span>
          <div className="text-right">
            {product.inStock && product.quantity > 0 ? (
              <span className="text-green-600">Qty: {product.quantity}</span>
            ) : (
              <span className="text-gray-400">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
