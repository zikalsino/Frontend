import React, { useState } from 'react';
import './register.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    // Pas de champ pour le rôle, car il est fixé à CANDIDATE
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajout d'une propriété `role` avec la valeur 'CANDIDATE'
      const response = await axios.post('http://localhost:8080/api/users/register', {
        ...formData,
        role: 'CANDIDATE',
      });
      console.log(response.data);
      setMessage('Inscription réussie !');
      setError(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
      setMessage('Erreur lors de l\'inscription: ' + (error.response?.data || error.message));
      setError(true);
    }
  };
  
  return (
    <div>
      {message && (
        <div className={error ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <p>INSCRIPTION</p>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adresse"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Téléphone"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
