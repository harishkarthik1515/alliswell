import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { FeaturedProduct } from './FeaturedProduct';
import { HeroStats } from '../../components/home/HeroStats';
import { dummyProducts } from '../../data/products';
import { cn } from '@/lib/utils';
import { Reviews } from '../../components/home/Reveiws';
import { Feedback } from '../../components/home/Feedback';

export const Hero: React.FC = () => {
  const featuredProducts = dummyProducts.filter((product) => product.featured);

  // State to manage the visibility of the "Learn More" content
  const [showMore, setShowMore] = useState(false);

  // Handle smooth scrolling to the reviews and feedback sections
  const handleLearnMoreClick = () => {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white" />
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 opacity-20 md:h-[32rem] md:w-[32rem]">
          <svg viewBox="0 0 1024 1024" className="absolute h-full w-full text-pink-400">
            <circle cx="512" cy="512" r="512" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Main hero content */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Your Perfect
                <span className="mt-2 block text-pink-600">Jewelry </span>
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                Explore our collection of handcrafted jewelry pieces, each telling a unique story
                of elegance and sophistication. From timeless classics to modern designs.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:gap-4">
                <Button size="lg" to="/category/earrings" className="w-full sm:w-auto">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLearnMoreClick}
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats section - hidden on smallest screens */}
              <div className="mt-8 hidden sm:mt-12 sm:block">
                <HeroStats />
              </div>
            </div>

            {/* Featured products grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 sm:gap-10 rounded-tl-lg rounded-br-lg">
              {/* Hidden on mobile */}
              <div className="hidden sm:block">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={cn(
                      'transform transition-transform duration-300 hover:scale-[1.02] w-[900px] rounded-[30px] overflow-hidden',
                      index === 1 ? 'sm:mt-12' : ''
                    )}
                  >
                    <div className="rounded-[30px] overflow-hidden">
                      <FeaturedProduct product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews and Feedback Section */}
          <Reviews />
          <Feedback />
        </div>
      </div>
    </div>
  );
};
