import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
import { 
  FaHome,
  FaStar, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaCalendarAlt,
  FaUsers,
  FaBed,
  FaBath,
  FaCheck,
  FaChevronDown
} from 'react-icons/fa';

const Rental = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedWilaya, setSelectedWilaya] = useState(searchParams.get('wilaya') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const reservationDetails = location.state?.reservationDetails;

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const wilaya = searchParams.get('wilaya');
        const url = wilaya 
          ? `http://localhost:5000/api/v1/homes?wilaya=${wilaya}`
          : 'http://localhost:5000/api/v1/homes';
        const response = await axios.get(url);
        setHomes(response.data.homes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch homes');
        setLoading(false);
      }
    };

    fetchHomes();
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
      
      {reservationDetails ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Reservation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Property Details */}
              <div>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  
                </div>
                <h3 className="text-xl font-semibold mb-2">{reservationDetails.propertyDetails.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="text-rose-500 mr-2" />
                  <span>{reservationDetails.propertyDetails.location.wilaya}, {reservationDetails.propertyDetails.location.address}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <FaBed className="text-gray-400 mr-2" />
                    <span>{reservationDetails.propertyDetails.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-gray-400 mr-2" />
                    <span>{reservationDetails.propertyDetails.bathrooms} bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-2" />
                    <span>Up to {reservationDetails.propertyDetails.maxGuests} guests</span>
                  </div>
                </div>
              </div>

              {/* Reservation Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-rose-500 mr-2" />
                      <span>Check-in</span>
                    </div>
                    <span className="font-medium">{formatDate(reservationDetails.checkInDate)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-rose-500 mr-2" />
                      <span>Check-out</span>
                    </div>
                    <span className="font-medium">{formatDate(reservationDetails.checkOutDate)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaUsers className="text-rose-500 mr-2" />
                      <span>Guests</span>
                    </div>
                    <span className="font-medium">
                      {reservationDetails.guests.adults} adults, {reservationDetails.guests.children} children
                    </span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">${reservationDetails.pricePerNight} × {reservationDetails.totalNights} nights</span>
                      <span className="font-medium">${reservationDetails.totalPrice}</span>
                    </div>
                    <button
                      onClick={() => {
                        alert('Reservation confirmed! You will receive a confirmation email shortly.');
                        navigate('/');
                      }}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium mt-6"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section with Search */}
          <div className="relative bg-rose-500 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Home</h1>
                <p className="text-white text-lg">Select a wilaya to discover available rentals</p>
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
                      {/* Show all homes option */}
                      <div
                        className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-100"
                        onClick={() => handleSearch('')}
                      >
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-gray-600">Show all homes</span>
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

          {/* Homes Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative" style={{ zIndex: 1 }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedWilaya 
                  ? `Available Homes in ${selectedWilaya}`
                  : 'All Available Homes'}
              </h2>
              {selectedWilaya && (
                <button
                  onClick={() => handleSearch('')}
                  className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-2"
                >
                  <span>Show all homes</span>
                  <FaMapMarkerAlt />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {homes.map((home) => (
                <div
                  key={home._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
                  onClick={() => navigate(`/homes/${home._id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`http://localhost:5173/public/gumball.jpg`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                        {home.title}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-400">
                        <FaStar className="text-sm"/>
                        <span className="text-sm font-medium text-gray-700">{home.rating || '4.5'}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <FaMapMarkerAlt className="text-rose-500 mr-1 text-base" />
                      <span className="line-clamp-1">{home.location.wilaya}, {home.location.address}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xl font-bold text-rose-600">${home.pricePerNight?.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-1">/ night</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {homes.length === 0 && !loading && (
              <div className="text-center py-12">
                <FaMapMarkerAlt className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Homes Found</h3>
                <p className="text-gray-500">
                  {selectedWilaya 
                    ? `No homes available in ${selectedWilaya}. Try searching in another wilaya.`
                    : 'No homes available at the moment.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Rental; 