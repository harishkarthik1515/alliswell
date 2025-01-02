import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { dummyOffers } from '@/data/offers';
import { formatPrice } from '@/lib/utils';

export const OfferManagement: React.FC = () => {
  const [offers, setOffers] = useState(dummyOffers);

  const toggleActive = (offerId: string) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === offerId
          ? { ...offer, isActive: !offer.isActive }
          : offer
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Offers</h2>
        <Button>Add New Offer</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Offer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Validity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {offer.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatPrice(offer.discount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{offer.validity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    variant={offer.isActive ? 'primary' : 'outline'}
                    onClick={() => toggleActive(offer.id)}
                  >
                    {offer.isActive ? 'Active' : 'Inactive'}
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
