import axios from 'axios';

// Base URL de l'API Spring Boot
const API_URL = '/api/candidates';

const apiService = {
  // Mettre à jour le profil du candidat
  updateProfile: async (id, candidateData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/profile`, candidateData);
      return response.data;
    } catch (error) {
      console.error('Erreur de mise à jour du profil:', error);
      throw error;
    }
  },

  // Ajouter une expérience
  addExperience: async (id, experienceData) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/experiences`, experienceData);
      return response.data;
    } catch (error) {
      console.error('Erreur d\'ajout d\'expérience:', error);
      throw error;
    }
  },

  // Ajouter une compétence
  addCompetence: async (id, competenceData) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/competences`, competenceData);
      return response.data;
    } catch (error) {
      console.error('Erreur d\'ajout de compétence:', error);
      throw error;
    }
  },

  // Télécharger le CV
  uploadCV: async (id, cvPath) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/cv`, { cvPath });
      return response.status === 200;
    } catch (error) {
      console.error('Erreur lors de l\'upload du CV:', error);
      throw error;
    }
  }
};

export default apiService;
