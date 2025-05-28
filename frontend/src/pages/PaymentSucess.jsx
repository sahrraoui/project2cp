import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaDollarSign } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state?.paymentDetails;

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">No payment details found. Please try again.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>
          
          <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex flex-col space-y-1">
                  <p className="text-lg font-medium">Amount Paid:</p>
                  <div className="ml-4 space-y-1">
                    <p className="flex items-center">
                      <span className="w-12 inline-block">DZD:</span>
                      <span className="font-semibold">{paymentDetails.amount.toLocaleString()} DZD</span>
                    </p>
                    <p className="flex items-center text-green-600">
                      <span className="w-12 inline-block">USD:</span>
                      <span className="font-semibold">${paymentDetails.amountUSD}</span>
                    </p>
                  </div>
                </div>
                <p>Payment Method: {paymentDetails.method.charAt(0).toUpperCase() + paymentDetails.method.slice(1)}</p>
                <p>Booking ID: {paymentDetails.bookingId}</p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>A confirmation email has been sent to your registered email address.</p>
              <p className="mt-2">Your payment has been processed successfully.</p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                View Booking Details
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaHome className="mr-2" />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 