import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';
import beachBumImage from "../assets/beach-bum.png"
import foodieImage from "../assets/foodie.png"
import adventurerImage from "../assets/adventurer.png"
import museumMagnetImage from "../assets/museum-magnet.png"


export default function TravelCard({ profileData }) {

  const renderInterestImages = () => {
    return profileData.interests.map((interest) => {
      switch (interest) {
        case 'beach bum':
          return <img src={beachBumImage} alt="Beach Bum" width="50" height="50" />;
        case 'foodie':
          return <img src={foodieImage} alt="Foodie" width="50" height="50" />;
        case 'adventurer':
          return <img src={adventurerImage} alt="Adventurer" width="50" height="50" />;
        case 'museum magnet':
          return <img src={museumMagnetImage} alt="Museum Magnet" width="50" height="50" />;
        default:
          return null;
      }
    });
  };


  return (
    <div className="travel-card-container">
      <div className="travel-card-left">
        <div className="travel-card-profile-picture">
          <img src={profileData.profilePicture || defaultProfileImage} alt="Profile" />
        </div>
        <div className="travel-card-data-left">
          <p id="travel-card-name">{profileData.firstName}, {profileData.age}</p>
          <p id="travel-card-budget">Budget: {profileData.budget}/day</p>
        </div>
      </div>
      <div className="travel-card-right">
        <div className="travel-card-bio">
          <p>Bio: {profileData.bio}</p>
        </div>

        <div className="travel-card-interests">
          {renderInterestImages()}
        </div>
      </div>
    </div>
  );
}
