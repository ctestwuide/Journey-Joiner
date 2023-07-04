import React from 'react';
import TravelCard from '../components/TravelCard';
import Dashboard from '../components/Dashboard';
import defaultProfileImage from '../assets/blank-profile.png';

export default function Discover() {
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
      <section className="discover-container">
         
        <TravelCard profileData={profileData} />
      </section>
    </main>
  );
}
