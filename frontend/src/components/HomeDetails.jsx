import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationCard from "./ReservationCard";
import RatingCars from "./RatingCars";
import Comments from "./Comments";
import Amenities from "./Amenities";
import { 
  FaWifi, 
  FaMapMarkedAlt, 
  FaUmbrellaBeach, 
  FaStar, 
  FaLocationArrow,
  FaParking,
  FaSwimmingPool,
  FaSnowflake,
  FaUtensils,
  FaCar,
  FaConciergeBell,
  FaDumbbell,
  FaUsers,
  FaCalendarAlt,
  FaBed,
  FaBath,
  FaTv,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaWhatsapp
} from "react-icons/fa";
import Navbar from '../navbar';

const API_BASE_URL = 'http://localhost:5000';

// Map of amenities to their descriptions and icons
const amenityDetails = {
  'wifi': {
    icon: <FaWifi className="text-pink-700 text-xl" />,
    description: 'High-speed WiFi available'
  },
  'parking': {
    icon: <FaParking className="text-pink-700 text-xl" />,
    description: 'Free parking on premises'
  },
  'pool': {
    icon: <FaSwimmingPool className="text-pink-700 text-xl" />,
    description: 'Private swimming pool'
  },
  'air conditioning': {
    icon: <FaSnowflake className="text-pink-700 text-xl" />,
    description: 'Climate controlled rooms'
  }
};

// Function to get amenity details with fallback
const getAmenityDetails = (amenityKey) => {
  const defaultDetail = {
    icon: <FaConciergeBell className="text-pink-700 text-xl" />,
    description: amenityKey.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  };
  
  return amenityDetails[amenityKey.toLowerCase()] || defaultDetail;
};

const HomeDetails = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/homes/${id}`);
        setHome(response.data.home);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch home details');
        setLoading(false);
      }
    };

    fetchHomeDetails();
  }, [id]);

  // Function to get the full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x600?text=No+Image';
    
    // If the image path is a full URL, return it as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If the image path starts with /uploads, append it to the API base URL
    if (imagePath.startsWith('/uploads')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    
    // For other cases, assume it's a relative path in the uploads directory
    return `${API_BASE_URL}/uploads/${imagePath}`;
  };

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

  if (error || !home) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-red-500">{error || 'Home not found'}</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wi-fi':
        return <FaWifi className="text-blue-500" />;
      case 'pool':
        return <FaSwimmingPool className="text-cyan-500" />;
      case 'free parking':
        return <FaParking className="text-gray-500" />;
      case 'air conditioning':
        return <FaSnowflake className="text-sky-500" />;
      case 'tv':
        return <FaTv className="text-gray-600" />;
      case 'kitchen':
        return <FaUtensils className="text-orange-500" />;
      case 'gym':
        return <FaDumbbell className="text-purple-500" />;
      default:
        return <FaCheckCircle className="text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={`http://localhost:5173/public/gumball.jpg`}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {home.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-rose-500' : ''
                    }`}
                  >
                    <img
                      src={`http://localhost:5173/public/room.webp`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Home Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {home.title}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <FaStar />
                    <span className="ml-1 text-gray-700">{home.rating || '4.5'}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{home.totalRatings || 0} ratings</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <FaMapMarkedAlt className="text-rose-500 mr-2" />
                <span>{home.location?.wilaya}, {home.location?.address}</span>
              </div>

              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaBed className="text-gray-400" />
                  <span>{home.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-gray-400" />
                  <span>{home.bathrooms} bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-gray-400" />
                  <span>Up to {home.maxGuests} guests</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{home.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {home.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-rose-600">${home.pricePerNight?.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">/ night</span>
                  </div>
                </div>
                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>
                {home.reviews?.length > 0 ? (
                  <div className="space-y-4">
                    {home.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-400">
                            <FaStar />
                            <span className="ml-1 text-gray-700">{review.rating}</span>
                          </div>
                          <span className="text-gray-600">{review.comment}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
              </div>

              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Host</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => window.open(`https://wa.me/${home.phone}`, '_blank')}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails; 