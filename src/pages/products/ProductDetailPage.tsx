import React from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { dummyProducts } from '@/data/products';
import { formatPrice, generateWhatsAppLink } from '@/lib/utils';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    return <div className="container py-8">Product not found</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl font-semibold text-pink-500">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex gap-4">
            <Button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="flex-1"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <a
              href={generateWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};