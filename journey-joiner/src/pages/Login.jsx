import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
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
            <div className="login-container">
                <h2>Log In</h2>
                <img src={logo} alt="Journey Joiner Logo" width="100px" />
                <form className="signup-form" onSubmit={handleSubmit}>
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
                    <button type="submit">Log In</button>
                </form>
                <br />
                <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
            </div>
        </main>
    );
}
