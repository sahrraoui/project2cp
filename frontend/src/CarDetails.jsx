import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import {
  FaGasPump,
  FaCar,
  FaCogs,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaSnowflake,
  FaWifi,
  FaBluetoothB,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaWhatsapp
} from 'react-icons/fa';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/cars/${id}`);
        setCar(response.data.car);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

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

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-red-500">{error || 'Car not found'}</div>
        </div>
      </div>
    );
  }

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case 'air conditioning':
        return <FaSnowflake className="text-sky-500" />;
      case 'bluetooth':
        return <FaBluetoothB className="text-blue-600" />;
      case 'gps':
        return <FaWifi className="text-blue-500" />;
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
                  src={car.images[activeImage]?.startsWith('/uploads') 
                    ? `http://localhost:5000${car.images[activeImage]}`
                    : car.images[activeImage] || 'https://via.placeholder.com/800x600?text=No+Image'}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-rose-500' : ''
                    }`}
                  >
                    <img
                      src={image.startsWith('/uploads') 
                        ? `http://localhost:5000${image}`
                        : image}
                      alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.make} {car.model} {car.year}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <FaStar />
                    <span className="ml-1 text-gray-700">{car.rating || '4.5'}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{car.totalRatings || 0} ratings</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="text-rose-500 mr-2" />
                <span>{car.location?.wilaya}, {car.location?.address}</span>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {car.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      {getFeatureIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-rose-600">${car.pricePerDay?.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">/ day</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>
                {car.reviews?.length > 0 ? (
                  <div className="space-y-4">
                    {car.reviews.map((review, index) => (
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    <FaPhone />
                    <span>Call</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                    <FaEnvelope />
                    <span>Email</span>
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

export default CarDetails; 