import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';

const UpdatePersonnelnfo = () => {
  const { id } = useParams(); // Obtient l'ID du candidat depuis l'URL
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const goBack = () => {
    setCurrentPage("home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateProfile(id, profileData);
      alert('Profil mis à jour avec succès');
    } catch (error) {
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div>
      <h2>Mettre à jour le profil</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          type="text"
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
          placeholder="Nom"
        />
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleChange}
          placeholder="Numéro de téléphone"
        />
        <input
          type="text"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          placeholder="Adresse"
        />
        <button type="submit">Mettre à jour</button>
        <button onClick={goBack}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdatePersonnelnfo;
