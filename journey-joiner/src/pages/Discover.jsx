import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TravelCard from '../components/TravelCard';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import defaultProfileImage from '../assets/blank-profile.png';
import logo from '../assets/logo.png';

export default function Discover() {
  const { email } = useParams();
  const [userId, setUserId] = useState(null);
  const [unseenUsers, setUnseenUsers] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    // Get user ID
    fetch(`http://127.0.0.1:8000/api/getUser/${email}`)
      .then(response => response.json())
      .then(userData => {
        console.log('Received user data:', userData);
        setUserId(userData.user_id);
  
        // Get unseen users
        return fetch(`http://127.0.0.1:8000/api/getUnseenUsers/${userData.user_id}`);
      })
      .then(response => response.json())
      .then(unseenUserData => {
        console.log('Received unseen user data:', unseenUserData);
        setUnseenUsers(unseenUserData);
        setCurrentProfile(unseenUserData[0]);
      })
      .catch(err => console.error('Error during fetching user and unseen users:', err));
  }, [email]);
  


  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handlePassClick = () => {
    setIsButtonClicked(true);

    console.log('Pass button clicked. Current unseen users:', unseenUsers);
  
    // Capture the current profile ID before it potentially changes
    const currentProfileId = currentProfile?.user_id;
  
    // Remove the first user from unseen users
    const newUnseenUsers = unseenUsers.slice(1);
    setUnseenUsers(newUnseenUsers);
  
    // Update the current profile
    setCurrentProfile(newUnseenUsers[0]);

    console.log('After processing pass click. Current unseen users:', unseenUsers);
  
    // Save the pass in the backend
    fetch(`http://127.0.0.1:8000/api/passUser/${userId}/${currentProfileId}`, { method: 'POST' })
      .catch(err => console.error('Error during passing user:', err));
  
    setIsButtonClicked(false);
  };
  
  const handleMatchClick = () => {
    setIsButtonClicked(true);
  
    // Capture the current profile ID before it potentially changes
    const currentProfileId = currentProfile?.user_id;
  
    // Remove the first user from unseen users
    const newUnseenUsers = unseenUsers.slice(1);
    setUnseenUsers(newUnseenUsers);
  
    // Update the current profile
    setCurrentProfile(newUnseenUsers[0]);
  
    // Save the like in the backend
    fetch(`http://127.0.0.1:8000/api/likeUser/${userId}/${currentProfileId}`, { method: 'POST' })
      .catch(err => console.error(err));
  
    setIsButtonClicked(false);
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
        {currentProfile ? <TravelCard profileData={currentProfile} isButtonClicked={isButtonClicked} /> : <p>No profiles to show</p>}

        {/* <TravelCard profileData={currentProfile} isButtonClicked={isButtonClicked} /> */}
        <div className="discover-match-pass">
        <button className="pass-button" onClick={handlePassClick} disabled={isButtonClicked}>
          Pass
        </button>
        <button className="match-button" onClick={handleMatchClick} disabled={isButtonClicked}>
          Match
        </button>

        </div>
      </section>
    </main>
    </>
  );
}
