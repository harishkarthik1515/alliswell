import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Product } from '@/types';
import { formatPrice, generateWhatsAppLink } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(generateWhatsAppLink(product), '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      onClick={handleProductClick}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500">{formatPrice(product.price)}</p>
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <button
            onClick={handleWhatsAppClick}
            className="text-green-500 hover:text-green-600 p-2"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};