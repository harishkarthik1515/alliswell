import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Jewel</h1>
          
          <div className="prose prose-pink lg:prose-lg">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to Jewel, your premier destination for exquisite handcrafted jewelry. 
              We believe that every piece of jewelry tells a story, and we're here to help you find 
              the perfect piece to tell yours.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2024, Jewel has been dedicated to bringing you the finest selection of 
              earrings, bracelets, and chains. Each piece is carefully selected to ensure the 
              highest quality and unique design.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Promise</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Quality craftsmanship in every piece</li>
              <li>Ethically sourced materials</li>
              <li>Exceptional customer service</li>
              <li>Secure shopping experience</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Visit Us</h2>
            <p className="text-gray-600">
              We'd love to help you find your perfect piece. Contact us through WhatsApp or visit 
              our store at:
            </p>
            <address className="text-gray-600 not-italic mt-2">
              123 Jewelry Lane<br />
              Gem City, GC 12345<br />
              Phone: (555) 123-4567<br />
              Email: contact@jewel.com
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};