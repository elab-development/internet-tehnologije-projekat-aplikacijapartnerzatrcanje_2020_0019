import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from './ApiService';
import './Registration.css';
import logo from '../assets/logo.png';


const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    datum_rodjenja: '',
    pol: '',
    mesto: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    console.log('Register button clicked');
    try {
      const response = await apiService.register(formData);

      apiService.setToken(response.data.access_token);
      console.log(response.data);

      apiService.setLoginInfo(response.data.role, formData.email);
      navigate("/login");
    } catch (error) {

      console.error('Greška prilikom registracije:', error);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-container">
        <div className="registration-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="ime"
            placeholder="Ime"
            onChange={handleInputChange}
            className="registration-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="prezime"
            placeholder="Prezime"
            onChange={handleInputChange}
            className="registration-input"
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="datum_rodjenja"
            placeholder="Datum rođenja"
            onChange={handleInputChange}
            className="registration-input"
          />
        </div>
        <div className="form-group">
          <select
            name="pol"
            onChange={handleInputChange}
            className="select"
          >
            <option value="">Izaberite pol</option>
            <option value="musko">Muško</option>
            <option value="zensko">Žensko</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mesto"
            placeholder="Mesto"
            onChange={handleInputChange}
            className="registration-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            className="registration-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            className="registration-input"
          />
        </div>
        <button className="registration-button" onClick={handleRegistration}>Register</button>
      </div>
    </div>
  );
}

export default Registration;
