import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationCard from "./ReservationCard";
import RatingCars from "./RatingCars";
import Comments from "./Comments";
import Amenities from "./Amenities";
import Navbar from '../navbar';
import { 
  FaCoffee, 
  FaMapMarkedAlt, 
  FaUmbrellaBeach, 
  FaStar, 
  FaLocationArrow,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaSnowflake,
  FaUtensils,
  FaCar,
  FaConciergeBell,
  FaDumbbell
} from "react-icons/fa";

const API_BASE_URL = 'http://localhost:5000'; // Added API base URL

// Map of amenities to their descriptions and icons
const amenityDetails = {
  'wifi': {
    icon: <FaWifi className="text-pink-700 text-xl" />,
    description: 'High-speed WiFi available throughout the property'
  },
  'parking': {
    icon: <FaParking className="text-pink-700 text-xl" />,
    description: 'Free parking on premises'
  },
  'pool': {
    icon: <FaSwimmingPool className="text-pink-700 text-xl" />,
    description: 'Access to swimming pool'
  },
  'breakfast': {
    icon: <FaCoffee className="text-pink-700 text-xl" />,
    description: 'Complimentary breakfast included'
  },
  'restaurant': {
    icon: <FaUtensils className="text-pink-700 text-xl" />,
    description: 'On-site restaurant with local cuisine'
  },
  'air_conditioning': {
    icon: <FaSnowflake className="text-pink-700 text-xl" />,
    description: 'Climate controlled rooms'
  },
  'concierge': {
    icon: <FaConciergeBell className="text-pink-700 text-xl" />,
    description: '24/7 concierge service'
  },
  'gym': {
    icon: <FaDumbbell className="text-pink-700 text-xl" />,
    description: 'Fully equipped fitness center'
  },
  'beach_access': {
    icon: <FaUmbrellaBeach className="text-pink-700 text-xl" />,
    description: 'Direct beach access'
  },
  'city_tours': {
    icon: <FaMapMarkedAlt className="text-pink-700 text-xl" />,
    description: 'Guided city tours available'
  },
  'car_rental': {
    icon: <FaCar className="text-pink-700 text-xl" />,
    description: 'Car rental service available'
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

// Function to get the full image URL (Added)
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

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/hotels/${id}`);
        setHotel(response.data.hotel);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hotel details:', err);
        setError('Failed to load hotel details');
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center text-gray-500">
        Hotel not found
      </div>
    );
  }

  return (
    <div className="bg-[#f3eceb] min-h-screen font-sans">
      <Navbar />
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hotel Name and Rating */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
          <div className="flex items-center gap-3 text-gray-600">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold">{hotel.rating || 4.2}</span>
            <span>·</span>
            <span>{hotel.reviews?.length || 0} reviews</span>
            <span>·</span>
            <div className="flex items-center">
              <FaLocationArrow className="text-pink-700 mr-1" />
              <span>{hotel.location?.wilaya}, {hotel.location?.address}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-4 mb-8 rounded-xl overflow-hidden h-[400px]">
              <div className="col-span-2 row-span-2">
                <img 
                  src={`http://localhost:5173/public/gumballmail.webp`}
                  alt="Main" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {hotel.images?.slice(1, 5).map((img, index) => (
                <div key={index} className="overflow-hidden">
                  <img 
                    src={getImageUrl(img)} // Using getImageUrl
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex items-center gap-4">
                <img 
                  src={hotel.host?.avatar || "https://placehold.co/40x40"} 
                  alt="Host" 
                  className="w-16 h-16 rounded-full" 
                />
                <div>
                  <p className="text-pink-700 font-semibold">Verified Host</p>
                  <h3 className="text-xl font-bold">Hosted by {hotel.host?.name || "Host"}</h3>
                  <p className="text-gray-500">Member since {new Date(hotel.createdAt).getFullYear()}</p>
                </div>
              </div>
            </div>

            {/* Hotel Description */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this place</h2>
              <div className="space-y-4">
                {hotel.description ? (
                  <div className="prose prose-pink max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                      {
                        `${hotel.description}` 
                        }
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Location Details</h3>
                        <p className="text-gray-600">
                          <span className="block">Wilaya: {hotel.location?.wilaya || 'Location not specified'}</span>
                          <span className="block mt-1">Address: {hotel.location?.address || 'Address not specified'}</span>
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Pricing Information</h3>
                        <p className="text-gray-600">
                          <span className="block">Price per night: {hotel.pricePerNight?.toLocaleString() || 0} DZD</span>
                          <span className="block mt-1">Rooms available: {hotel.roomsAvailable || 1}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Room Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-900">Rooms Available</p>
                          <p className="text-gray-600">{hotel.roomsAvailable || 1} rooms</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Maximum Guests</p>
                          <p className="text-gray-600">{hotel.maxGuests || 2} guests per room</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic bg-gray-50 p-6 rounded-lg">
                    <p className="text-center mb-2">No detailed description available for this property.</p>
                    <p className="text-center text-sm">Please contact the host for more information.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Experience Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotel.amenities?.slice(0, 6).map((amenity, index) => {
                  const details = getAmenityDetails(amenity);
                  return (
                    <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="mt-1">
                        {details.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {amenity.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {details.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {hotel.amenities?.length > 6 && (
                <div className="mt-4 text-center">
                  <button 
                    className="text-pink-700 hover:text-pink-800 font-medium"
                    onClick={() => document.querySelector('#amenities-section').scrollIntoView({ behavior: 'smooth' })}
                  >
                    View all {hotel.amenities.length} amenities →
                  </button>
                </div>
              )}
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <Amenities amenities={hotel.amenities || []} />
            </div>

            {/* Ratings Section */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Rating Overview</h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-pink-700">{hotel.rating || 4.5}</span>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(hotel.rating || 4.5) ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{hotel.reviews?.length || 0} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
              <Comments reviews={hotel.reviews || []} showAll={false} />
            </div>
          </div>

          {/* Right Column - Reservation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReservationCard 
                pricePerNight={hotel.pricePerNight}
                guestsAllowed={hotel.maxGuests}
                availableDates={hotel.availableDates}
                hotelId={hotel._id}
                hotelDetails={{
                  title: hotel.name,
                  location: hotel.location,
                  images: hotel.images,
                  amenities: hotel.amenities,
                  rating: hotel.rating,
                  maxGuests: hotel.maxGuests,
                  roomsAvailable: hotel.roomsAvailable
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Travelease</h3>
              <p className="text-gray-600">Your trusted travel company across Algeria</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-pink-700">Assistance</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-pink-700">Helpdesk</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-pink-700">Support team</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-pink-700">User manual</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}