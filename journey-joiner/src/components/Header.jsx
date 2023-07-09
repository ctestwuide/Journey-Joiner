import React from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header(props) {
    const email = props.email;
    
    return (
        <header className="header">
            <Link className="site-logo" to="/">
                <img src={logo} alt="Logo" width="70px" />
                <span> Journey Joiner </span>
            </Link>
            <nav className="nav-links">
                <NavLink className="nav-link" to={email ? "/" : "/login"}>
                    {email ? "Log out" : "Log in"}
                </NavLink>
                {!email && 
                <NavLink className="nav-link" to="/signup">
                    Sign up
                </NavLink> 
                }
            </nav>
        </header>
    )
}