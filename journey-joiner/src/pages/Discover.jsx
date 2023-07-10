import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TravelCard from '../components/TravelCard';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import defaultProfileImage from '../assets/blank-profile.png';
import logo from '../assets/logo.png';

export default function Discover() {
  const { email } = useParams();

  const profileData = {
    id: 1,
    profile_picture: defaultProfileImage,
    first_name: 'John',
    last_name: 'Doe',
    age: 30,
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    budget: '$300',
    interests: ['beach bum', 'foodie', 'adventurer', 'museum magnet'],
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handlePassClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      // Fetch new profile data and update profileData
    }, 500);
  };

  const handleMatchClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      // Fetch new profile data and update profileData
      // Send matching data to the backend
    }, 500);
  };

  return (
    <>
    <Header email={email}/>
    <main className="main-background">
      <Dashboard email={email}/>
      <section className="discover-container">
        <div className="discover-container-title">
          <img src={logo} alt="Journey Joiner Logo" width="70px" />
          <h2>Discover: Match or Pass</h2>
        </div>
        <TravelCard profileData={profileData} isButtonClicked={isButtonClicked} />
        <div className="discover-match-pass">
          <button className="pass-button" onClick={handlePassClick}>
            Pass
          </button>
          <button className="match-button" onClick={handleMatchClick}>
            Match
          </button>
        </div>
      </section>
    </main>
    </>
  );
}
