import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '@/context/CartContext';
import { CartPreview } from '../cart/CartPreview';

// Importing the logo image
import logo from '../images/logo.png'; // Adjust the path as needed

export const Header: React.FC = () => {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
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

        {/* User and Cart buttons */}
        <div className="flex items-center space-x-4 md:order-2">
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
          {/* Mobile menu toggle button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation for larger screens */}
        <nav className={`hidden md:flex space-x-6 md:order-1`}>
          <Link to="/" className="text-gray-600 hover:text-pink-500">
            Home
          </Link>
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
      </div>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <nav className="md:hidden bg-white border-t">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-pink-500" onClick={() => setIsNavOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/category/earrings" className="text-gray-600 hover:text-pink-500" onClick={() => setIsNavOpen(false)}>
                Earrings
              </Link>
            </li>
            <li>
              <Link to="/category/bracelets" className="text-gray-600 hover:text-pink-500" onClick={() => setIsNavOpen(false)}>
                Bracelets
              </Link>
            </li>
            <li>
              <Link to="/category/chains" className="text-gray-600 hover:text-pink-500" onClick={() => setIsNavOpen(false)}>
                Chains
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-pink-500" onClick={() => setIsNavOpen(false)}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {isCartOpen && <CartPreview items={items} onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};
