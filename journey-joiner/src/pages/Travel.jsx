import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo.png'
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { API_KEY } from '../config.js';

export default function Travel() {
    const { email } = useParams();
    const [travelData, setTravelData] = useState({
        location: '',
        days: '',
    });
    
    const [apiResponse, setApiResponse] = useState('');

    const handleChange = (e) => {
        setTravelData({
            ...travelData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const url = `https://ai-trip-planner.p.rapidapi.com/?days=${travelData.days}&destination=${encodeURIComponent(travelData.location)}`;
  
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': API_KEY, //using hidden API key
              'X-RapidAPI-Host': 'ai-trip-planner.p.rapidapi.com'
          }
      };
  
      fetch(url, options)
          .then(response => response.json())
          .then(data => {
              let formattedResponse = '';
              
              data.plan.forEach(dayPlan => {
                  formattedResponse += `Day ${dayPlan.day}\nActivities:\n`;
                  dayPlan.activities.forEach(activity => {
                      formattedResponse += `${activity.time}: ${activity.description}\n`;
                  });
                  formattedResponse += '\n'; // Adds a newline between different days
              });
  
              setApiResponse(formattedResponse);
          })
          .catch(error => {
              console.error(error);
          });
  };
  

    return (
      <>
        <Header email={email}/>
        <main className="main-background">
          <Dashboard email={email}/>
          <div className="travel-container">
            <div className="travel-container-title">
              <img src={logo} alt="Journey Joiner Logo" width="70px" />
              <h2>Travel</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="location"
                  value={travelData.location}
                  onChange={handleChange}
                  placeholder="City / Location"
                  required
                />
                <input
                  type="number"
                  name="days"
                  value={travelData.days}
                  onChange={handleChange}
                  placeholder="Days"
                  required
                />
              </div>
              <button type="submit">Generate Travel Ideas</button>
            </form>
            <div className="api-response" id="api-response">
                <textarea
                value={apiResponse}
                onChange={(e) => setApiResponse(e.target.value)}
                rows={10}
                cols={50}
                placeholder="API Response"
                />
            </div>
          </div>
        </main>
        </>
      );
}
