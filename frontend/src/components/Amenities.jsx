import React, { useState } from 'react';
import { FaUmbrellaBeach, FaKitchenSet, FaBath, FaTv, FaFireExtinguisher, FaUmbrella } from 'react-icons/fa6';
import './Amenities.css';

const Amenities = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const amenities = {
        featured: {
            icon: <FaUmbrellaBeach />,
            title: "A beach view",
            description: "Enjoy beautiful ocean views"
        },
        additional: [
            {
                icon: <FaKitchenSet />,
                title: "Kitchen",
                description: "Full kitchen with modern appliances"
            },
            {
                icon: <FaBath />,
                title: "Bathroom",
                description: "Modern bathroom facilities"
            },
            {
                icon: <FaTv />,
                title: "Entertainment",
                description: "Smart TV with streaming services"
            },
            {
                icon: <FaFireExtinguisher />,
                title: "Safety",
                description: "Fire extinguisher and smoke alarms"
            },
            {
                icon: <FaUmbrella />,
                title: "Outdoor",
                description: "Beach equipment available"
            }
        ]
    };

    return (
        <div className="amenities-container">
            <h2>What this place offers</h2>
            
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
                {isExpanded ? 'Show less' : 'Show all the equipments'}
                <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
            </button>
        </div>
    );
};

export default Amenities; 