import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';

function AddUser() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/admin/users', newUser);
      setMessage('Utilisateur créé avec succès !');
      setNewUser({ email: '', password: '', role: '', firstName: '', lastName: '', address: '', phoneNumber: '' });
      navigate('/'); // Retour à la liste des utilisateurs
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      setMessage("Erreur lors de la création de l'utilisateur.");
    }
  };

  // Styles CSS intégrés
  const styles = {
    container: {
      width: '100%',
      margin: '30px auto',
      padding: '30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      transition: 'border-color 0.3s',
    },
    select: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    buttonDisabled: {
      backgroundColor: '#007bff',
      opacity: '0.6',
    },
    message: {
      marginTop: '20px',
      textAlign: 'center',
      color: 'green',
    },
    errorMessage: {
      color: 'red',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Créer un utilisateur</h2>
      <form
        onSubmit={handleCreateUser}
        style={styles.form}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          required
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = '#007bff')}
          onBlur={(e) => (e.target.style.borderColor = '#ddd')}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={newUser.password}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={newUser.firstName}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={newUser.lastName}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          value={newUser.address}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Numéro de téléphone"
          value={newUser.phoneNumber}
          onChange={handleInputChange}
          style={styles.input}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          required
          style={styles.select}
        >
          <option value="">Sélectionnez un rôle</option>
          <option value="CANDIDATE">Candidat</option>
          <option value="RECRUITER">Recruteur</option>
          <option value="ADMIN">Administrateur</option>
        </select>
        <button
          type="submit"
          style={styles.button}
        >
          Créer
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

export default AddUser;
