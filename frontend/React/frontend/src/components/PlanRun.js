import React, { useEffect, useState } from 'react';
import { apiService } from './ApiService';

const PlanRun = () => {
  const [planoviTrka, setPlanoviTrka] = useState([]);

  useEffect(() => {
    apiService.getPlanoviTrka().then((response) => {
        setPlanoviTrka(response.data.data || []);
    });
}, []);

  return (
    <div>
      <h1>Svi planovi trka</h1>
      <table>
        <thead>
          <tr>
            <th>Vreme</th>
            <th>Mesto</th>
            <th>Datum</th>
            <th>Planirani kilometri</th>
          </tr>
        </thead>
        <tbody>
          {planoviTrka.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.vreme}</td>
              <td>{plan.mesto}</td>
              <td>{plan.datum}</td>
              <td>{plan.planirani_km}</td>
              {/* Dodajte druge kolone prema potrebama */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanRun;
