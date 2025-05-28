import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
import { 
  FaGasPump,
  FaCar,
  FaCogs,
  FaStar, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaCalendarAlt,
  FaUsers,
  FaSnowflake,
  FaWifi,
  FaBluetoothB,
  FaSearch,
  FaChevronDown
} from 'react-icons/fa';

const Car = () => {
  const [cars, setCars] = useState([]);
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
    // New wilayas added in 2019
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

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case 'automatic transmission':
        return <FaCogs className="text-gray-500" />;
      case 'gps navigation':
      case 'wifi':
        return <FaWifi className="text-blue-500" />;
      case 'bluetooth':
        return <FaBluetoothB className="text-blue-600" />;
      case 'air conditioning':
        return <FaSnowflake className="text-sky-500" />;
      default:
        return <FaCar className="text-gray-500" />;
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const wilaya = searchParams.get('wilaya');
        const url = wilaya 
          ? `http://localhost:5000/api/v1/cars?wilaya=${wilaya}`
          : 'http://localhost:5000/api/v1/cars';
        const response = await axios.get(url);
        setCars(response.data.cars);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
      }
    };

    fetchCars();
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Ride</h1>
            <p className="text-pink-100 text-lg">Select a wilaya to discover available cars</p>
          </div>

          {/* Wilaya Dropdown */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative wilaya-dropdown">
              <div 
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-rose-500 text-xl" />
                    <span className="text-lg text-gray-700">
                      {selectedWilaya || 'Select a wilaya...'}
                    </span>
                  </div>
                  <FaChevronDown className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  className="fixed left-0 right-0 mt-2 bg-white rounded-xl shadow-xl max-h-[60vh] overflow-y-auto"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    zIndex: 9999,
                    width: '100%',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* All Wilayas option */}
                  <div
                    className="px-6 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                    onClick={() => handleSearch('')}
                  >
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCar />
                      Show all cars
                    </div>
                  </div>

                  {/* Grouped Wilayas */}
                  {Object.entries(groupedWilayas).map(([letter, wilayas]) => (
                    <div key={letter} className="relative">
                      <div className="sticky top-0 bg-gray-100 px-6 py-2 font-semibold text-gray-600" style={{ zIndex: 9999 }}>
                        {letter}
                      </div>
                      {wilayas.map((wilaya, index) => (
                        <div
                          key={index}
                          className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors
                            ${selectedWilaya === wilaya ? 'bg-rose-50' : ''}`}
                          onClick={() => handleSearch(wilaya)}
                        >
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className={`${selectedWilaya === wilaya ? 'text-rose-500' : 'text-gray-400'}`} />
                            {wilaya}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 right-0 bottom-0">
          <svg className="w-full h-8 text-gray-50" preserveAspectRatio="none" viewBox="0 0 1440 48">
            <path
              fill="currentColor"
              d="M0 48h1440V0c-208 26.5-432 48-720 48C432 48 208 26.5 0 0v48z"
            />
          </svg>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative" style={{ zIndex: 1 }}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedWilaya 
              ? `Available Cars in ${selectedWilaya}`
              : 'All Available Cars'}
          </h2>
          {selectedWilaya && (
            <button
              onClick={() => handleSearch('')}
              className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-2"
            >
              <span>Show all cars</span>
              <FaCar />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => navigate(`/cars/${car._id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`http://localhost:5173/public/cargumball.jpg`
                    }
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-semibold text-gray-800 shadow-sm">
                  {car.vehicleType}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {car.make} {car.model}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <FaStar className="text-sm"/>
                    <span className="text-sm font-medium text-gray-700">{car.rating || '4.5'}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <FaMapMarkerAlt className="text-rose-500 mr-1 text-base" />
                  <span className="line-clamp-1">{car.location?.wilaya}, {car.location?.address}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 text-sm mb-3">
                   <div className="flex items-center">
                    <FaGasPump className="mr-1 text-base" />
                    <span>{car.fuelType}</span>
                  </div>
                   <div className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-base" />
                    <span>{car.year}</span>
                  </div>
                   <div className="flex items-center">
                    <FaUsers className="mr-1 text-base" />
                    <span>{car.seats || '-'} seats</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xl font-bold text-rose-600">${car.pricePerDay?.toLocaleString()}</span>
                    <span className="text-sm text-gray-500"> / day</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cars.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaCar className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Cars Found</h3>
            <p className="text-gray-500">
              {selectedWilaya 
                ? `No cars available in ${selectedWilaya}. Try searching in another wilaya.`
                : 'No cars available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Car;