import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RectangleCard from './RectangleCard';

const CarCardRow = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/cars')
      .then(response => {
        const fetchedCars = response.data.cars || [];
        // Double the cars array for infinite scroll effect
        setCars([...fetchedCars, ...fetchedCars]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setError('Failed to load cars');
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

  if (cars.length === 0) {
    return (
      <div className="min-h-[350px] bg-gray-100 p-8 flex items-center justify-center text-gray-500">
        No cars available
      </div>
    );
  }

  return (
    <div className="min-h-[350px] bg-gray-100 p-8 overflow-hidden">
      <div className="flex w-max animate-carScroll gap-5">
        {cars.map((car, index) => (
          <RectangleCard 
            key={index}
            image={`http://localhost:5173/public/cargumball.jpg`}
            name={car.make+car.model}
            location={`${car.location?.wilaya || ''}, ${car.location?.address || ''}`}
            price={`${car.pricePerDay}dzd/day`}
            type="car"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes carScroll {
            0% {
              transform: translateX(calc(-250px * ${cars.length / 2} - 100px));
            }
            100% {
              transform: translateX(0);
            }
          }

          .animate-carScroll {
            animation: carScroll ${cars.length * 3}s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default CarCardRow; 