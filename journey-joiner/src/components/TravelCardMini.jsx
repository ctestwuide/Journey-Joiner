import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';

export default function TravelCardMini({ profileData, onClick }) {
  const handleClick = () => {
    onClick(profileData);
  };

  return (
    <div className="travel-card-mini-container" onClick={handleClick} key={profileData.id}>
      <div className="travel-card-mini-profile-picture">
        <img src={profileData.profilePicture || defaultProfileImage} alt="Profile" />
      </div>
      <div className="travel-card-mini-data">
        <p id="travel-card-mini-name">{profileData.firstName}, {profileData.age}</p>
      </div>
    </div>
  );
}
