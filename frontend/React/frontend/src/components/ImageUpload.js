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
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
};

export default ImageUpload;
