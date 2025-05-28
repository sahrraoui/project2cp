import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaMapMarkerAlt, FaBed, FaBath, FaUsers } from 'react-icons/fa';

const HomeCardRow = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/homes');
        setHomes(response.data.homes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch homes');
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-6 px-6 min-w-full">
        {homes.map((home) => (
          <div
            key={home._id}
            className="flex-none w-72 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(`/homes/${home._id}`)}
          >
            <div className="relative h-48">
              <img
                src={`http://localhost:5173/public/gumball.jpg`}
                alt={home.title}
                className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-rose-600 shadow-sm">
                {home.propertyType}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-300 line-clamp-1">
                  {home.title}
                </h3>
                <div className="flex items-center gap-1 text-amber-400">
                  <FaStar />
                  <span className="text-sm font-medium text-gray-700">{home.rating || '4.5'}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FaMapMarkerAlt className="text-rose-500 mr-1" />
                <span className="line-clamp-1">{home.location?.wilaya}, {home.location?.address}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <FaBed className="text-gray-400" />
                  <span>{home.bedrooms} beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-gray-400" />
                  <span>{home.bathrooms} baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-gray-400" />
                  <span>{home.maxGuests} guests</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-rose-600">${home.price?.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-1">/ night</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/homes/${home._id}`);
                  }}
                  className="text-rose-600 hover:text-rose-700 font-medium text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCardRow; 