import axios from 'axios';

// Crée une instance Axios avec une configuration par défaut
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



// Ajouter le token dans l'en-tête pour chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("token",token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
