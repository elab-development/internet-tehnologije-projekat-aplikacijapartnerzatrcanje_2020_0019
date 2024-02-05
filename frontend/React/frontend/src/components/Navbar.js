import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; 
import moonIcon from '../assets/svetla.png';
import sunIcon from '../assets/tamna.png';
import { apiService } from './ApiService';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const korisnik = apiService.getLoginInfo();

  console.log(korisnik.role); 
  console.log(korisnik.email);

  const renderAuthLinks = () => {
    if (korisnik.role === 'trkac') {
      
      return (
        <>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Početna
            </Link>
          </li>
          
          <li className="navbar-item">
            <Link to="/logout" className="navbar-link">
              Odjavi se
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/moj-nalog" className="navbar-link">
              Moj nalog
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/trkaci" className="navbar-link">
              Trkaci
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/planovi-trka" className="navbar-link">
              Planovi trka
            </Link>
          </li>
        </>
      );
    } else if (korisnik.role === 'user') {
  
      return (
        <>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Početna
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Prijavi se
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/trkaci" className="navbar-link">
              Trkaci
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/planovi-trka" className="navbar-link">
              Planovi trka
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/statistika-trke" className="navbar-link">
              Planovi trka
            </Link>
          </li>
        </>
      );
    }else{
      return (
        <>
          <li className="navbar-item">
          <Link to="/registracija" className="navbar-link">
                Registruj se
              </Link>
          </li>
          <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Prijavi se
              </Link>
            </li>
            <li className="navbar-item">
            <Link to="/trkaci" className="navbar-link">
              Trkaci
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/planovi-trka" className="navbar-link">
              Planovi trka
            </Link>
          </li>
        </>
      );
    }
    }

   

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-nav">
        {renderAuthLinks()}
        <li className="navbar-item" style={{ marginLeft: '13px' }}>
          <img
            className="theme-toggle"
            src={isDarkMode ? moonIcon : sunIcon}
            alt={isDarkMode ? 'Svetli mod' : 'Tamni mod'}
            onClick={toggleDarkMode}
            style={{ width: '40px', height: '40px' }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
