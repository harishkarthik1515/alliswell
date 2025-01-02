import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { dummyProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState(dummyProducts);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigateToAddProduct = () => {
    navigate('/addProducts'); // Navigate to the AddProducts page
  };

  const toggleStock = (productId: string) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={handleNavigateToAddProduct}>Add New Product</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    variant={product.inStock ? 'primary' : 'outline'}
                    onClick={() => toggleStock(product.id)}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="secondary" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
