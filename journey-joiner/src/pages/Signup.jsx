import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Signup() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
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
        // Here you would usually send the user data to the backend
        console.log(user);
    };

    return (
        <main className="main-background">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <img src={logo} alt="Journey Joiner Logo" width="100px" />
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
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
    );
}
