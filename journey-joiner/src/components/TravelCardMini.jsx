import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';

export default function TravelCardMini({ profileData, onClick }) {
  const handleClick = () => {
    onClick(profileData);
  };

  return (
    <div onClick={onClick}>
      <div className="travel-card-mini-container" onClick={handleClick} key={profileData.user_id}>
        <div className="travel-card-mini-profile-picture">
          <img src={profileData.profile_picture || defaultProfileImage} alt="Profile" />
        </div>
        <div className="travel-card-mini-data">
          <p id="travel-card-mini-name">{profileData.first_name}, {profileData.age}</p>
        </div>
      </div>
    </div>
  );
}
