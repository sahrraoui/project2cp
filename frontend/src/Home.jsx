import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Firstpart from './firstpart';
import HotelCardRow from './HotelCardRow';
import CarCardRow from './CarCardRow';
import RentalCardRow from './RentalCardRow';
import Secondpart from './second';
import lowla from "./assets/image/lowla.png";
import tania from "./assets/image/tania.png";
import thaltha from "./assets/image/thaltha.png";
import rab3a from "./assets/image/rab3a.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <Navbar />

      {/* First Part Section */}
      <div className="firstpart-container">
        <Firstpart />
      </div>

      {/* Main Content Section */}
      <div className="min-h-screen bg-[#F5F5F5] py-8">
        {/* Hotels Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Hotels</h2>
            <button 
              onClick={() => navigate('/hotel')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Hotels →
            </button>
          </div>
          <HotelCardRow />
        </div>

        {/* Cars Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <button 
              onClick={() => navigate('/car')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Cars →
            </button>
          </div>
          <CarCardRow />
        </div>

        {/* Rentals Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Rentals</h2>
            <button 
              onClick={() => navigate('/rental')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Rentals →
            </button>
          </div>
          <RentalCardRow />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="secondpart-container ">
      <Secondpart />
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-200 py-8 px-9 bg-gray-300 border-t border-gray-400">
        <div className="max-w-7xl mx-auto px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - TravelEase */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">TravelEase</h2>
            <p className="text-gray-600 text-sm">Your trusted travel company across Algeria</p>
          </div>
          {/* Right Column - Support and Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-pink-700">Assistance</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-700">Helpdesk</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-pink-700">Support team</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-700">User manual</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

