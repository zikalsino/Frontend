import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContentManagement() {
  const [contents, setContents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/contenu');
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  const handleApproveContent = async (contentId) => {
    try {
      await axios.post(`http://localhost:8080/api/contents/${contentId}/approve`);
      setMessage('Contenu approuvé avec succès !');
      fetchContents(); // Actualiser la liste après action
    } catch (error) {
      console.error('Error approving content:', error);
    }
  };

  const handleRejectContent = async (contentId) => {
    try {
      await axios.post(`http://localhost:8080/api/contents/${contentId}/reject`);
      setMessage('Contenu rejeté avec succès !');
      fetchContents(); // Actualiser la liste après action
    } catch (error) {
      console.error('Error rejecting content:', error);
    }
  };

  const handleDeleteContent = async (contentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/contents/${contentId}`);
      setMessage('Contenu supprimé avec succès !');
      fetchContents(); // Actualiser la liste après action
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  return (
    <div>
      <h2>Gestion du contenu</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <h3>Liste des contenus</h3>
      <table border="1" style={{ width: "80%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(content => (
            <tr key={content.id}>
              <td>{content.titre}</td>
              <td>{content.description}</td>
              <td>{content.approuve ? 'Approuvé' : 'Non approuvé'}</td>
              <td>
                <button onClick={() => handleApproveContent(content.id)}>Approuver</button>
                <button onClick={() => handleRejectContent(content.id)}>Rejeter</button>
                <button onClick={() => handleDeleteContent(content.id)}>Supprimer</button>
                <button onClick={() => navigate('/admin')} style={{ marginBottom: '10px' }}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContentManagement;
