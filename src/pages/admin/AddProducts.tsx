import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Adjust the path to your Firebase setup file
import { Button } from '@/components/ui/Button';

export const AddProducts: React.FC = () => {
  const initialProductState = {
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    images: [''],
    inStock: true,
    featured: false,
  };

  const [product, setProduct] = useState(initialProductState);
  const [notification, setNotification] = useState('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image URL changes
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...product.images];
    newImages[index] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newImages,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if product.id exists (if it's not empty, we are updating)
      if (product.id) {
        // Update existing product
        const productRef = doc(db, 'products', product.id);
        await setDoc(productRef, {
          ...product,
          price: parseFloat(product.price), // Ensure price is a number
        });

        setNotification(`Product updated successfully! Document ID: ${product.id}`);
        window.alert(`Product updated with ID: ${product.id}`);
      } else {
        // Add new product if there is no ID
        const docRef = await addDoc(collection(db, 'products'), {
          ...product,
          price: parseFloat(product.price), // Ensure price is a number
        });

        // Update product state with the new document ID
        setProduct((prevProduct) => ({
          ...prevProduct,
          id: docRef.id, // Set the current ID in the state
        }));

        setNotification(`Product added successfully! Document ID: ${docRef.id}`);
        window.alert(`Document added with ID: ${docRef.id}`);
      }

      // Log the updated product state
      console.log('Updated Product State:', product);

    } catch (error) {
      console.error('Error adding/updating product:', error);
      setNotification('Failed to add/update product. Please try again.');
      window.alert('Failed to add/update product. Please try again.');
    }

    // Clear notification after 3 seconds
    setTimeout(() => setNotification(''), 3000);
  };

  // Function to reset the form
  const resetForm = () => {
    setProduct(initialProductState);
  };

  useEffect(() => {
    // This effect can be used to populate product data for editing an existing product
    // You can fetch product details by its ID if needed and populate the state
  }, []); // You can add product.id here if you need to fetch data by product id

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add/Edit Product</h2>
      </div>
      {notification && (
        <div className="p-4 mb-4 text-green-800 bg-green-200 rounded-lg">
          {notification}
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
              <option value="chains">Chains</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="images" className="text-sm font-medium text-gray-700">
              Image URLs
            </label>
            {product.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="url"
                  name="images"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter image URL"
                />
                {product.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = product.images.filter((_, i) => i !== index);
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        images: newImages,
                      }));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setProduct((prevProduct) => ({ ...prevProduct, images: [...prevProduct.images, ''] })) }
              className="text-blue-600 hover:text-blue-800"
            >
              Add another image
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={product.inStock}
                onChange={() =>
                  setProduct((prevProduct) => ({ ...prevProduct, inStock: !prevProduct.inStock })) }
                className="h-4 w-4"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                In Stock
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={product.featured}
                onChange={() =>
                  setProduct((prevProduct) => ({ ...prevProduct, featured: !prevProduct.featured })) }
                className="h-4 w-4"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetForm}
            >
              Reset
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {product.id ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
