import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import direct d'axios
import './Job.css';

const JobOfferList = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  // Champ de recherche unique
  const [searchQuery, setSearchQuery] = useState('');

  const BASE_URL = 'http://localhost:8080/api/recruter/jobOffers';

  useEffect(() => {
    loadJobOffers();
  }, [currentPage]); // Recharger quand la page change

  // Charger les offres d'emploi
  const loadJobOffers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          page: currentPage,
          size: pageSize,
          query: searchQuery, // Critère de recherche unique
        },
      });
      console.log('Données récupérées:', response.data.content);
      setJobOffers(response.data.content);
    } catch (error) {
      console.error('Erreur lors du chargement des offres', error);
      setError('Erreur lors du chargement des offres');
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion des recherches
  const handleSearch = () => {
    setCurrentPage(0); // Revenir à la première page pour une nouvelle recherche
    loadJobOffers();
  };

  // Supprimer une offre
  const handleDeleteJobOffer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recruter/${id}`);
      alert('Offre supprimée avec succès!');
      loadJobOffers(); // Recharger les offres après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre", error);
      setError("Erreur lors de la suppression de l'offre");
    }
  };

  // Publier ou dépublier une offre
  const handleTogglePublication = async (id, publier) => {
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

  // Gestion des pages
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  if (isLoading) return <div>Chargement des offres...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="job-list-container">
      <h2>Liste des Offres d'Emploi</h2>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une offre (mot-clé, localisation, etc.)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Rechercher
        </button>
      </div>

      {jobOffers.length === 0 ? (
        <p>Aucune offre disponible pour le moment.</p>
      ) : (
        <>
          <ul className="job-list">
            {jobOffers.map((offer) => (
              <li key={offer.id} className="job-item">
                <h3>{offer.title}</h3>
                <p>
                  <strong>Entreprise:</strong> {offer.company}
                </p>
                <p>
                  <strong>Exigences:</strong> {offer.requirements}
                </p>
                <p>
                  <strong>Description:</strong> {offer.description}
                </p>
                <p>
                  <strong>Lieu:</strong> {offer.location}
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteJobOffer(offer.id)}
                >
                  Supprimer
                </button>
                <button
                  className="publish-button"
                  onClick={() => handleTogglePublication(offer.id, offer.publier)}
                >
                  {offer.publier ? 'Dépublier' : 'Publier'}
                </button>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Page Précédente
            </button>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={jobOffers.length < pageSize}
            >
              Page Suivante
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobOfferList;
