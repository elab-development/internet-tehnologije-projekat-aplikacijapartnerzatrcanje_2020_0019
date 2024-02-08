import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { apiService } from './ApiService';
import User from '../assets/user.png';

const Navbar = () => {
  const location = useLocation();
  const korisnik = apiService.getLoginInfo();

  const renderAuthLinks = () => {
    if (korisnik.role === 'trkac') {
      return (
        <>
          <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/" className="navbar-link">
              Početna
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/map' ? 'active' : ''}`}>
            <Link to="/map" className="navbar-link">Trkači</Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/planovi-trka' ? 'active' : ''}`}>
            <Link to="/planovi-trka" className="navbar-link">
              Planovi trka
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/statistike-trke' ? 'active' : ''}`}>
            <Link to="/statistike-trke" className="navbar-link">
              Statistike
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/logout' ? 'active' : ''}`}>
            <Link to="/logout" className="navbar-link" onClick={() => { apiService.logout(); }}>
              Odjavi se
            </Link>
          </li>

          <li className={`navbar-item ${location.pathname === '/moj-nalog' ? 'active' : ''}`}>
            <Link to="/moj-nalog" className="navbar-link">
              <img src={User} alt="Moj nalog" style={{ width: '100px', height: '100px' }} />
            </Link>
          </li>

        </>
      );
    } else if (korisnik.role === 'user') {
      return (
        <>
          <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/" className="navbar-link">
              Početna
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/planovi-trka' ? 'active' : ''}`}>
            <Link to="/planovi-trka" className="navbar-link">
              Planovi trka
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/sve-statistike' ? 'active' : ''}`}>
            <Link to="/sve-statistike" className="navbar-link">
              Sve statistike
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/map' ? 'active' : ''}`}>
            <Link to="/map" className="navbar-link">Trkači</Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/komentari' ? 'active' : ''}`}>
            <Link to="/komentari" className="navbar-link">Komentari</Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/logout' ? 'active' : ''}`}>
            <Link to="/logout" className="navbar-link" onClick={() => { apiService.logout(); }}>
              Odjavi se
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/" className="navbar-link">
              Početna
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/registracija' ? 'active' : ''}`}>
            <Link to="/registracija" className="navbar-link">
              Registruj se
            </Link>
          </li>
          <li className={`navbar-item ${location.pathname === '/login' ? 'active' : ''}`}>
            <Link to="/login" className="navbar-link">
              Prijavi se
            </Link>
          </li>
        </>
      );
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-nav">
        {renderAuthLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
