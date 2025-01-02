import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '@/context/CartContext';
import { CartPreview } from '../cart/CartPreview';

// Importing the logo image
import logo from '../images/logo.png'; // Adjust the path as needed

export const Header: React.FC = () => {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      {/* Link to Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
        rel="stylesheet"
      />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo with a Link to Home */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto mr-2" // You can adjust the size as needed
          />
          <span
            className="text-4xl text-pink-600 hover:text-pink-800 tracking-tight"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            AllIsWell
          </span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/category/earrings" className="text-gray-600 hover:text-pink-500">
            Earrings
          </Link>
          <Link to="/category/bracelets" className="text-gray-600 hover:text-pink-500">
            Bracelets
          </Link>
          <Link to="/category/chains" className="text-gray-600 hover:text-pink-500">
            Chains
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-pink-500">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={20} />
              <span className="hidden md:inline">Login</span>
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingBag size={20} />
            <span className="hidden md:inline">Cart ({totalItems})</span>
          </Button>
        </div>
      </div>
      {isCartOpen && <CartPreview items={items} onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};
