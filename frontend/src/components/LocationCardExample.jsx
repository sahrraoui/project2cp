import React from 'react';
import LocationCard from './LocationCard';

const LocationCardExample = () => {
  // Sample data structure for the LocationCard component
  const sampleLocationData = {
    city: "Paris",
    mainAttraction: {
      name: "Eiffel Tower Area",
      description: "Located in the heart of Paris, this iconic landmark is surrounded by beautiful gardens and cafes."
    },
    verifiedListing: {
      details: "This location has been verified by our team",
      additionalInfo: "24/7 security and easy access to public transportation"
    },
    secondaryAttraction: {
      name: "Champ de Mars",
      description: "A beautiful public greenspace perfect for picnics and outdoor activities"
    },
    userComment: "Amazing location with stunning views of the city!",
    parkArea: {
      title: "Nearby Parks and Recreation",
      attractions: [
        {
          name: "Trocadéro Gardens",
          description: "Beautiful fountains and the best view of the Eiffel Tower"
        },
        {
          name: "River Seine Walkway",
          description: "Scenic riverside paths perfect for evening strolls"
        },
        {
          name: "Luxembourg Gardens",
          description: "Historic park with fountains and flower gardens"
        }
      ]
    }
  };

  return (
    <div>
      <LocationCard locationData={sampleLocationData} />
    </div>
  );
};

export default LocationCardExample; 