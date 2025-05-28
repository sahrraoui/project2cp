import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RectangleCard = ({ item, type }) => {
  const navigate = useNavigate();

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    // Here you would typically make an API call to add the item to favorites
    console.log(`Adding ${type} with id ${item._id} to favorites`);
  };

  const handleCardClick = () => {
    navigate(`/${type}/${item._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex h-48"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative w-1/3 min-w-[200px]">
        <img 
          src={item.images[0]} 
          alt={type === 'home' ? item.title : `${item.make} ${item.model}`} 
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleAddToFavorites}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-rose-500" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {type === 'home' ? item.title : `${item.make} ${item.model}`}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {item.location.wilaya}, {item.location.address}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-gray-600 text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            {item.rating} ({item.totalRatings} reviews)
          </div>
          <p className="text-rose-500 font-semibold text-lg">
            ${type === 'home' ? item.pricePerNight : item.pricePerDay}
            <span className="text-sm text-gray-500 ml-1">per {type === 'home' ? 'night' : 'day'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RectangleCard; 