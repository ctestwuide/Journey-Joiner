import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import TravelCardSmall from '../components/TravelCardSmall';
import defaultProfileImage from '../assets/blank-profile.png';
import logo from '../assets/logo.png';

export default function Matches() {
  const profileData = {
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

  return (
    <main className="main-background">
      <Dashboard />
      <div className="matches-messages-container">

        <section className="matches-container">

            <div className="matches-container-title">
            <img src={logo} alt="Journey Joiner Logo" width="40px" />
            <h2>Matches</h2>
            </div>

        </section>

        <section className="messages-container">

            <div className="matches-container-title">
            <img src={logo} alt="Journey Joiner Logo" width="40px" />
            <h2>Messages</h2>
            </div>
            
            <TravelCardSmall profileData={profileData} />
            <div className="direct-messaging">
            {/* Direct messaging component */}
            </div>

        </section>

        </div>
    </main>
  );
}
