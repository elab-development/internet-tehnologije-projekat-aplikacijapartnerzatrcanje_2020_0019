import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; 
import ViewMode from '../components/ViewMode'; // Dodato
import moonIcon from '../assets/svetla.png';
import sunIcon from '../assets/tamna.png';


const Navbar = ({isDarkMode, toggleDarkMode }) => {
  


  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Početna</Link>
        </li>
        <li className="navbar-item">
          <Link to="/pronadji-prijatelja" className="navbar-link">Pronađi prijatelja</Link>
        </li>
        <li className="navbar-item">
          <Link to="/moji-planovi" className="navbar-link">Moji planovi</Link>
        </li>
        <li className="navbar-item" style={{ marginLeft: '13px' }}>
        <img
            className="theme-toggle"
            src={isDarkMode ? moonIcon : sunIcon}
            alt={isDarkMode ? 'Svetli mod' : 'Tamni mod'}
            onClick={toggleDarkMode}
            style={{ width: '40px', height: '40px' }} // Postavite veličinu slike ovde
          />
</li>
      </ul>
    </nav>
  );
};

export default Navbar;


