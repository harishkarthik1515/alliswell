import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              Discover our collection of handcrafted jewelry pieces designed to make you shine.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/earrings" className="text-gray-600 hover:text-pink-500">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/category/bracelets" className="text-gray-600 hover:text-pink-500">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/category/chains" className="text-gray-600 hover:text-pink-500">
                  Chains
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-pink-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-pink-500">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-pink-500">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; 2024 AllIsWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};