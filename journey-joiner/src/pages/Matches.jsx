import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import TravelCardSmall from '../components/TravelCardSmall';
import TravelCardMini from '../components/TravelCardMini';
import defaultProfileImage from '../assets/blank-profile.png';
import logo from '../assets/logo.png';

export default function Matches() {
  const profileData = {
    id: "1",
    profilePicture: defaultProfileImage,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    budget: '$300',
    interests: ['beach bum', 'foodie', 'adventurer', 'museum magnet'],
  };

  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    console.log('Clicked profile:', profile);
    setSelectedProfile({ ...profile });
  };
  
  

  return (
    <main className="main-background">
      <Dashboard />
      <div className="matches-messages-container">
        <section className="matches-container">
            <div className="matches-container-title">
                <img src={logo} alt="Journey Joiner Logo" width="40px" />
                <h2>Matches</h2>
            </div>

            <div className="matches-container-profiles">
                <TravelCardMini
                    key="1"
                    profileData={profileData}
                    className="matches-container-profile"
                    onClick={() => handleProfileClick(profileData)}
                />
                <TravelCardMini
                    key="2"
                    profileData={profileData}
                    className="matches-container-profile"
                    onClick={() => handleProfileClick(profileData)}
                />
                                <TravelCardMini
                    key="3"
                    profileData={profileData}
                    className="matches-container-profile"
                    onClick={() => handleProfileClick(profileData)}
                />
                                <TravelCardMini
                    key="4"
                    profileData={profileData}
                    className="matches-container-profile"
                    onClick={() => handleProfileClick(profileData)}
                />
                                <TravelCardMini
                    key="5"
                    profileData={profileData}
                    className="matches-container-profile"
                    onClick={() => handleProfileClick(profileData)}
                />
                                <TravelCardMini
                    key="6"
                    profileData={profileData}
                    className="matches-container-profile"
                    onClick={() => handleProfileClick(profileData)}
                />

          </div>
        </section>

        <section className="messages-container">
          <div className="matches-container-title">
            <img src={logo} alt="Journey Joiner Logo" width="40px" />
            <h2>Messages</h2>
          </div>
          {selectedProfile && (
            <TravelCardSmall profileData={selectedProfile} />
          )}
          <div className="direct-messaging">{/* Direct messaging component */}</div>
        </section>
      </div>
    </main>
  );
}
