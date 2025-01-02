import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCart } from '@/context/CartContext';
import { dummyProducts } from '@/data/products';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();
  
  const filteredProducts = dummyProducts.filter(
    (product) => product.category === category
  );

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      </div>
    </div>
  );
};