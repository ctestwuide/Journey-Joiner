import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import logo from '../assets/logo.png'

export default function Login() {
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState(null);


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
        setErrorMessage(null);

        
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
                setErrorMessage("Invalid email or password. Please try again.");
            } else {
                // Login is successful
                navigate(`/profile/${data.email}`);
            }
        })
        .catch((error) => {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again later.");
        });
        
    };
    

    return (
        <>
        <Header email=""/>
        <main className="main-background">
            <div className="login-container">
                <h2>Log In</h2>
                <img src={logo} alt="Journey Joiner Logo" width="100px" />
                <form className="signup-form" onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {errorMessage && <br />}
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
        </>
    );
}
