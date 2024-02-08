import React, { useEffect, useState } from 'react';
import { apiService } from './ApiService';
import './Profile.css';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';


const Profile = () => {
  const [trkac, setTrkac] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [newMesto, setNewMesto] = useState('');

  useEffect(() => {
    const fetchLoggedInTrkac = async () => {
      try {
        const trkacData = await apiService.getLoggedInTrkac();
        if (trkacData && trkacData.trkac) {
          setTrkac(trkacData.trkac);
          const imageUrl = await apiService.getTrkacImage(trkacData.trkac.id);
          setProfileImage(imageUrl);
        } else {
          console.error('Nemogućnost dobijanja podataka za ulogovanog trkača');
        }
      } catch (error) {
        console.error('Greška pri dohvatanju ulogovanog trkača:', error);
      }
    };

    fetchLoggedInTrkac();
  }, []);

  const handleImageUpload = (imageUrl) => {
    setProfileImage(imageUrl);
  };
  const handleMestoChange = (e) => {
    setNewMesto(e.target.value);
  };

  const handleUpdateMesto = async () => {
    try {
      await apiService.updateTrkacMesto(trkac.id, newMesto);
    } catch (error) {
      console.error('Greška pri ažuriranju mesta:', error);
    }
  };


  return (
    <div className="profile-container">
      {trkac && (
        <>
          <h1 style={{ marginTop: '-10px', color: "black" }}>Korisnički profil</h1>
          {profileImage && <img src={profileImage} alt="Profilna slika" className="profile-image" />}
          <p className="profile-name">{trkac.ime} {trkac.prezime}</p>
          <p className="profile-email">Email: {trkac.email}</p>
          <p className="profile-gender">Pol: {trkac.pol}</p>
          <p className="profile-dob">Datum rođenja: {trkac.datum_rodjenja}</p>
          <p className="profile-location">Mesto: {trkac.mesto}</p>
          <div className="location">
            <label htmlFor="newMesto">Novo mesto: </label>
            <input
              type="text"
              id="newMesto"
              value={newMesto}
              onChange={handleMestoChange}
            />
            <button onClick={handleUpdateMesto}>Ažuriraj mesto</button>
          </div>

        </>
      )}

      {trkac && <ImageUpload trkacId={trkac.id} onImageUpload={handleImageUpload} />}

      <Link to="/kreiraj-plan">
        <button
          style={{
            padding: '0.5rem 2rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'block',
            margin: '20px auto 0',
            width: '100%',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#242424')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
        >
          Kreiraj plan
        </button>
      </Link>
      <div className="background-behind-container"></div>
    </div>

  );
};

export default Profile;

