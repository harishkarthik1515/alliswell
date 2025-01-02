import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface CartPreviewProps {
  items: CartItem[];
  onClose: () => void;
}

export const CartPreview: React.FC<CartPreviewProps> = ({ items, onClose }) => {
  const { removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    const message = `Hi! I'd like to purchase:\n${items
      .map((item) => `${item.quantity}x ${item.product.name}`)
      .join('\n')}\nTotal: ${formatPrice(total)}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed right-4 top-20 w-96 bg-white rounded-lg shadow-lg p-6 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 max-h-96 overflow-auto">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full">
              Checkout via WhatsApp
            </Button>
          </div>
        </>
      )}
    </div>
  );
};