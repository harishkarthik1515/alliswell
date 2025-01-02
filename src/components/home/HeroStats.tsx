import React from 'react';

const stats = [
  { label: 'Handcrafted Pieces', value: '1000+' },
  { label: 'Happy Customers', value: '5000+' },
  { label: 'Years of Excellence', value: '10+' },
];

export const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 rounded-2xl bg-pink-50/80 p-4 backdrop-blur-sm sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-xl font-bold text-pink-600 sm:text-2xl lg:text-3xl">
            {stat.value}
          </div>
          <div className="mt-1 text-xs text-gray-600 sm:text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};