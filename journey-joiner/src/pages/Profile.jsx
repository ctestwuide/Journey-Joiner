import React, { useState } from 'react';
import Dashboard from "../components/Dashboard"

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    bio: '',
    budget: '',
    interests: [],
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestsChange = (e) => {
    const { options } = e.target;
    const selectedInterests = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setProfileData({
      ...profileData,
      interests: selectedInterests,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually send the updated profileData to the backend
    console.log(profileData);
  };

  return (
    <main className="main-background">
        <Dashboard />
        <div className="profile-container">
        <div className="left-section">
            <div className="profile-picture"></div>
            <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                placeholder="Age"
                required
            />
        </div>
        <div className="right-section">
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Bio"
            required
          />
          <div className="budget-section">
            <label>Budget per day:</label>
            <select name="budget" value={profileData.budget} onChange={handleChange}>
              <option value="<$100">&lt;$100</option>
              <option value="<$300">&lt;$300</option>
              <option value="<$1000">&lt;$1000</option>
            </select>
          </div>
          <div className="interests-section">
            <label>Interests:</label>
            <select
              name="interests"
              multiple
              value={profileData.interests}
              onChange={handleInterestsChange}
            >
              <option value="beach bum">Beach Bum</option>
              <option value="foodie">Foodie</option>
              <option value="adventurer">Adventurer</option>
              <option value="museum magnet">Museum Magnet</option>
            </select>
          </div>
        </div>
        <div className="bottom-section">
          <div className="email-section">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="password-section">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit}>Update My Travel Card</button>
        </div>
      </div>
    </main>
  );
}
