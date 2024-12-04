import React, { useState } from 'react';
import axios from 'axios';

const AddExperience = ({ candidateId, onExperienceAdded }) => {
  const [newExperience, setNewExperience] = useState({
    poste: '',
    entreprise: '',
    description: '',
    dateDebut: '',
    dateFin: '',
  });

  const addExperience = () => {
    axios.post(`http://localhost:8080/api/profile/${candidateId}/experiences`, newExperience)
      .then(response => {
        onExperienceAdded(response.data); // Callback pour ajouter l'expérience
        setNewExperience({ poste: '', entreprise: '', description: '', dateDebut: '', dateFin: '' });
      })
      .catch(error => console.error('Erreur lors de l\'ajout de l\'expérience :', error));
  };

  return (
    <div>
      <h2>Ajouter une expérience</h2>
      <input
        type="text"
        placeholder="Poste"
        value={newExperience.poste}
        onChange={e => setNewExperience({ ...newExperience, poste: e.target.value })}
      />
      <input
        type="text"
        placeholder="Entreprise"
        value={newExperience.entreprise}
        onChange={e => setNewExperience({ ...newExperience, entreprise: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newExperience.description}
        onChange={e => setNewExperience({ ...newExperience, description: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date de début"
        value={newExperience.dateDebut}
        onChange={e => setNewExperience({ ...newExperience, dateDebut: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date de fin"
        value={newExperience.dateFin}
        onChange={e => setNewExperience({ ...newExperience, dateFin: e.target.value })}
      />
      <button onClick={addExperience}>Ajouter expérience</button>
    </div>
  );
};

export default AddExperience;
