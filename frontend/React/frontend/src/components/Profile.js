import React, { useEffect, useState } from 'react';
import { apiService } from './ApiService';
import './Profile.css';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';


const Profile = () => {
  const [trkac, setTrkac] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchLoggedInTrkac = () => {
      apiService.getLoggedInTrkac()
        .then((trkacData) => {
          if (trkacData && trkacData.trkac) {
            setTrkac(trkacData.trkac);
            setProfileImage(trkacData.trkac.slika);
          } else {
            console.error('Nemogućnost dobijanja podataka za ulogovanog trkača');
          }
        })
        .catch((error) => {
          console.error('Greška pri dobijanju ulogovanog trkača:', error);
        });
    };

    fetchLoggedInTrkac();
  }, []);

  const handleImageUpload = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  return (
    <div className="profile-container">
      {trkac && (
        <>
        <h1>Korisnički profil</h1>
          <p className="profile-name">{trkac.ime} {trkac.prezime}</p>
          <p className="profile-email">Email: {trkac.email}</p>
          <p className="profile-gender">Pol: {trkac.pol}</p>
          <p className="profile-dob">Datum rođenja: {trkac.datum_rodjenja}</p>
        <p className="profile-location">Mesto: {trkac.mesto}</p>
        </>
      )}
      
      {profileImage && <img src={`running-partner/storage/app/${profileImage}`} alt="Profil" style={{ width: '100px' }} />}
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
    margin: '20px auto 0', // Pomeranje dugmeta na vrh i centriranje
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

