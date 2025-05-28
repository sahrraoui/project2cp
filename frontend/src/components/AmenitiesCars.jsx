import React, { useState } from 'react';
import { FaCar, FaGasPump, FaBluetooth, FaSnowflake, FaWifi, FaKey, FaCarSide, FaMusic, FaShieldAlt, FaTools } from 'react-icons/fa';
import './AmenitiesCars.css';

const AmenitiesCars = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const amenities = {
        featured: {
            icon: <FaCar />,
            title: "Automatic Transmission",
            description: "Smooth and easy driving experience"
        },
        additional: [
            {
                icon: <FaGasPump />,
                title: "Fuel Efficiency",
                description: "Optimized fuel consumption"
            },
            {
                icon: <FaBluetooth />,
                title: "Bluetooth Connectivity",
                description: "Hands-free calling and music streaming"
            },
            {
                icon: <FaSnowflake />,
                title: "Climate Control",
                description: "Automatic air conditioning system"
            },
            {
                icon: <FaWifi />,
                title: "WiFi Hotspot",
                description: "Stay connected on the go"
            },
            {
                icon: <FaKey />,
                title: "Keyless Entry",
                description: "Modern keyless entry system"
            },
            {
                icon: <FaCarSide />,
                title: "Parking Sensors",
                description: "Assisted parking system"
            },
            {
                icon: <FaMusic />,
                title: "Premium Sound",
                description: "High-quality audio system"
            },
            {
                icon: <FaShieldAlt />,
                title: "Safety Features",
                description: "Advanced safety systems"
            },
            {
                icon: <FaTools />,
                title: "Maintenance",
                description: "Regular maintenance included"
            }
        ]
    };

    return (
        <div className="amenities-container">
            <h2>What this car offers</h2>
            
            <div className="amenities-list">
                {/* Featured Amenity */}
                <div className="amenity-item featured">
                    <div className="amenity-icon">
                        {amenities.featured.icon}
                    </div>
                    <div className="amenity-details">
                        <span className="amenity-title">{amenities.featured.title}</span>
                        <span className="amenity-description">{amenities.featured.description}</span>
                    </div>
                </div>

                {/* Additional Amenities */}
                {isExpanded && (
                    <div className="additional-amenities">
                        {amenities.additional.map((amenity, index) => (
                            <div key={index} className="amenity-item">
                                <div className="amenity-icon">
                                    {amenity.icon}
                                </div>
                                <div className="amenity-details">
                                    <span className="amenity-title">{amenity.title}</span>
                                    <span className="amenity-description">{amenity.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Toggle Button */}
            <button 
                className={`toggle-button ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Show less' : 'Show all features'}
                <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
            </button>
        </div>
    );
};

export default AmenitiesCars; 