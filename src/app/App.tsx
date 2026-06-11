import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Product } from './components/ProductCard';
import { PublicCatalogue } from './PublicCatalogue';
import { AdminApp } from './AdminApp';

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
  return (
    <BrowserRouter>
      <Routes>
        {/* Public catalogue - main URL */}
        <Route path="/" element={<PublicCatalogue initialProducts={mockProducts} />} />

        {/* Admin panel - secret URL */}
        <Route path="/admin" element={<AdminApp initialProducts={mockProducts} />} />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
