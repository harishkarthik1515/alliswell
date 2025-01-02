// Feedback.tsx
import React, { useState } from 'react';

export const Feedback: React.FC = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full p-8">
        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Share Your Thoughts with Us
        </h3>
        {submitted ? (
          <div className="text-center">
            <h4 className="text-2xl font-semibold text-pink-600">Thank You for Your Feedback!</h4>
            <p className="text-gray-700 mt-4">We appreciate your feedback and will use it to improve our service.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">Your Name</label>
              <input
                id="name"
                type="text"
                className="mt-2 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Feedback Field */}
            <div>
              <label htmlFor="feedback" className="block text-gray-700 font-medium">Your Feedback</label>
              <textarea
                id="feedback"
                className="mt-2 w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your feedback"
                rows={6}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Rating Section */}
            <div>
              <label className="block text-gray-700 font-medium">Your Rating</label>
              <div className="flex space-x-2 mt-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${index < rating ? 'text-pink-500' : 'text-gray-400'} cursor-pointer hover:text-pink-500`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={() => setRating(index + 1)}
                  >
                    <polygon points="12 17.27 18.18 21 15.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 8.46 13.97 5.82 21 12 17.27" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all ease-in-out duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
