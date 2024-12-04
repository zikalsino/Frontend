import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from  '@fortawesome/free-solid-svg-icons';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [showUsers, setShowUsers] = useState(true); // Par défaut, afficher la liste des utilisateurs

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Définir l'utilisateur à modifier
    setShowUsers(false); // Cacher la liste des utilisateurs
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/Update/${selectedUser.id}`, selectedUser);
      setMessage('Utilisateur mis à jour avec succès.');
      fetchUsers(); // Recharger la liste des utilisateurs
      setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné
      setShowUsers(true); // Réafficher la liste des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
      setMessage('Erreur lors de la mise à jour.');
    }
  };

  const handleCancelEdit = () => {
    setSelectedUser(null); // Annuler la sélection
    setShowUsers(true); // Réafficher la liste des utilisateurs
  };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${userId}`);
      setMessage('Utilisateur supprimé avec succès.');
  
      // Mettre à jour localement la liste des utilisateurs après suppression
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur:', error);
      setMessage('Erreur lors de la suppression de l’utilisateur.');
    }
  };
  
  

  return (
    <div className="user-management">
  <h2>Gestion des utilisateurs</h2>
  {showUsers ? (
    <div>
      <h3>Liste des utilisateurs</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Numéro de téléphone</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEditClick(user)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="edit-user-form">
      <h3>Modifier l'utilisateur</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Prénom:
          <input
            type="text"
            name="firstName"
            value={selectedUser.firstName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Nom:
          <input
            type="text"
            name="lastName"
            value={selectedUser.lastName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={selectedUser.email}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Rôle:
          <input
            type="text"
            name="role"
            value={selectedUser.role}
            onChange={handleFormChange}
          />
        </label>
        <button className="save-btn" onClick={handleUpdateUser}>Enregistrer</button>
        <button className="cancel-btn" onClick={handleCancelEdit}>Annuler</button>
      </form>
    </div>
  )}
  {message && <p className="message">{message}</p>}
</div>

  );
}

export default UserManagement;
