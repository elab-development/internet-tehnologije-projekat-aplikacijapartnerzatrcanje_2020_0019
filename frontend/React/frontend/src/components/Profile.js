import React, { useEffect, useState } from 'react';
import { apiService } from './ApiService';
import './Profile.css';

const Profile = () => {
  const [trkac, setTrkac] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchLoggedInTrkac = async () => {
      try {
        const trkacData = await apiService.getLoggedInTrkac();

        if (trkacData && trkacData.trkac) {
          setTrkac(trkacData.trkac);
        } else {
          console.error('Unable to fetch data for logged-in trkac');
        }
      } catch (error) {
        console.error('Error fetching logged-in trkac:', error);
      }
    };

    fetchLoggedInTrkac();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('Please select a file.');
      return;
    }

    try {
      await apiService.uploadProfileImage(selectedFile);
      console.log('Profile image uploaded successfully!');

      // Osvežavanje podataka o trkaču nakon upload-a slike
      const updatedTrkacData = await apiService.getLoggedInTrkac();
      setTrkac(updatedTrkacData.trkac);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  if (!trkac) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-name">{trkac.ime} {trkac.prezime}</h1>
      <p className="profile-email">Email: {trkac.email}</p>
      <p className="profile-gender">Pol: {trkac.pol}</p>
      <p className="profile-dob">Datum rođenja: {trkac.datum_rodjenja}</p>
      <img className="profile-image" src={`http://localhost:8000/api/slike/${trkac.selectedFile}`} alt="Profile" />

    
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default Profile;
