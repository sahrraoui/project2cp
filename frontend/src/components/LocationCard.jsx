import React, { useState } from 'react';
import './LocationCard.css';

const LocationCard = ({ locationData }) => {
  const [activeTab, setActiveTab] = useState('main');

  return (
    <div className="location-card">
      <h1>Where will you be</h1>
      <h2>You will be here in {locationData.city}</h2>
      
      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'main' ? 'active' : ''}`}
          onClick={() => setActiveTab('main')}
        >
          Main Location
        </button>
        <button 
          className={`tab ${activeTab === 'park' ? 'active' : ''}`}
          onClick={() => setActiveTab('park')}
        >
          Park Area
        </button>
      </div>
      
      {/* Main Location Content */}
      {activeTab === 'main' && (
        <div className="location-content">
          <div className="location-item">
            <h3>{locationData.mainAttraction.name}</h3>
            <p>{locationData.mainAttraction.description}</p>
          </div>
          
          <div className="location-item verified">
            <h3>Verified listing</h3>
            <p>{locationData.verifiedListing.details}</p>
            <p>{locationData.verifiedListing.additionalInfo}</p>
          </div>
          
          <div className="location-item">
            <h3>{locationData.secondaryAttraction.name}</h3>
            <p>{locationData.secondaryAttraction.description}</p>
            <p className="map-info">Map from ©{new Date().getFullYear()} Google</p>
            <p className="user-comment">{locationData.userComment}</p>
          </div>
          
          <div className="footer-links">
            <a href="/terms">Terms</a>
            <a href="/report">Report a nice year</a>
          </div>
        </div>
      )}
      
      {/* Park Area Content */}
      {activeTab === 'park' && (
        <div className="location-content">
          <div className="park-section">
            <h3>{locationData.parkArea.title}</h3>
            
            {locationData.parkArea.attractions.map((attraction, index) => (
              <div key={index} className="location-item">
                <h4>{attraction.name}</h4>
                <p>{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCard; 