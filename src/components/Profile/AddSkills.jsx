import React, { useState } from 'react';
import axios from 'axios';

const AddSkill = ({ candidateId, onSkillAdded }) => {
  const [newCompetence, setNewCompetence] = useState('');

  const addCompetence = () => {
    axios.post(`http://localhost:8080/api/profile/${candidateId}/competences`, { name: newCompetence })
      .then(response => {
        onSkillAdded(response.data); // Callback pour ajouter une compétence
        setNewCompetence('');
      })
      .catch(error => console.error('Erreur lors de l\'ajout de la compétence :', error));
  };

  return (
    <div>
      <h2>Ajouter une compétence</h2>
      <input
        type="text"
        placeholder="Compétence"
        value={newCompetence}
        onChange={e => setNewCompetence(e.target.value)}
      />
      <button onClick={addCompetence}>Ajouter compétence</button>
    </div>
  );
};

export default AddSkill;
