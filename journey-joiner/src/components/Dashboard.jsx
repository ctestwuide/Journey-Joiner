import React from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header() {
    
    return (
        <section className="dash-container">
            <NavLink className="nav-link" to="/">
                Discover
            </NavLink>

            <NavLink className="nav-link" to="/">
                Matches
            </NavLink>

            <NavLink className="nav-link" to="/travel">
                Travel Ideas
            </NavLink>

            <NavLink className="nav-link" to="/">
                My Profile
            </NavLink>
        </section>
    )
}