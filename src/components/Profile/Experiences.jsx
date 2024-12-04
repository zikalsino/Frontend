import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';

const Experience = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState({
    entreprise: '',
    poste: '',
    dateDebut: '',
    dateFin: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addExperience(id, experience);
      alert('Expérience ajoutée avec succès');
    } catch (error) {
      alert('Erreur lors de l\'ajout de l\'expérience');
    }
  };

  return (
    <div>
      <h2>Ajouter une expérience</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="entreprise"
          value={experience.entreprise}
          onChange={handleChange}
          placeholder="Entreprise"
        />
        <input
          type="text"
          name="poste"
          value={experience.poste}
          onChange={handleChange}
          placeholder="Poste"
        />
        <input
          type="date"
          name="dateDebut"
          value={experience.dateDebut}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateFin"
          value={experience.dateFin}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={experience.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Ajouter l'expérience</button>
      </form>
    </div>
  );
};

export default Experience;
