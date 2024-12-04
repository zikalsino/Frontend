import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';

const Skills = () => {
  const { id } = useParams();
  const [competence, setCompetence] = useState({
    nom: '',
    domaine: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetence((prevCompetence) => ({
      ...prevCompetence,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addCompetence(id, competence);
      alert('Compétence ajoutée avec succès');
    } catch (error) {
      alert('Erreur lors de l\'ajout de la compétence');
    }
  };

  return (
    <div>
      <h2>Ajouter une compétence</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          value={competence.nom}
          onChange={handleChange}
          placeholder="Nom de la compétence"
        />
        <input
          type="text"
          name="domaine"
          value={competence.domaine}
          onChange={handleChange}
          placeholder="Domaine"
        />
        <button type="submit">Ajouter la compétence</button>
      </form>
    </div>
  );
};

export default Skills;
