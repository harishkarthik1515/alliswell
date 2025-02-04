import React, { useState } from 'react';
import { ProductManagement } from '../../pages/admin/ProductManagement';
import { OfferManagement } from '../../pages/admin/OfferManagement';
import { Button } from '../ui/Button';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'productss' | 'offers'>('productss');

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'productss' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('productss')}
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

        {activeTab === 'productss' ? (
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
