import React, { useState } from 'react';
import { ProductManagement } from '../../pages/admin/ProductManagement';
import { OfferManagement } from '../../pages/admin/OfferManagement';
import { Button } from '../ui/Button';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'offers'>('products');

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'products' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('products')}
          >
            Products
          </Button>
          <Button
            variant={activeTab === 'offers' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('offers')}
          >
            Offers
          </Button>
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-6">
            <ProductManagement />
          </div>
        ) : (
          <div className="space-y-6">
            <OfferManagement />
          </div>
        )}
      </div>
    </div>
  );
};
