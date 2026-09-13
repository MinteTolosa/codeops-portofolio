import React from 'react'
import './Header.css'
function Header() {
  return (
    <div className="header">
        <h1>Addis-Eats</h1>
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header