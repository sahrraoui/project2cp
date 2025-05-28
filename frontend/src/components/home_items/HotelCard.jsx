import React from 'react';
import RectangleCard from './rectangleCard'; // Adjust the import path as necessary

const HotelCardRow = () => {
  return (
    <div style={{ 
      minHeight: '30vh', 
     
      padding: '2rem',
      overflow: 'hidden', // Hide scrollbars
      
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content', // Allow content to determine width
        animation: 'scroll 15s linear infinite alternate',
        gap: '20px',
      }}>
        {/* First set of cards */}
        <RectangleCard />
        <RectangleCard />
        <RectangleCard />
        <RectangleCard />
        <RectangleCard />
        {/* Duplicate set for seamless loop */}
        <RectangleCard />
        <RectangleCard />
        <RectangleCard />
        <RectangleCard />
        <RectangleCard />
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          /* Pause animation on hover */
          div:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default HotelCardRow; 