import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RectangleCard from './RectangleCard';

const HotelCardRow = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/hotels')
      .then(response => {
        const fetchedHotels = response.data.hotels || [];
        // Double the hotels array for infinite scroll effect
        setHotels([...fetchedHotels, ...fetchedHotels]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
        setError('Failed to load hotels');
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

  if (hotels.length === 0) {
    return (
      <div className="min-h-[350px] bg-gray-100 p-8 flex items-center justify-center text-gray-500">
        No hotels available
      </div>
    );
  }

  return (
    <div className="min-h-[350px] bg-gray-100 p-8 overflow-hidden">
      <div className="flex w-max animate-hotelScroll gap-5">
        {hotels.map((hotel, index) => (
          <RectangleCard 
            key={index}
            id={hotel._id}
            image={`http://localhost:5173/public/gumballmail.webp`}
            name={hotel.name}
            location={`${hotel.location?.wilaya || ''}, ${hotel.location?.address || ''}`}
            price={`${hotel.pricePerNight}dzd/night`}
            type="hotel"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes hotelScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * ${hotels.length / 2} - 100px));
            }
          }

          .animate-hotelScroll {
            animation: hotelScroll ${hotels.length * 3}s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HotelCardRow; 