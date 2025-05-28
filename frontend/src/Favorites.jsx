import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('homes');

  // Static data for favorite homes
  const favoriteHomes = [
    {
      _id: '1',
      title: 'Luxury Villa in Algiers',
      location: {
        wilaya: 'Algiers',
        address: 'Hydra District'
      },
      pricePerNight: 150,
      rating: 4.8,
      totalRatings: 24,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60']
    },
    {
      _id: '2',
      title: 'Modern Apartment in Oran',
      location: {
        wilaya: 'Oran',
        address: 'Bir El Djir'
      },
      pricePerNight: 80,
      rating: 4.5,
      totalRatings: 18,
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60']
    }
  ];

  // Static data for favorite cars
  const favoriteCars = [
    {
      _id: '1',
      make: 'Mercedes',
      model: 'C-Class',
      location: {
        wilaya: 'Algiers',
        address: 'Bab Ezzouar'
      },
      pricePerDay: 100,
      rating: 4.7,
      totalRatings: 15,
      images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60']
    },
    {
      _id: '2',
      make: 'BMW',
      model: 'X5',
      location: {
        wilaya: 'Oran',
        address: 'Bir El Djir'
      },
      pricePerDay: 150,
      rating: 4.6,
      totalRatings: 12,
      images: ['https://images.unsplash.com/photo-1555215695-300b0ca6ba4c?w=800&auto=format&fit=crop&q=60']
    }
  ];

  const handleRemoveFavorite = (id, type) => {
    // Here you would typically make an API call to remove the item from favorites
    console.log(`Removing ${type} with id ${id} from favorites`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">My Favorites</h1>
      
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('homes')}
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'homes'
              ? 'bg-rose-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Homes
        </button>
        <button
          onClick={() => setActiveTab('cars')}
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'cars'
              ? 'bg-rose-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cars
        </button>
      </div>
      
      {/* Homes Section */}
      {activeTab === 'homes' && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Favorite Homes</h2>
          {favoriteHomes.length === 0 ? (
            <p className="text-center text-gray-600 text-lg bg-gray-50 p-8 rounded-lg">
              You haven't added any homes to your favorites yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteHomes.map((home) => (
                <div 
                  key={home._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={home.images[0]} 
                      alt={home.title} 
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => navigate(`/home/${home._id}`)}
                    />
                    <button
                      onClick={() => handleRemoveFavorite(home._id, 'home')}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 
                      className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-rose-500"
                      onClick={() => navigate(`/home/${home._id}`)}
                    >
                      {home.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {home.location.wilaya}, {home.location.address}
                    </p>
                    <p className="text-rose-500 font-semibold mb-2">
                      ${home.pricePerNight} per night
                    </p>
                    <div className="text-gray-600 text-sm">
                      <span className="text-yellow-500 mr-1">★</span>
                      {home.rating} ({home.totalRatings} reviews)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Cars Section */}
      {activeTab === 'cars' && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Favorite Cars</h2>
          {favoriteCars.length === 0 ? (
            <p className="text-center text-gray-600 text-lg bg-gray-50 p-8 rounded-lg">
              You haven't added any cars to your favorites yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCars.map((car) => (
                <div 
                  key={car._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`} 
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => navigate(`/car/${car._id}`)}
                    />
                    <button
                      onClick={() => handleRemoveFavorite(car._id, 'car')}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 
                      className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-rose-500"
                      onClick={() => navigate(`/car/${car._id}`)}
                    >
                      {car.make} {car.model}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {car.location.wilaya}, {car.location.address}
                    </p>
                    <p className="text-rose-500 font-semibold mb-2">
                      ${car.pricePerDay} per day
                    </p>
                    <div className="text-gray-600 text-sm">
                      <span className="text-yellow-500 mr-1">★</span>
                      {car.rating} ({car.totalRatings} reviews)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Favorites; 