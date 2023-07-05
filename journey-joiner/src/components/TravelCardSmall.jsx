import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';
import beachBumImage from "../assets/beach-bum.png"
import foodieImage from "../assets/foodie.png"
import adventurerImage from "../assets/adventurer.png"
import museumMagnetImage from "../assets/museum-magnet.png"


export default function TravelCardSmall({ profileData }) {
    const renderInterestImages = () => {
      return profileData.interests.map((interest, index) => {
        switch (interest) {
          case 'beach bum':
            return <img key={index} src={beachBumImage} alt="Beach Bum" width="15" height="15" />;
          case 'foodie':
            return <img key={index} src={foodieImage} alt="Foodie" width="15" height="15" />;
          case 'adventurer':
            return <img key={index} src={adventurerImage} alt="Adventurer" width="15" height="15" />;
          case 'museum magnet':
            return <img key={index} src={museumMagnetImage} alt="Museum Magnet" width="15" height="15" />;
          default:
            return null;
        }
      });
    };
  
    return (
      <div className="travel-card-small-container">
        <div className="travel-card-small-left">
          <div className="travel-card-small-profile-picture">
            <img src={profileData.profilePicture || defaultProfileImage} alt="Profile" />
          </div>
          <div className="travel-card-small-data-left">
            <p id="travel-card-small-name">{profileData.firstName}, {profileData.age}</p>
            <p id="travel-card-small-budget">Budget: {profileData.budget}/day</p>
          </div>
        </div>
        <div className="travel-card-small-right">
          <div className="travel-card-small-bio">
            <p>Bio: {profileData.bio}</p>
          </div>
          <div className="travel-card-small-interests">
            {renderInterestImages()}
          </div>
        </div>
      </div>
    );
  }
