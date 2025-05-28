import React from 'react';
import '../css/rectangleCard.css';

const RectangleCard = () => {
  return (
    <div className="rectangle-card">
      <div className="card-image">
        <img src="/src/assets/image/hotel.png" alt="Hotel" />
        <span>Hotel Image</span>
      </div>

      {/* Content Area */}
      <div className="card-content">
        {/* Hotel Name */}
        <h3>Hotel name</h3>

        {/* Location */}
        <p>Constantine</p>

        {/* Price Row */}
        <div className="price-row">
          <p>From...2000dzd/night</p>
          <span>›</span>
        </div>
      </div>
    </div>
  );
};

export default RectangleCard; 