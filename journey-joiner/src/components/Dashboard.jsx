import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    
    return (
        <section className="dash-container">

            <NavLink className="nav-link" to="/discover">
                Discover
            </NavLink>

            <NavLink className="nav-link" to="/matches">
                Matches
            </NavLink>

            <NavLink className="nav-link" to="/travel">
                Travel Ideas
            </NavLink>

            <NavLink className="nav-link" to="/profile">
                My Profile
            </NavLink>

        </section>
    )
}