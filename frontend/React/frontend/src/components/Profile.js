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
    const fetchLoggedInTrkac = async () => {
      try {
        const trkacData = await apiService.getLoggedInTrkac();

        if (trkacData && trkacData.trkac) {
          setTrkac(trkacData.trkac);
        } else {
          console.error('Nemogućnost dobijanja podataka za ulogovanog trkača');
        }
      } catch (error) {
        console.error('Greška pri dobijanju ulogovanog trkača:', error);
      }
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
          <h1 className="profile-name">{trkac.ime} {trkac.prezime}</h1>
          <p className="profile-email">Email: {trkac.email}</p>
          <p className="profile-gender">Pol: {trkac.pol}</p>
          <p className="profile-dob">Datum rođenja: {trkac.datum_rodjenja}</p>
        </>
      )}
      <h2>Korisnički profil</h2>
      {profileImage && <img src={profileImage} alt="Profil" style={{ width: '200px' }} />}
      {trkac && <ImageUpload trkacId={1} onImageUpload={handleImageUpload} />}

      <Link to="/kreiraj-plan">
        <button>Kreiraj plan</button>
      </Link>
    </div>
    
  );
};

export default Profile;

