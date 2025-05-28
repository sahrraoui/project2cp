import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RectangleCard from './RectangleCard';

const RentalCardRow = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/homes')
      .then(response => {
        const fetchedHomes = response.data.homes || [];
        setHomes([...fetchedHomes, ...fetchedHomes]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching homes:', error);
        setError('Failed to load homes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[350px] bg-gray-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E61E51]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[350px] bg-gray-100 p-8 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (homes.length === 0) {
    return (
      <div className="min-h-[350px] bg-gray-100 p-8 flex items-center justify-center text-gray-500">
        No homes available
      </div>
    );
  }

  return (
    <div className="min-h-[350px] bg-gray-100 p-8 overflow-hidden">
      <div className="flex w-max animate-rentalScroll gap-5">
        {homes.map((home, index) => (
          <RectangleCard 
            key={index}
            id={home._id}
            image={`http://localhost:5173/public/gumball.jpg`}
            name={home.title}
            location={`${home.location?.wilaya || 'N/A'}, ${home.location?.address || 'N/A'}`}
            price={`${home.pricePerNight || 0}dzd/Night`}
            type="rental"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes rentalScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * ${homes.length / 2} - 100px));
            }
          }

          .animate-rentalScroll {
            animation: rentalScroll ${homes.length * 3}s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default RentalCardRow; 