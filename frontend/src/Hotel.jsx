"use client"

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
import { FaWifi, FaSwimmingPool, FaSpa, FaUtensils, FaSnowflake, FaStar, FaMapMarkerAlt, FaArrowRight, FaChevronDown, FaCar } from 'react-icons/fa';

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedWilaya, setSelectedWilaya] = useState(searchParams.get('wilaya') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const wilayas = [
    "Adrar", "Aïn Defla", "Aïn Témouchent", "Algiers", "Annaba",
    "Batna", "Béchar", "Béjaïa", "Biskra", "Blida",
    "Bordj Bou Arréridj", "Bouira", "Boumerdès", "Chlef", "Constantine",
    "Djelfa", "El Bayadh", "El Oued", "El Tarf", "Ghardaïa",
    "Guelma", "Illizi", "Jijel", "Khenchela", "Laghouat",
    "M'Sila", "Mascara", "Médéa", "Mila", "Mostaganem",
    "Naâma", "Oran", "Ouargla", "Oum El Bouaghi", "Relizane",
    "Saïda", "Sétif", "Sidi Bel Abbès", "Skikda", "Souk Ahras",
    "Tamanrasset", "Tébessa", "Tiaret", "Tindouf", "Tipaza",
    "Tissemsilt", "Tizi Ouzou", "Tlemcen",
    "Bordj Badji Mokhtar", "In Salah", "In Guezzam", "Touggourt",
    "Djanet", "El M'Ghair", "El Meniaa", "Ouled Djellal",
    "Béni Abbès", "Timimoun"
  ].sort();

  // Group wilayas by first letter for better organization
  const groupedWilayas = wilayas.reduce((acc, wilaya) => {
    const firstLetter = wilaya.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(wilaya);
    return acc;
  }, {});

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wi-fi':
        return <FaWifi className="text-blue-500" />;
      case 'pool':
        return <FaSwimmingPool className="text-cyan-500" />;
      case 'spa':
        return <FaSpa className="text-purple-500" />;
      case 'restaurant':
        return <FaUtensils className="text-orange-500" />;
      case 'air conditioning':
        return <FaSnowflake className="text-sky-500" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const wilaya = searchParams.get('wilaya');
        const url = wilaya 
          ? `http://localhost:5000/api/v1/hotels?wilaya=${wilaya}`
          : 'http://localhost:5000/api/v1/hotels';
        const response = await axios.get(url);
        setHotels(response.data.hotels);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch hotels');
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handleSearch = (wilaya) => {
    setSelectedWilaya(wilaya);
    setIsDropdownOpen(false);
    setSearchParams(wilaya ? { wilaya } : {});
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.wilaya-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Search */}
      <div className="relative bg-rose-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
            <p className="text-white text-lg">Select a wilaya to discover available hotels</p>
          </div>

          {/* Wilaya Dropdown */}
          <div className="max-w-2xl mx-auto">
            <div className="relative wilaya-dropdown">
              <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center px-6 py-4">
                  <FaMapMarkerAlt className="text-rose-500 text-xl mr-3" />
                  <span className="text-lg text-gray-600 flex-grow text-left">
                    {selectedWilaya || 'Select a wilaya...'}
                  </span>
                  <FaChevronDown 
                    className={`text-gray-400 transition-transform duration-200 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl overflow-hidden"
                  style={{ 
                    zIndex: 9999,
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Show all hotels option */}
                  <div
                    className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-100"
                    onClick={() => handleSearch('')}
                  >
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span className="text-gray-600">Show all hotels</span>
                  </div>

                  {/* Grouped Wilayas */}
                  {Object.entries(groupedWilayas).map(([letter, wilayas]) => (
                    <div key={letter}>
                      <div 
                        className="sticky top-0 bg-gray-50 px-6 py-2 font-semibold text-gray-500 text-sm border-b border-gray-100"
                        style={{ zIndex: 10000 }}
                      >
                        {letter}
                      </div>
                      {wilayas.map((wilaya, index) => (
                        <div
                          key={index}
                          className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3
                            ${selectedWilaya === wilaya ? 'bg-rose-50' : ''}`}
                          onClick={() => handleSearch(wilaya)}
                        >
                          <FaMapMarkerAlt 
                            className={selectedWilaya === wilaya ? 'text-rose-500' : 'text-gray-400'} 
                          />
                          <span className={`${selectedWilaya === wilaya ? 'text-rose-500' : 'text-gray-600'}`}>
                            {wilaya}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute left-0 right-0 bottom-0 overflow-hidden">
          <svg 
            className="w-full h-8 text-gray-50 block"
            viewBox="0 0 1440 48" 
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,48 C480,16 960,16 1440,48 L1440,48 L0,48 Z"
            />
          </svg>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative" style={{ zIndex: 1 }}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedWilaya 
              ? `Available Hotels in ${selectedWilaya}`
              : 'All Available Hotels'}
          </h2>
          {selectedWilaya && (
            <button
              onClick={() => handleSearch('')}
              className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-2"
            >
              <span>Show all hotels</span>
              <FaMapMarkerAlt />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
            >
              <div className="relative h-40">
                <img
                  src={`http://localhost:5173/public/gumballmail.webp`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-rose-600 shadow-sm">
                  {hotel.roomsAvailable} left
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-300 line-clamp-1">
                    {hotel.name}
                  </h2>
                  <div className="flex items-center gap-1 text-amber-400">
                    <FaStar />
                    <span className="text-sm font-medium text-gray-700">{hotel.rating || '4.5'}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="text-rose-500 mr-1" />
                  <span className="line-clamp-1">{hotel.location.wilaya}, {hotel.location.address}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded-full"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <div className="text-xs text-gray-500 px-2 py-1">
                      +{hotel.amenities.length - 3} more
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center mb-3">
                    <span className="text-lg font-bold text-rose-600">${hotel.pricePerNight.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">/ night</span>
                  </div>
                  <button
                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    View Details
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaMapMarkerAlt className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Hotels Found</h3>
            <p className="text-gray-500">
              {selectedWilaya 
                ? `No hotels available in ${selectedWilaya}. Try searching in another wilaya.`
                : 'No hotels available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;