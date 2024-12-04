import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reports';

export const fetchReports = async (type, period) => {
  try {
    const response = await axios.get(`${API_URL}/list`, {
      params: { type, period },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des rapports :", error);
    throw error;
  }
};
