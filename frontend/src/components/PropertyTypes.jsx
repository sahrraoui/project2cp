import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaCar
} from 'react-icons/fa';
import Navbar from '../navbar';
import './PropertyTypes.css';

const PropertyTypes = () => {
  const navigate = useNavigate();
  
  const propertyTypes = [
    {
      icon: <FaHome />,
      title: "Home",
      description: "List your house, apartment, or any living space for guests to stay",
      type: "home"
    },
    {
      icon: <FaCar />,
      title: "Car",
      description: "Rent out your vehicle for guests to explore",
      type: "car"
    }
  ];

  const handleGetStarted = (propertyType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: propertyType === 'car' ? '/create-car' : `/property-form/${propertyType}` } });
      return;
    }
    if (propertyType === 'car') {
      navigate('/create-car');
    } else {
      navigate(`/property-form/${propertyType}`);
    }
  };

  return (
    <div className="property-types-container">
      <Navbar />
      <div className="property-types-content">
        <h1 className="property-types-title">Host an Experience</h1>
        <h2 className="property-types-subtitle">Choose Your Property Type</h2>
        <div className="property-cards-container">
          {propertyTypes.map((property, index) => (
            <div key={index} className="property-card">
              <div className="card-icon">
                {property.icon}
              </div>
              <h2>{property.title}</h2>
              <p>{property.description}</p>
              <button 
                className="get-started-btn"
                onClick={() => handleGetStarted(property.type)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyTypes; 