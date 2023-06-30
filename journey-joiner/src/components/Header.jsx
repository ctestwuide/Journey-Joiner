import React from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header() {
    
    return (
        <header className="header">
            <Link className="site-logo" to="/">
                <img src={logo} alt="Logo" width="70px" />
                <span> Journey Joiner </span>
            </Link>
            <nav className="nav-links">
                <NavLink className="nav-link" to="host">
                    Log in
                </NavLink>
                <NavLink className="nav-link" to="about">
                    Sign up
                </NavLink>
            </nav>
        </header>
    )
}