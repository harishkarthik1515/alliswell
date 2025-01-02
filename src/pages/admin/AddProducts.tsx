import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { dummyProducts } from '../../data/products';  // Import the dummy products list

export const AddProducts: React.FC = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    images: [''],
    inStock: true,
    featured: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...product.images];
    newImages[index] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newImages,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a new ID for the product
    const newId = (dummyProducts.length + 1).toString();

    // Create the new product object
    const newProduct = { 
      ...product, 
      id: newId, 
      price: parseFloat(product.price),  // Ensure price is a number
    };

    // Add the new product to the dummyProducts array (in this case, just simulate)
    dummyProducts.push(newProduct);

    console.log('Product added:', newProduct);
    console.log('Updated dummyProducts:', dummyProducts);  // Log to check the updated array
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add New Product</h2>
      </div>
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
              onClick={() => setProduct((prevProduct) => ({ ...prevProduct, images: [...prevProduct.images, ''] }))} 
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
                onChange={() => setProduct((prevProduct) => ({ ...prevProduct, inStock: !prevProduct.inStock }))}
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
                onChange={() => setProduct((prevProduct) => ({ ...prevProduct, featured: !prevProduct.featured }))}
                className="h-4 w-4"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
