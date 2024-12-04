// src/services/JobOfferService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/recruter"; // L'URL de base de votre backend

// Récupérer toutes les offres avec pagination
export const getAllJobOffers = (page, size) => {
  return axios.get(`${BASE_URL}/jobOffers`, {
    params: { page, size },
  });
};

// Créer une nouvelle offre
export const createJobOffer = (jobOffer, userId) => {
  return axios.post(`${BASE_URL}/create/${userId}`, jobOffer);
};

// Mettre à jour une offre
export const updateJobOffer = (id, jobOffer) => {
  return axios.put(`${BASE_URL}/update/${id}`, jobOffer); // Ajustement du chemin
};

// Supprimer une offre
export const deleteJobOffer = (id) => {
  return axios.delete(`${BASE_URL}/${id}`); // Ajustement du chemin
};


// Publier ou dépublier une offre
export const toggleJobOfferPublication = (id, publier) => {
  return axios.put(`${BASE_URL}/offers/${id}`, null, {
    params: { publier },
  });
};

// Visualiser les candidatures d'une offre
export const getApplicationsByJobOffer = async (jobOfferId) => {
  return axios.get(`/api/applications/job-offer/${jobOfferId}`);
};

