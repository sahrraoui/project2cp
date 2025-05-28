import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCcPaypal, 
  FaCcMastercard, 
  FaCcVisa, 
  FaLock, 
  FaExchangeAlt,
  FaCreditCard,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import axios from 'axios';

const CreditCardForm = ({ type, formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {type === 'mastercard' ? 'Mastercard' : 'Visa'} Details
      </h3>
      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded-md pr-10"
              maxLength="19"
            />
            <FaCreditCard className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Secure Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secure Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="securePassword"
              value={formData.securePassword}
              onChange={handleChange}
              placeholder="Enter your secure password"
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>

        {/* Confirm Secure Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Secure Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your secure password"
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PayPalForm = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">PayPal Account</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PayPal Email
          </label>
          <input
            type="email"
            name="paypalEmail"
            value={formData.paypalEmail}
            onChange={handleChange}
            placeholder="your-email@example.com"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Secure Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secure Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="securePassword"
              value={formData.securePassword}
              onChange={handleChange}
              placeholder="Enter your secure password"
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Secure Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Secure Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your secure password"
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          You will be redirected to PayPal to complete your payment securely.
        </p>
      </div>
    </div>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUSD, setShowUSD] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    securePassword: '',
    confirmPassword: '',
    paypalEmail: ''
  });
  const bookingDetails = location.state?.bookingDetails;

  // Exchange rate (you might want to fetch this from an API)
  const DZD_TO_USD_RATE = 0.0074; // 1 DZD = 0.0074 USD (approximate)

  const convertToUSD = (amountInDZD) => {
    return (amountInDZD * DZD_TO_USD_RATE).toFixed(2);
  };

  const formatCurrency = (amount, currency = 'DZD') => {
    if (currency === 'USD') {
      return `$${convertToUSD(amount)}`;
    }
    return `${amount.toLocaleString()} DZD`;
  };

  const toggleCurrency = () => {
    setShowUSD(!showUSD);
  };

  const validateForm = () => {
    if (!formData.securePassword || !formData.confirmPassword) {
      setError('Please enter and confirm your secure password');
      return false;
    }

    if (formData.securePassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.securePassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (selectedMethod === 'paypal' && !formData.paypalEmail) {
      setError('Please enter your PayPal email');
      return false;
    }

    if ((selectedMethod === 'mastercard' || selectedMethod === 'visa') && 
        !formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }

    return true;
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'paypal':
        return <PayPalForm formData={formData} setFormData={setFormData} />;
      case 'mastercard':
      case 'visa':
        return <CreditCardForm type={selectedMethod} formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-[#f3eceb] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">No booking details found. Please try again.</p>
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

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaCcPaypal className="text-4xl text-[#003087]" />,
      description: 'Pay securely with PayPal'
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      icon: <FaCcMastercard className="text-4xl text-[#eb001b]" />,
      description: 'Pay with Mastercard credit/debit card'
    },
    {
      id: 'visa',
      name: 'Visa',
      icon: <FaCcVisa className="text-4xl text-[#1a1f71]" />,
      description: 'Pay with Visa credit/debit card'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const bookingResponse = await axios.post(
        'http://localhost:5000/api/v1/bookings',
        bookingDetails,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!bookingResponse.data || !bookingResponse.data.booking) {
        throw new Error('Failed to create booking');
      }

      const bookingId = bookingResponse.data.booking._id;

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await axios.post(
        `http://localhost:5000/api/v1/bookings/${bookingId}/payment`,
        { 
          paymentMethod: selectedMethod,
          paymentStatus: 'completed',
          amountPaid: {
            dzd: bookingDetails.totalPrice,
            usd: parseFloat(convertToUSD(bookingDetails.totalPrice))
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      navigate('/payment-success', { 
        state: { 
          paymentDetails: {
            amount: bookingDetails.totalPrice,
            amountUSD: convertToUSD(bookingDetails.totalPrice),
            method: selectedMethod,
            bookingId: bookingId
          }
        }
      });
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3eceb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-pink-600 text-white px-6 py-4">
            <h1 className="text-2xl font-semibold">Complete Your Payment</h1>
            <p className="mt-1 text-pink-100">Secure payment processing</p>
          </div>

          {/* Booking Summary */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Booking Summary</h2>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>Check-in: {new Date(bookingDetails.startDate).toLocaleDateString()}</p>
              <p>Check-out: {new Date(bookingDetails.endDate).toLocaleDateString()}</p>
              <p>Guests: {bookingDetails.guests.total} ({bookingDetails.guests.adults} adults, {bookingDetails.guests.children} children)</p>
              
              {/* Price with Currency Toggle */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-800">
                    Total Amount: {formatCurrency(bookingDetails.totalPrice, showUSD ? 'USD' : 'DZD')}
                  </p>
                  <button
                    onClick={toggleCurrency}
                    className="flex items-center space-x-2 text-pink-600 hover:text-pink-700"
                  >
                    <FaExchangeAlt />
                    <span className="text-sm">
                      Switch to {showUSD ? 'DZD' : 'USD'}
                    </span>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {showUSD 
                    ? `${bookingDetails.totalPrice.toLocaleString()} DZD`
                    : `$${convertToUSD(bookingDetails.totalPrice)} USD`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-pink-600 bg-pink-50'
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setError('');
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? 'border-pink-600 bg-pink-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedMethod === method.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Payment Form */}
              {renderPaymentForm()}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Secure Payment Notice */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <FaLock className="mr-2" />
              <span>Your payment information is secure</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading || !selectedMethod}
              className={`mt-6 w-full py-3 px-4 rounded-md text-white font-semibold
                ${
                  loading || !selectedMethod
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Pay ${formatCurrency(bookingDetails.totalPrice, 'USD')}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 