import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import TravelCardSmall from '../components/TravelCardSmall';
import TravelCardMini from '../components/TravelCardMini';
import defaultProfileImage from '../assets/blank-profile.png';
import logo from '../assets/logo.png';
import DirectMessaging from '../components/DirectMessaging';

export default function Matches() {
  const profiles = [
    {
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
    },
    {
        id: "2",
        profilePicture: defaultProfileImage,
        firstName: 'Joe',
        lastName: 'Doe',
        age: 22,
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        budget: '$300',
        interests: ['beach bum', 'adventurer', 'museum magnet'],
      },
      {
        id: "3",
        profilePicture: defaultProfileImage,
        firstName: 'Lindsey',
        lastName: 'Doe',
        age: 24,
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        budget: '$300',
        interests: ['beach bum', 'adventurer', 'museum magnet'],
      },
      {
        id: "4",
        profilePicture: defaultProfileImage,
        firstName: 'Marius',
        lastName: 'Doe',
        age: 28,
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        budget: '$300',
        interests: ['beach bum', 'adventurer', 'museum magnet'],
      },
      {
        id: "5",
        profilePicture: defaultProfileImage,
        firstName: 'Tom',
        lastName: 'Doe',
        age: 53,
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        budget: '$300',
        interests: ['beach bum', 'adventurer', 'museum magnet'],
      },
  ];

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
            {profiles.map((profile) => (
              <TravelCardMini
                key={profile.id}
                profileData={profile}
                className="matches-container-profile"
                onClick={() => handleProfileClick(profile)}
              />
            ))}
          </div>
        </section>
        <section className="messages-container">
          <div className="matches-container-title">
            <img src={logo} alt="Journey Joiner Logo" width="40px" />
            <h2>Messages</h2>
          </div>
          {selectedProfile && <TravelCardSmall profileData={selectedProfile} />}
          <div className="direct-messaging-area">
            <DirectMessaging />
          </div>
        </section>
      </div>
    </main>
  );
}
