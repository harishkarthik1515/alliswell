import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyProducts } from '../../data/products'; // Import products from product.ts
import { formatPrice } from '@/lib/utils';

export const FeaturedProduct: React.FC = () => {
  if (dummyProducts.length === 0) {
    return <p>No products available</p>;
  }

  // Double the product list for smooth looping
  const products = [...dummyProducts, ...dummyProducts];

  return (
    <>
      {/* Inline CSS for scrolling animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .scroll-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .scroll-container {
          display: flex;
          gap: 1rem;
          animation: scroll 20s linear infinite; /* Adjust speed with duration */
          width: calc(181%); /* Ensure enough width for both lists */
        }

        .scroll-item {
          flex-shrink: 0;
          width: 16rem; /* Set consistent item width */
        }
      `}</style>

      {/* Scrollable Products */}
      <div className="scroll-wrapper">
        <div className="scroll-container">
          {products.map((product, index) => (
            <Link
              key={`${product.id}-${index}`} // Unique key for duplicate items
              to={`/product/${product.id}`}
              className="scroll-item group relative block overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-pink-300 sm:mt-2 sm:text-base">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-2 flex items-center text-sm text-white sm:mt-4 sm:text-base">
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
