import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';
import './Runners.css';

const Runners = () => {
  const [trkaci, setTrkaci] = useState([]);

  useEffect(() => {
    apiService.getTrkaci().then((response) => {
        setTrkaci(response.data.data || []);
    });
}, []);

  return (
    <div>
      <h1>Svi trkači</h1>
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Pol</th>
            <th>Datum rođenja</th>
          </tr>
        </thead>
        <tbody>
        {trkaci && trkaci.map((trkac) => (
  <tr key={trkac.id}>
    <td>{trkac.ime}</td>
    <td>{trkac.prezime}</td>
    <td>{trkac.email}</td>
    <td>{trkac.pol}</td>
    <td>{trkac.datum_rodjenja}</td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default Runners;

