import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationCard.css';

const ReservationCard = ({ pricePerNight = 150, homeId, hotelId, homeDetails, hotelDetails }) => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0
  });

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const newGuests = { ...prev };
      const currentTotalGuests = newGuests.adults + newGuests.children;

      if (operation === 'increase') {
        if (currentTotalGuests < 4) {
          newGuests[type] = prev[type] + 1;
        }
      } else { // operation === 'decrease'
        newGuests[type] = Math.max(0, prev[type] - 1);
      }

      return newGuests;
    });
  };

  const totalGuests = guests.adults + guests.children;

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate price increase based on guests
    // Assuming pricePerNight is for the first adult
    const additionalAdults = Math.max(0, guests.adults - 1);
    const additionalChildren = guests.children;
    const guestPriceIncreasePerNight = (additionalAdults * pricePerNight * 0.8) + (additionalChildren * pricePerNight * 0.5);

    const adjustedPricePerNight = pricePerNight + guestPriceIncreasePerNight;

    return diffDays * adjustedPricePerNight;
  };

  const validateDates = () => {
    if (!checkInDate || !checkOutDate) {
      setError('Please select both check-in and check-out dates');
      return false;
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setError('Check-in date cannot be in the past');
      return false;
    }

    if (end <= start) {
      setError('Check-out date must be after check-in date');
      return false;
    }

    return true;
  };

  const handleReservation = () => {
    try {
      setError('');

      // Validate dates
      if (!validateDates()) {
        return;
      }

      // Validate authentication
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to make a reservation');
        navigate('/login');
        return;
      }

      const totalPrice = calculateTotalPrice();
      const totalNights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
      
      // Navigate directly to payment page
      navigate('/payment', {
        state: {
          bookingDetails: {
            itemType: hotelId ? "Hotel" : "Home",
            itemId: hotelId || homeId,
            startDate: checkInDate,
            endDate: checkOutDate,
            totalPrice: totalPrice,
            pricePerNight: pricePerNight,
            totalNights: totalNights,
            guests: {
              adults: guests.adults,
              children: guests.children,
              total: totalGuests
            },
            details: hotelDetails || homeDetails
          }
        }
      });
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="reservation-card">
      <h2>What this place offers</h2>
      
      {error && (
        <div className="error-message mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <ul className="amenities-list">
        <li>A beach view</li>
        <li><strong>{pricePerNight} DZD</strong> Night</li>
        {calculateTotalPrice() > 0 && (
          <li className="total-price">
            <strong>Total: {calculateTotalPrice()} DZD</strong>
            <span className="text-sm text-gray-500">
              ({Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))} nights)
            </span>
          </li>
        )}
      </ul>
      
      <div className="date-selector">
        <div className="date-input">
          <label>Check in</label>
          <input 
            type="date" 
            value={checkInDate}
            onChange={(e) => {
              setCheckInDate(e.target.value);
              setError('');
            }}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="date-input">
          <label>Check out</label>
          <input 
            type="date" 
            value={checkOutDate}
            onChange={(e) => {
              setCheckOutDate(e.target.value);
              setError('');
            }}
            min={checkInDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      
      <div className="guest-selector">
        <div className="guest-summary" onClick={() => setShowGuestSelector(!showGuestSelector)}>
          <span>Guests</span>
          <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
        </div>
        
        {showGuestSelector && (
          <div className="guest-options">
            <div className="guest-option">
              <div>
                <span>Adults</span>
              </div>
              <div className="guest-counter">
                <button 
                  onClick={() => handleGuestChange('adults', 'decrease')}
                  disabled={guests.adults <= 1}
                >
                  −
                </button>
                <span>{guests.adults}</span>
                <button 
                  onClick={() => handleGuestChange('adults', 'increase')}
                  disabled={totalGuests >= 4}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="guest-option">
              <div>
                <span>Children</span>
              </div>
              <div className="guest-counter">
                <button 
                  onClick={() => handleGuestChange('children', 'decrease')}
                  disabled={guests.children <= 0}
                >
                  −
                </button>
                <span>{guests.children}</span>
                <button 
                  onClick={() => handleGuestChange('children', 'increase')}
                  disabled={totalGuests >= 4}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="reserve-button" 
        onClick={handleReservation}
      >
        Reserve
      </button>
    </div>
  );
};

export default ReservationCard; 