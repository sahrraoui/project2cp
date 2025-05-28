<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/cars" element={<Car />} />
        <Route path="/rentals" element={<Rental />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-ver" element={<EmailVer />} />
        <Route path="/verify-code" element={<VerCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>



import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Hotelcardrow from './HotelCardRow';
import CarCardRow from './CarCardRow';
import RentalCardRow from './RentalCardRow';
import cama from '/public/vv.jpg'

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5F5] py-8">
        {/* Hotels Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Hotels</h2>
            <button 
              onClick={() => navigate('/hotels')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Hotels →
            </button>
          </div>
          <Hotelcardrow />
        </div>

        {/* Cars Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <button 
              onClick={() => navigate('/cars')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Cars →
            </button>
          </div>
          <CarCardRow />
        </div>

        {/* Rentals Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Rentals</h2>
            <button 
              onClick={() => navigate('/rentals')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Rentals →
            </button>
          </div>
          <RentalCardRow />
        </div>
      </div>
