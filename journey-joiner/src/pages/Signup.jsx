import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Signup({ history }) {


    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        age: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/signup/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);  // Handle the response from the backend
              history.push('/profile')
            })
            .catch(error => {
              console.error(error);  // Handle any error that occurred during the request
          });
          
      };


      

    return (
        <main className="main-background">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <img src={logo} alt="Journey Joiner Logo" width="100px" />
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                    />
                    <input
                        type="text"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <br />
                <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
            </div>
        </main>
    );    // async function getUser(userEmail) {
    //     const response = await fetch(`http:://127.0.0.1:8000/api/getuser/${userEmail}`)
    //     const data = await response.json()
    //     return data
    // }
}


    // async function getUser(userEmail) {
    //     const response = await fetch(`http:://127.0.0.1:8000/api/getuser/${userEmail}`)
    //     const data = await response.json()
    //     return data
    // }