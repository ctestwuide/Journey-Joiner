import React, { useState } from 'react';
import Dashboard from "../components/Dashboard"
import defaultProfileImage from "../assets/blank-profile.png"

export default function Profile() {
  const [profileData, setProfileData] = useState({
    profilePicture: null,
    firstName: '',
    lastName: '',
    age: '',
    bio: '',
    budget: '',
    interests: [],
  });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleInterestClick = (interest) => {
    const updatedInterests = profileData.interests.includes(interest)
      ? profileData.interests.filter((item) => item !== interest)
      : [...profileData.interests, interest];
    setProfileData({ ...profileData, interests: updatedInterests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the profile data to the backend
    console.log(profileData);
  };

  return (
    <>
    <main className="main-background">
    <Dashboard />
    <div className="profile-container">
        <div className="profile-section-left">
            <div className="profile-picture">
                <img src={profileData.profilePicture || defaultProfileImage} alt="Profile" />
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
            <div className="profile-data-left">
                <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    placeholder="Last Name"
                />
                <input
                    type="number"
                    name="age"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                    placeholder="Age"
                />
            </div>
        </div>

        <div className="profile-section-right">
            <div className="bio-section">
                <textarea
                name="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Bio"
                />
            </div>

            <div className="budget-section">
                <label>Budget/Day:</label>
                <select
                name="budget"
                value={profileData.budget}
                onChange={(e) => setProfileData({ ...profileData, budget: e.target.value })}
                >
                    <option value="">Select Budget</option>
                    <option value="<$100">&lt;$100</option>
                    <option value="<$300">&lt;$300</option>
                    <option value="<$1000">&lt;$1000</option>
                </select>
            </div>

            <div className="interests-section">
                <label>Interests:</label>
                <div className="interests-buttons">
                    <button
                        type="button"
                        className={profileData.interests.includes('beach bum') ? 'selected' : ''}
                        onClick={() => handleInterestClick('beach bum')}
                    >
                    Beach Bum
                    </button>
                    <button
                        type="button"
                        className={profileData.interests.includes('foodie') ? 'selected' : ''}
                        onClick={() => handleInterestClick('foodie')}
                    >
                    Foodie
                    </button>
                    <button
                        type="button"
                        className={profileData.interests.includes('adventurer') ? 'selected' : ''}
                        onClick={() => handleInterestClick('adventurer')}
                    >
                    Adventurer
                    </button>
                    <button
                        type="button"
                        className={profileData.interests.includes('museum magnet') ? 'selected' : ''}
                        onClick={() => handleInterestClick('museum magnet')}
                    >
                    Museum Magnet
                    </button>
                </div>
            </div>
        </div>
    </div> 



    </main>
    <section className="black-area">

        <div className="profile-section">
            <div className="email-password-section">
            <div>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="Email"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                placeholder="Password"
                />
            </div>
            </div>
        </div>

        <div className="profile-section">
            <button type="submit" onClick={handleSubmit}>
            Update My Travel Card
            </button>
        </div>

    </section>
    </>
  );
}
