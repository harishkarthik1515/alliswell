import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCart } from '@/context/CartContext';
import { db } from '../Firebase'; // Adjust the path to your Firebase setup file
import { collection, getDocs, query, where } from 'firebase/firestore';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Array to store filtered products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('category', '==', category)); // Filter by category
        const querySnapshot = await getDocs(q);
        
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setFilteredProducts(products); // Set the filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]); // Re-fetch when the category changes

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-xl font-semibold text-gray-600">
            Products coming soon!
          </div>
        ) : (
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        )}
      </div>
    </div>
  );
};
