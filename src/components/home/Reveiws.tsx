import React, { useState } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Jane Doe',
    rating: 5,
    review: 'Absolutely love my new necklace! It\'s even more beautiful in person.',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'John Smith',
    rating: 4,
    review: 'Quality is top-notch, and the customer service was excellent.',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    rating: 5,
    review: 'I bought the ring for my birthday, and it’s perfect. Love the design!',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 4,
    name: 'Michael Brown',
    rating: 4,
    review: 'Very good experience. The bracelet looks elegant, but I expected a bit more sparkle.',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 5,
    name: 'Sarah Lee',
    rating: 3,
    review: 'Nice necklace, but the delivery was delayed.',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 6,
    name: 'David Clark',
    rating: 5,
    review: 'My wife loved her new earrings! Great quality and excellent service.',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const ReviewCard: React.FC<{ review: any }> = ({ review }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 17.27 18.18 21 15.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 8.46 13.97 5.82 21 12 17.27" />
    </svg>
  ));

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl max-w-xs w-full flex-shrink-0 flex-col sm:flex-row sm:space-x-6 sm:max-w-md hover:shadow-xl transition-all ease-in-out duration-300">
      {/* Profile Image (hidden on small screens) */}
      <img
        src={review.profileImage}
        alt={review.name}
        className="w-20 h-20 rounded-full border-2 border-pink-600 mb-4 sm:mb-0 sm:block sm:w-24 sm:h-24"
      />
      
      <div className="flex-1">
        {/* Name and Rating */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-gray-800">{review.name}</p>
          <div className="flex space-x-1">{stars}</div>
        </div>
        
        {/* Review Text */}
        <p className="mt-2 text-gray-600 text-sm">{review.review}</p>
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div id="reviews" className="mt-12 sm:mt-16 px-4">
      <h2 className="text-2xl font-semibold text-gray-900 text-center">Customer Reviews</h2>
      <div className="mt-6 flex justify-center items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-4 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Review Cards */}
        <div className="overflow-hidden max-w-full">
          <div
            className="flex space-x-6 transition-transform ease-in-out duration-300 sm:space-x-6"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 ml-4 disabled:opacity-50"
          disabled={currentIndex === reviews.length - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
