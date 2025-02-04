import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { formatPrice } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<any>({});
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      setNotification('Loading products...');
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setNotification(null); // Clear loading notification
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setNotification('Error loading products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNavigateToAddProduct = () => {
    navigate('/addProducts');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProduct = async () => {
    if (!editedProduct.name || !editedProduct.price || !editedProduct.category) {
      setNotification('Please fill in all fields.');
      return;
    }

    if (isNaN(editedProduct.price) || parseFloat(editedProduct.price) <= 0) {
      setNotification('Please enter a valid price.');
      return;
    }

    try {
      setNotification('Updating product...');
      await updateDoc(doc(db, 'products', selectedProduct.id), editedProduct);
      setProducts((current) =>
        current.map((product) =>
          product.id === selectedProduct.id ? { ...product, ...editedProduct } : product
        )
      );
      setIsEditModalOpen(false);
      setNotification('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      setNotification('Error updating product.');
    }
  };

  const toggleStock = async (productId: string, currentStock: boolean) => {
    try {
      setNotification('Updating stock status...');
      await updateDoc(doc(db, 'products', productId), { inStock: !currentStock });
      setProducts((current) =>
        current.map((product) =>
          product.id === productId ? { ...product, inStock: !currentStock } : product
        )
      );
      setNotification('Stock status updated successfully!');
    } catch (error) {
      console.error('Error updating stock status:', error);
      setNotification('Error updating stock status.');
    }
  };

  const deleteProduct = async (productId: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      try {
        setNotification('Deleting product...');
        await deleteDoc(doc(db, 'products', productId));
        setProducts((current) => current.filter((product) => product.id !== productId));
        setNotification('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        setNotification('Error deleting product.');
      }
    }
  };

  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={handleNavigateToAddProduct}>Add New Product</Button>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 mb-4 text-white rounded-md ${notification.includes('Error') ? 'bg-red-600' : 'bg-green-600'}`}
        >
          {notification}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatPrice(product.price)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    variant={product.inStock ? 'primary' : 'outline'}
                    onClick={() => toggleStock(product.id, product.inStock)}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="secondary" size="sm" className="mr-2" onClick={() => openEditModal(product)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Product Name"
              />
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Price"
              />
              <input
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Category"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
