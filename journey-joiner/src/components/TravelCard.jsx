import React from 'react';
import defaultProfileImage from '../assets/blank-profile.png';

export default function ProfileContainer({ profileData }) {
  return (
    <div className="profile-container">
      <div className="profile-section-left">
        <div className="profile-picture">
          <img src={profileData.profilePicture || defaultProfileImage} alt="Profile" />
        </div>
        <div className="profile-data-left">
          <p>First Name: {profileData.firstName}</p>
          <p>Last Name: {profileData.lastName}</p>
          <p>Age: {profileData.age}</p>
        </div>
      </div>
      <div className="profile-section-right">
        <div className="bio-section">
          <p>Bio: {profileData.bio}</p>
        </div>
        <div className="budget-section">
          <p>Budget/Day: {profileData.budget}</p>
        </div>
        <div className="interests-section">
          <p>Interests: {profileData.interests.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
