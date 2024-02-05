import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';
import "./StatisticRun.css";
import { Button } from './Button';  

const StatisticRun = () => {
  const [statistike, setStatistike] = useState([]);

  useEffect(() => {
    const fetchStatistike = async () => {
      try {
        const trkacInfo = await apiService.getLoggedInTrkac();
        const trkacId = trkacInfo.trkac.id;
        

        const response = await apiService.getStatistikeByTrkacId(trkacId);
        console.log(trkacInfo)
        console.log('Odgovor sa statistikama:', response);
        setStatistike(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju statistika trčanja:', error);
      }
    };

    fetchStatistike();
  }, []); 


  if (!Array.isArray(statistike)) {
    console.error('Statistike nisu niz:', statistike);
    return <p className="error-message">Došlo je do greške pri dohvatanju statistika.</p>;
  }


  const handleDownload = async () => {
    try {
      const { id } = apiService.getLoginInfo();
      await apiService.downloadStatistics(id);
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  return (
    <div className="statistic-run-container"> 
      <h1>Statistike trčanja</h1>
      <table className="statistic-table"> 
        <thead>
          <tr>
            <th>Ukupno vreme</th>
            <th>Predjeni kilometri</th>
            <th>Prosecna brzina</th>
          </tr>
        </thead>
        <tbody>
          {statistike.map((statistika) => (
            <tr key={statistika.id}>
              <td>{statistika.ukupno_vreme}</td>
              <td>{statistika.predjeni_km}</td>
              <td>{statistika.prosecna_brzina}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        type="button"
   onClick={handleDownload}
        buttonStyle="btn--outline"
        buttonSize="btn--medium">
        Preuzmi statistiku
      </Button>
    </div>
  );
};

export default StatisticRun;
