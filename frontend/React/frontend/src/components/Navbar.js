import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-nav">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Početna</Link>
        </li>
        <li className="navbar-item">
          <Link to="/kreiraj-plan" className="navbar-link">Kreiraj plan</Link>
        </li>
        <li className="navbar-item">
          <Link to="/planovi-trka" className="navbar-link">Planovi trka</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

