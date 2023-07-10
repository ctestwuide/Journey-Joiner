import React from "react"
import { NavLink } from "react-router-dom"
import Header from '../components/Header';
import logo from "../assets/logo.png"

export default function Home() {
    return (
        <>
            <Header email=""/>
            <main className="main-background">
                <div className="home-box">
                    
                    <h2>Finding your next travel buddy is only a few clicks away</h2>
                    <img src={logo} alt="Journey Joiner Logo" width="120px" />
                    <NavLink to="/login">
                            Log in
                    </NavLink>
                    <NavLink to="/signup">
                            Sign up
                    </NavLink>
                </div>
            </main>
            <section className="black-area">
                <div className="how-it-works">
                    <h2>How it works</h2>
                    <div className="how-it-works-line"></div>
                    <div className="how-it-works-steps">
                        <p>1. Create an account</p>
                        <p>2. Enter your availability, budget, and travel preferences</p>
                        <p>3. Match with other aspiring travelers</p>
                        <p id="last-step">4. Take the trip of a lifetime with a custom made itinerary</p>
                    </div>

                </div>
            </section>
        </>
    )
}
