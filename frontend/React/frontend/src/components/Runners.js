import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';
import './Runners.css';

const Runners = () => {
  const [trkaci, setTrkaci] = useState([]);
  const [polFilter, setPolFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFriends, setSelectedFriends] = useState({});
  const [allRunnersForSelect, setAllRunnersForSelect] = useState([]);

  useEffect(() => {
    apiService.getTrkaci().then((response) => {
      setAllRunnersForSelect(response.data.data || []);
    });
  }, []);



  useEffect(() => {
    apiService.getTrkaciFilter({ pol: polFilter, page: currentPage }).then((response) => {
      setTrkaci(response.data.data || []);
    });
  }, [polFilter, currentPage]);

  const handleFilter = (pol) => {
    setPolFilter(pol);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const addFriend = async (trkacId) => {
    try {
      await apiService.addFriend(trkacId);
      alert('Prijatelj je uspešno dodat.');
    } catch (error) {
      console.error('Greška pri dodavanju prijatelja:', error);
      alert('Došlo je do greške pri dodavanju prijatelja.');
    }
  };
  



  return (
    <div className="runners-container">
      <h1>Svi trkači</h1>

      <div className="filter-buttons">
        <button onClick={() => handleFilter(null)} className={polFilter === null ? 'active' : ''}>Svi</button>
        <button onClick={() => handleFilter("musko")} className={polFilter === 'musko' ? 'active' : ''}>Muško</button>
        <button onClick={() => handleFilter("zensko")} className={polFilter === 'zensko' ? 'active' : ''}>Žensko</button>
      </div>

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

    <td>
                <button onClick={() => addFriend(trkac.id)}>Dodaj prijatelja</button>
              </td>
  </tr>
))}
        </tbody>
      </table>

   
      <div className="pagination-buttons">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prethodna stranica</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Sledeća stranica</button>
      </div>
    </div>
  );
};

export default Runners;
