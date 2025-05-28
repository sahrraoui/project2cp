import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Card = ({ item, type }) => {
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
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={item.images[0]} 
          alt={type === 'home' ? item.title : `${item.make} ${item.model}`} 
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleAddToFavorites}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-rose-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {type === 'home' ? item.title : `${item.make} ${item.model}`}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {item.location.wilaya}, {item.location.address}
        </p>
        <p className="text-rose-500 font-semibold mb-2">
          ${type === 'home' ? item.pricePerNight : item.pricePerDay} per {type === 'home' ? 'night' : 'day'}
        </p>
        <div className="text-gray-600 text-sm">
          <span className="text-yellow-500 mr-1">★</span>
          {item.rating} ({item.totalRatings} reviews)
        </div>
      </div>
    </div>
  );
};

export default Card; 