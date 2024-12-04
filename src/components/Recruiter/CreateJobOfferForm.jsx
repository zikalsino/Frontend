import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobOffer } from '../../services/JobOfferService';
import './CreateForm.css'; // Import du fichier CSS

const CreateJobOfferForm = () => {
  const navigate = useNavigate();
  const [newJobOffer, setNewJobOffer] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    requirements: "",
    isActive: false,
    publier: false,
  });

  const handleCreateJobOffer = async () => {
    try {
      const userId = 1; // Exemple d'ID utilisateur
      await createJobOffer(newJobOffer, userId);
      console.log("creation reussie");
      navigate('/job');
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Créer une nouvelle offre</h1>
      <input
        type="text"
        placeholder="Titre"
        value={newJobOffer.title}
        onChange={(e) =>
          setNewJobOffer({ ...newJobOffer, title: e.target.value })
        }
      />
      <textarea
        placeholder="Description"
        value={newJobOffer.description}
        onChange={(e) =>
          setNewJobOffer({ ...newJobOffer, description: e.target.value })
        }
      ></textarea>
      <textarea
        placeholder="Requirements"
        value={newJobOffer.requirements}
        onChange={(e) =>
          setNewJobOffer({ ...newJobOffer, requirements: e.target.value })
        }
      ></textarea>
      <textarea
        placeholder="Company"
        value={newJobOffer.company}
        onChange={(e) =>
          setNewJobOffer({ ...newJobOffer, company: e.target.value })
        }
      ></textarea>
      <textarea
        placeholder="Location"
        value={newJobOffer.location}
        onChange={(e) =>
          setNewJobOffer({ ...newJobOffer, location: e.target.value })
        }
      ></textarea>
      <button onClick={handleCreateJobOffer}>Créer</button>
      <button className="cancel" onClick={() => navigate('/recruiter')}>Annuler</button>
    </div>
  );
};

export default CreateJobOfferForm;
