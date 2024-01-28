// src/components/RunForm.js
import React, { useState } from 'react';
import './RunForm.css';

const RunForm = ({ onSubmit }) => {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ time, location, distance, date });
    // Resetujte polja nakon slanja forme
    setTime('');
    setLocation('');
    setDistance('');
    setDate('');
  };

  return (
    <div className="run-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Datum:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="time">Vreme:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <label htmlFor="location">Lokacija:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="distance">Planirana dužina(km):</label>
        <input
          type="number"
          id="distance"
          step="0.01"
          min="0"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <button type="submit">Potvrdi</button>
      </form>
    </div>
  );
};

export default RunForm;


