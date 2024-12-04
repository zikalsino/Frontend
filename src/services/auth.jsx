import api from './api';

const AUTH_TOKEN_KEY = 'auth_token';

// Fonction de login : enregistre le token en localStorage

export const login = async (email, password) => {
  try {
    const response = await api.post("http://localhost:8080/api/users/login", { email, password });
    const { token } = response.data;
    
    // Sauvegarde du token dans localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    return response.data; // Retourne les données de l'utilisateur ou autre
  } catch (error) {
    // Gestion des erreurs
    if (error.response && error.response.status === 403) {
      throw new Error('Identifiants incorrects. Veuillez réessayer.');
    } else {
      throw new Error('Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.');
    }
  }
};

// Fonction pour déconnecter l'utilisateur : supprime le token du localStorage
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Fonction pour récupérer le token de l'utilisateur
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Vérifie si l'utilisateur est authentifié (token présent)
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Ajouter le token à chaque requête protégée
export const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Appel à setAuthHeader après le login
