import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from './ApiService'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const setTokenInfo = (token) => {
    setToken(token);
  };

  const setLoginInfo = (role, email,id) => {
    apiService.setLoginInfo(role, email,id);
    console.log('ID korisnika postavljen:', id);
    
  };

  const login = async (event) => {
    setError("");
    event.preventDefault();
  
    try {
      const response = await apiService.login(email, password);
      console.log('Odgovor servera nakon logina:', response);
  
      setTokenInfo(response.data.access_token);
      setLoginInfo(response.data.role, email, response.data.user.id);
      console.log('Uloga korisnika:', response.data.role);
      console.log('Id korisnika:', response.data.user.id);
      
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={login}>
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;



