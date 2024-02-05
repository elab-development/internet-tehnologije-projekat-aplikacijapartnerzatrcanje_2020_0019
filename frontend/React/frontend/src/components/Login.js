import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from './ApiService'; 

export function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login(e) {
    setError("");
    // prevent default blokira osvezavanje stranice
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

function setLoginInfo(role,email, id) {
  apiService.setLoginInfo(role,email,id);
  console.log('ID korisnika postavljen:', id);
}












  
  

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




