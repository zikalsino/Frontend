import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Vérifiez si le token JWT est présent dans le localStorage
  const isAuthenticated = localStorage.getItem('jwt') !== null;

  // Si non authentifié, redirigez vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si authentifié, affichez les enfants
  return children;
};

export default PrivateRoute;
