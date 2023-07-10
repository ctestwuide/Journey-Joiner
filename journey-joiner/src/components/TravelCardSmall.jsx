import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';
import beachBumImage from "../assets/beach-bum.png"
import foodieImage from "../assets/foodie.png"
import adventurerImage from "../assets/adventurer.png"
import museumMagnetImage from "../assets/museum-magnet.png"


export default function TravelCardSmall({ profileData }) {

  const renderInterestImages = () => {
    if (!profileData) {
      return null;
    }
    const images = [];
    if (profileData.interest_beach_bum) {
      images.push(<img key="beachBum" src={beachBumImage} alt="Beach Bum" width="20" height="20" />);
    }
    if (profileData.interest_foodie) {
      images.push(<img key="foodie" src={foodieImage} alt="Foodie" width="20" height="20" />);
    }
    if (profileData.interest_adventurer) {
      images.push(<img key="adventurer" src={adventurerImage} alt="Adventurer" width="20" height="20" />);
    }
    if (profileData.interest_museum_magnet) {
      images.push(<img key="museumMagnet" src={museumMagnetImage} alt="Museum Magnet" width="20" height="20" />);
    }
    return images;
  };
  
    return (
      <div className="travel-card-small-container">
        <div className="travel-card-small-left">
          <div className="travel-card-small-profile-picture">
            <img src={profileData.profile_picture || defaultProfileImage} alt="Profile" />
          </div>
          <div className="travel-card-small-data-left">
            <p id="travel-card-small-name">{profileData.first_name}, {profileData.age}</p>
            <p id="travel-card-small-budget">Budget: {profileData.budget}/day</p>
          </div>
        </div>
        <div className="travel-card-small-right">
          <div className="travel-card-small-bio">
            <p>{profileData.bio}</p>
          </div>
          <div className="travel-card-small-interests">
            {renderInterestImages()}
          </div>
        </div>
      </div>
    );
  }
