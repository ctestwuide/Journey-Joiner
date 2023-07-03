import React, { useState } from 'react';
import logo from '../assets/logo.png'
import Dashboard from '../components/Dashboard'

export default function Travel() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make your API call here with the travelData object
        // and then update apiResponse with the returned data
        // Here's a mockup:
        const response = await fetch('your-api-url', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(travelData),
          });
        const data = await response.json();
        setApiResponse(data);
    };

    return (
        <main className="main-background">
          <Dashboard />
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
            <div className="api-response">
                <textarea
                value={apiResponse}
                readOnly
                rows={10}
                cols={50}
                placeholder="API Response"
                />
            </div>
          </div>
        </main>
      );
      
}
