import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationCard from "./ReservationCard";
import Comments from "./Comments";
import { 
  FaStar, 
  FaLocationArrow,
  FaGasPump,
  FaCar,
  FaCogs,
  FaWifi,
  FaBluetoothB,
  FaSnowflake,
  FaCalendarAlt,
  FaUsers,
  FaKey
} from "react-icons/fa";

// Map of features to their descriptions and icons
const featureDetails = {
  'automatic transmission': {
    icon: <FaCogs className="text-pink-700 text-xl" />,
    description: 'Smooth automatic transmission'
  },
  'gps navigation': {
    icon: <FaWifi className="text-pink-700 text-xl" />,
    description: 'Built-in GPS navigation system'
  },
  'bluetooth': {
    icon: <FaBluetoothB className="text-pink-700 text-xl" />,
    description: 'Bluetooth connectivity'
  },
  'air conditioning': {
    icon: <FaSnowflake className="text-pink-700 text-xl" />,
    description: 'Climate control system'
  }
};

// Function to get feature details with fallback
const getFeatureDetails = (featureKey) => {
  const defaultDetail = {
    icon: <FaCar className="text-pink-700 text-xl" />,
    description: featureKey.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  };
  
  return featureDetails[featureKey.toLowerCase()] || defaultDetail;
};

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/cars/${id}`);
        setCar(response.data.car);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to load car details');
        setLoading(false);
      }
    };

    fetchCarDetails();
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

  if (!car) {
    return (
      <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center text-gray-500">
        Car not found
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

  return (
    <div className="bg-[#f3eceb] min-h-screen font-sans">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Car Title and Rating */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{car.make} {car.model} {car.year}</h1>
          <div className="flex items-center gap-3 text-gray-600">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold">{car.rating || 4.2}</span>
            <span>·</span>
            <span>{car.reviews?.length || 0} reviews</span>
            <span>·</span>
            <div className="flex items-center">
              <FaLocationArrow className="text-pink-700 mr-1" />
              <span>{car.location?.wilaya}, {car.location?.address}</span>
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
                  src={car.images?.[0]?.startsWith('/uploads') 
                    ? `http://localhost:5000${car.images[0]}`
                    : car.images?.[0] || "https://placehold.co/600x400"} 
                  alt="Main" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {car.images?.slice(1, 5).map((img, index) => (
                <div key={index} className="overflow-hidden">
                  <img 
                    src={img?.startsWith('/uploads') 
                      ? `http://localhost:5000${img}`
                      : img || `https://placehold.co/300x200`}
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>

            {/* Owner Information */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex items-center gap-4">
                <img 
                  src={car.owner?.avatar || "https://placehold.co/40x40"} 
                  alt="Owner" 
                  className="w-16 h-16 rounded-full" 
                />
                <div>
                  <p className="text-pink-700 font-semibold">Verified Owner</p>
                  <h3 className="text-xl font-bold">Listed by {car.owner?.name || "Owner"}</h3>
                  <p className="text-gray-500">Member since {new Date(car.createdAt).getFullYear()}</p>
                </div>
              </div>
            </div>

            {/* Car Description */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this car</h2>
              <div className="space-y-4">
                {car.description ? (
                  <div className="prose prose-pink max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                      {car.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Location Details</h3>
                        <p className="text-gray-600">
                          <span className="block">Wilaya: {car.location?.wilaya || 'Location not specified'}</span>
                          <span className="block mt-1">Address: {car.location?.address || 'Address not specified'}</span>
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Vehicle Information</h3>
                        <p className="text-gray-600">
                          <span className="block">Price per day: ${car.price?.toLocaleString() || 0}</span>
                          <span className="block mt-1">Type: {car.vehicleType}</span>
                          <span className="block mt-1">Fuel: {car.fuelType}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">License Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-900">License Plate</p>
                          <div className="flex items-center text-gray-600 mt-1">
                            <FaKey className="mr-2" />
                            <span>{car.licensePlate}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Availability</p>
                          <div className="flex items-center text-gray-600 mt-1">
                            <FaCalendarAlt className="mr-2" />
                            <span>{car.availableDates?.length || 0} dates available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic bg-gray-50 p-6 rounded-lg">
                    <p className="text-center mb-2">No detailed description available for this vehicle.</p>
                    <p className="text-center text-sm">Please contact the owner for more information.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Available Dates */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Available Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.availableDates?.map((date, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{formatDate(date)}</span>
                      <span className="text-pink-700 font-medium">${car.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              {(!car.availableDates || car.availableDates.length === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No dates currently available
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {car.features?.map((feature, index) => {
                  const details = getFeatureDetails(feature);
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="mt-1">
                        {details.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {feature.split('_').map(word => 
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
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{car.rating || 4.5}</span>
                  <span className="text-gray-500">({car.reviews?.length || 0} reviews)</span>
                </div>
              </div>
              <Comments reviews={car.reviews || []} showAll={false} />
            </div>
          </div>

          {/* Right Column - Reservation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReservationCard 
                pricePerDay={car.price}
                availableDates={car.availableDates}
                type="car"
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Location</h2>
          <div className="w-full h-[400px] bg-gray-100 rounded-xl relative">
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
              <span className="text-gray-600">📍 {car.location?.address}</span>
            </div>
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500">Map Loading...</span>
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