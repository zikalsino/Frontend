import React, { useState } from 'react';
import axios from 'axios';

const CVUpload = ({ candidateId }) => {
  const [cvFile, setCvFile] = useState(null);

  const uploadCV = () => {
    const formData = new FormData();
    formData.append('file', cvFile);

    axios.post(`http://localhost:8080/api/profile/${candidateId}/cv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => alert('CV téléchargé avec succès'))
      .catch(error => console.error('Erreur lors du téléchargement du CV :', error));
  };

  return (
    <div>
      <h2>Uploader CV</h2>
      <input type="file" onChange={e => setCvFile(e.target.files[0])} />
      <button onClick={uploadCV}>Télécharger CV</button>
    </div>
  );
};

export default CVUpload;
