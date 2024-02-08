import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';
import './Runners.css';
import './Comments.css';
import DodajPrijatelja from "../assets/dodajPrijatelja.png";
import Swal from 'sweetalert2';

const Runners = () => {
  const [trkaci, setTrkaci] = useState([]);
  const [polFilter, setPolFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allRunnersForSelect, setAllRunnersForSelect] = useState([]);

  useEffect(() => {
    const fetchTrkaci = async () => {
      try {
        const loggedInTrkacId = Number(apiService.getLoginInfo().id);
        const trkaciResponse = await apiService.getTrkaciFilter({ pol: polFilter, page: currentPage });
        const filteredTrkaci = trkaciResponse.data.data.filter(trkac => trkac.id !== loggedInTrkacId);
        setTrkaci(filteredTrkaci);
        setAllRunnersForSelect(filteredTrkaci);
      } catch (error) {
        console.error('Error fetching trkaci:', error);
      }
    };

    fetchTrkaci();
  }, [polFilter, currentPage]);

  const handleFilter = (pol) => {
    setPolFilter(pol);
    setCurrentPage(1);
  };

  const handlePageChange = async (newPage) => {
    try {
      const loggedInTrkacId = Number(apiService.getLoginInfo().id);
      const trkaciResponse = await apiService.getTrkaciFilter({ pol: polFilter, page: newPage });
      const filteredTrkaci = trkaciResponse.data.data.filter(trkac => trkac.id !== loggedInTrkacId);

      if (filteredTrkaci.length > 0) {
        setTrkaci(filteredTrkaci);
        setCurrentPage(newPage);
      } else {
        console.log('No more items on the next page.');
      }
    } catch (error) {
      console.error('Error fetching trkaci:', error);
    }
  };


  const addFriend = async (trkacId) => {
    try {
      await apiService.addFriend(trkacId);
      Swal.fire({
        icon: 'success',
        title: 'Uspešno dodat prijatelj!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Greška pri dodavanju prijatelja:', error);
      Swal.fire({
        icon: 'error',
        title: 'Došlo je do greške prilikom dodavanja prijatelja.',
      });
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

      <div className="runners-cards">
        {allRunnersForSelect &&
          allRunnersForSelect.map((trkac) => (
            <div key={trkac.id} className="runner-card">
              <div style={{ justifyContent: 'space-between', textAlign: 'left' }}>
                <div>
                  <p style={{ color: 'black' }}>Ime: {trkac.ime}</p>
                  <p style={{ color: 'black' }}>Prezime: {trkac.prezime}</p>
                  <p style={{ color: 'black' }}>Email: {trkac.email}</p>
                  <p style={{ color: 'black' }}>Pol: {trkac.pol}</p>
                  <p style={{ color: 'black' }}>Datum rođenja: {trkac.datum_rodjenja}</p>
                </div>

                <img
                  src={DodajPrijatelja}
                  alt="Dodaj prijatelja"
                  style={{
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    marginLeft: '700px',
                  }}
                  onClick={() => addFriend(trkac.id)}
                />

              </div>
            </div>
          ))}
      </div>


      <div className="pagination-buttons">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prethodna stranica</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Sledeća stranica</button>
      </div>
      <div className="background-behind-container"></div>
    </div>
  );
};

export default Runners;
