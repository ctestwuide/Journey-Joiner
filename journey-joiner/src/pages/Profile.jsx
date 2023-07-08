import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Dashboard from "../components/Dashboard"
import defaultProfileImage from "../assets/blank-profile.png"

export default function Profile() {
    const { email } = useParams();
    console.log(email);

  const [profileData, setProfileData] = useState({
    profilePicture: null,
    first_name: '',
    last_name: '',
    age: '',
    bio: '',
    budget: '',
    interests: [],
    email: '',
    pasword: '',
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

  useEffect(() => {
    // Fetch the user data from the backend and populate the state
    fetch(`http://127.0.0.1:8000/api/getUser/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setProfileData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [email]);

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
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={profileData.last_name}
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
                    <option value="$100">$100</option>
                    <option value="$200">$200</option>
                    <option value="$300">$300</option>
                    <option value="$500">$500</option>
                    <option value="$1000">$1000</option>
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

        <div className="profile-credentials">
            <div className="email-password-section">
                <div>

                    <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="Email"
                    />
                </div>
                <div>

                    <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button type="submit" onClick={handleSubmit}>
                Update My Travel Card
                </button>
            </div>

        </div>

    </section>
    </>
  );
}
