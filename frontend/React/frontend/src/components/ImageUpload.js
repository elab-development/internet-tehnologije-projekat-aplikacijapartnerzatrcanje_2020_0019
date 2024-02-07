import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ trkacId, onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        console.error('Please select an image.');
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append('slika', image);


      const response = await axios.post(`http://localhost:8000/api/trkaci/${trkacId}/upload-slike`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

      console.log('Server response after uploading image:', response.data);

 
      if (onImageUpload) {
        onImageUpload(response.data.slika);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ marginRight: '10px' }} 
    />
    <button
      onClick={handleImageUpload}
      disabled={uploading}
      style={{
        padding: '0.5rem 2rem',
        height:"45px",
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'block',
    marginBottom: "20px", 
    width: '250px',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#242424')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
    >
      {uploading ? 'Uploading...' : 'Upload Image'}
    </button>
  </div>
  );
};

export default ImageUpload;
