import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';

const AllStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await apiService.getAllStatistics();
        setStatistics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Greška pri dohvatanju statistika trka:', error);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="comments-run-container">
      <h2 style={{ color: 'white' }}>Statistike trka</h2>
      <table className="comments-table">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>ID</th>
            <th style={{ color: 'white' }}>Trkač</th>
            <th style={{ color: 'white' }}>Mesto</th>
            <th style={{ color: 'white' }}>Ukupno vreme</th>
            <th style={{ color: 'white' }}>Pređeni km</th>
            <th style={{ color: 'white' }}>Prosečna brzina</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((statistic) => (
            <tr key={statistic.id}>
              <td style={{ color: 'white' }}>{statistic.id}</td>
              <td style={{ color: 'white' }}>{`${statistic.Trkac.ime} ${statistic.Trkac.prezime}`}</td>
              <td style={{ color: 'white' }}>{statistic.Plan_trke.mesto}</td>
              <td style={{ color: 'white' }}>{statistic.ukupno_vreme}</td>
              <td style={{ color: 'white' }}>{statistic.predjeni_km}</td>
              <td style={{ color: 'white' }}>{statistic.prosecna_brzina ? statistic.prosecna_brzina : 'Nema podataka'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="background-behind-container"></div>
    </div>
  );
};

export default AllStatistics;