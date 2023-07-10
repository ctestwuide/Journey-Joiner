import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import TravelCardSmall from '../components/TravelCardSmall';
import TravelCardMini from '../components/TravelCardMini';
import logo from '../assets/logo.png';
import DirectMessaging from '../components/DirectMessaging';

export default function Matches() {
  const { email } = useParams();

  const [matches, setMatches] = useState([]);


  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    console.log('Clicked profile:', profile);
    setSelectedProfile({ ...profile });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getMatches/${email}`)
      .then(response => response.json())
      .then(matchesData => {
        console.log('Received matches data:', matchesData);
        matchesData = matchesData.map(matchData => {
          // append the base URL to the relative URL
          if (matchData.profile_picture) {
              const imageUrl = `http://127.0.0.1:8000${matchData.profile_picture}`;
              matchData.profile_picture = imageUrl;
          }
          return matchData;
        });
        setMatches(matchesData);
      })
      .catch(err => console.error('Error during fetching matches:', err));
  }, [email]);
  

  return (
    <>
    <Header email={email}/>
    <main className="main-background">
      <Dashboard email={email}/>
      <div className="matches-messages-container">
        <section className="matches-container">
          <div className="matches-container-title">
            <img src={logo} alt="Journey Joiner Logo" width="40px" />
            <h2>Matches</h2>
          </div>
          <div className="matches-container-profiles">
            
          {matches.map((profile) => (
            <TravelCardMini
              key={profile.user_id}
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
    </>
  );
}
