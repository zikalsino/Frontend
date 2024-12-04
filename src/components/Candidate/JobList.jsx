import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import './JobList.css';

const JobList = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    loadPublishedJobOffers(); // Charger les offres publiées
  }, []);

  // Fonction pour charger les offres publiées
  const loadPublishedJobOffers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Remplacer l'URL pour récupérer uniquement les offres publiées
      const response = await axios.get('http://localhost:8080/api/recruter/active');
      setJobOffers(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des offres publiées', error);
      setError('Erreur lors du chargement des offres publiées');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour rediriger vers le formulaire de candidature
  const redirectToApplicationForm = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  if (isLoading) return <div>Chargement des offres...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="job-list-container">
      <h2>Liste des Offres d'Emploi Publiées</h2>
      {jobOffers.length === 0 ? (
        <p>Aucune offre publiée disponible pour le moment.</p>
      ) : (
        <ul className="job-list">
          {jobOffers.map((offer) => (
            <li key={offer.id} className="job-item">
              <h3>{offer.title}</h3>
              <p><strong>Entreprise:</strong> {offer.company}</p>
              <p><strong>Exigences:</strong> {offer.requirements}</p>
              <p><strong>Description:</strong> {offer.description}</p>
              <p><strong>Lieu:</strong> {offer.location}</p>
              <button
                className="publish-button"
                onClick={() => redirectToApplicationForm(offer.id)}
              >
                Postuler
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
