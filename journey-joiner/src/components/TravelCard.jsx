import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';
import beachBumImage from "../assets/beach-bum.png"
import foodieImage from "../assets/foodie.png"
import adventurerImage from "../assets/adventurer.png"
import museumMagnetImage from "../assets/museum-magnet.png"


export default function TravelCard({ profileData }) {
  console.log('Rendering TravelCard with profileData:', profileData);


  const renderInterestImages = () => {
    if (!profileData) {
      return null;
    }
    const images = [];
    if (profileData.interest_beach_bum) {
      images.push(<img key="beachBum" src={beachBumImage} alt="Beach Bum" width="50" height="50" />);
    }
    if (profileData.interest_foodie) {
      images.push(<img key="foodie" src={foodieImage} alt="Foodie" width="50" height="50" />);
    }
    if (profileData.interest_adventurer) {
      images.push(<img key="adventurer" src={adventurerImage} alt="Adventurer" width="50" height="50" />);
    }
    if (profileData.interest_museum_magnet) {
      images.push(<img key="museumMagnet" src={museumMagnetImage} alt="Museum Magnet" width="50" height="50" />);
    }
    return images;
  };
  

  
  if (!profileData) {
    return null;
  }
  


  return (
    <div className="travel-card-container">
      <div className="travel-card-left">
        <div className="travel-card-profile-picture">
          <img src={profileData.profile_picture || defaultProfileImage} alt="Profile" />
        </div>
        <div className="travel-card-data-left">
          <p id="travel-card-name">{profileData.first_name}, {profileData.age}</p>
          <p id="travel-card-budget">Budget: {profileData.budget}/day</p>
        </div>
      </div>
      <div className="travel-card-right">
        <div className="travel-card-bio">
          <p>{profileData.bio}</p>
        </div>

        <div className="travel-card-interests">
          {renderInterestImages()}
        </div>
      </div>
    </div>
  );
}
