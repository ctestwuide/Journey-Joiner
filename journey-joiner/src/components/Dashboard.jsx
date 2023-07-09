import React from "react"
import { NavLink } from "react-router-dom"

export default function Header({ email }) {
    
    return (
        <section className="dash-container">

            <NavLink className="nav-link" to={`/discover/${email || ""}`}>
                Discover
            </NavLink>

            <NavLink className="nav-link" to={`/matches/${email || ""}`}>
                Matches
            </NavLink>

            <NavLink className="nav-link" to={`/travel/${email || ""}`}>
                Travel Ideas
            </NavLink>

            <NavLink className="nav-link" to={`/profile/${email || ""}`}>
                My Profile
            </NavLink>

        </section>
    )
}