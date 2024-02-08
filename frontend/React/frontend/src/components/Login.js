import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from './ApiService';
import "./Login.css";
import logo from "../assets/logo.png";

export function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login(e) {
    setError("");

    e.preventDefault();

    apiService
      .login(email, password)
      .then((response) => {
        setToken(response.data.access_token);
        setLoginInfo(response.data.role, email, response.data.user.id);
        props.updateToken(response.data.access_token);

        console.log('Uloga korisnika:', response.data.role);
        console.log('Id korisnika:', response.data.user.id);
        console.log('Token korisnika:', response.data.access_token);
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  function setToken(token) {
    apiService.setToken(token);
  }

  function setLoginInfo(role, email, id) {
    apiService.setLoginInfo(role, email, id);
    console.log('ID korisnika postavljen:', id);
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="form-group">

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login}
          style={{
            backgroundColor: 'transparent',
            color: '#fff',
            padding: '8px 20px',
            border: '1px solid var(--primary)',
            transition: 'all 0.3s ease-out',
            borderRadius: '10px',
            cursor: 'pointer',
            width: "120px",
          }}
        >Prijavi se</button>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}







