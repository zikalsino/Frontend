import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Creator.css';
import axios from 'axios';

import {
  getAllJobOffers,
  deleteJobOffer,
  toggleJobOfferPublication,
  getApplicationsByJobOffer,
} from '../../services/JobOfferService';




const JobOfferCreator = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const navigate = useNavigate(); // Pour naviguer vers la page de création

  useEffect(() => {
    fetchJobOffers();
  }, []);

  const deleteJobOffer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recruter/${id}`);
      alert('Offre supprimée avec succès!');
      loadJobOffers(); // Recharger les offres après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre", error);
      setError("Erreur lors de la suppression de l'offre");
    }
  };

  const fetchJobOffers = async () => {
    try {
      const response = await getAllJobOffers(0, 10);
      setJobOffers(response.data.content || []);
    } catch (error) {
      console.error("Erreur lors du chargement des offres :", error);
    }
  };
  const toggleJobOfferPublication = async (id, publier) => {
    try {
      await axios.put(`http://localhost:8080/api/recruter/offers/${id}`, null, {
        params: { publier: !publier },
      });
      alert(`Offre ${!publier ? 'publiée' : 'dépubliée'} avec succès!`);
      loadJobOffers(); // Recharger après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre :", error);
      alert("Erreur lors de la mise à jour de l'offre.");
    }
  };

  return (
    <div>
      <h1>Gestion des Offres d'Emploi</h1>
      <button onClick={() => navigate('/create')}>Créer une nouvelle offre</button> {/* Bouton pour aller à la création */}

      <div>
        <h2>Liste des offres</h2>
        {jobOffers.map((offer) => (
          <div key={offer.id}>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <p>{offer.company}</p>
            <p>{offer.location}</p>
            
            <button onClick={() => deleteJobOffer(offer.id)}>Supprimer</button>
            <button
              onClick={() => toggleJobOfferPublication(offer.id, !offer.publier)}
            >
              {offer.publier ? "Dépublier" : "Publier"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOfferCreator;
