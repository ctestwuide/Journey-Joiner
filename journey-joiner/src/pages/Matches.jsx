import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import defaultProfileImage from '../assets/blank-profile.png';
import logo from '../assets/logo.png';

export default function Matches() {

  return (
    <main className="main-background">
      <Dashboard />
      <section className="discover-container">
        <div className="discover-container-title">
          <img src={logo} alt="Journey Joiner Logo" width="70px" />
          <h2>Discover: Match or Pass</h2>
        </div>
      </section>
    </main>
  );
}
