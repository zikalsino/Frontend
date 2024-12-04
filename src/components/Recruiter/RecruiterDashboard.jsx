import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecruiterDashboard.css';
import JobOfferCreator from './JobOfferCreator';
import ApplicationList from '../Recruiter/ApplicationList';
import ApplicationManager from './ApplicationManager';
import logo from '../../assets/yas-logo.png'; // Import du logo
import JobOfferList from '../Recruiter/JobOfferList';

function RecruiterDashboard() {
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const renderSection = () => {
    switch (selectedSection) {
      case 'JobOfferCreator':
        return <JobOfferCreator />;
      case 'ApplicationList':
        return <ApplicationList />;
      case 'ApplicationManager':
        return <ApplicationManager />;
        case 'JobOfferList':
          return <JobOfferList />;
          
        
      
    
      default:
        return <p>Sélectionnez une option dans le menu pour afficher son contenu.</p>;
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="recruiter-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
      </button>
      <aside className="sidebar">
      <img src={logo} alt="Logo" className="logo" />

        <h2>Dashboard</h2>
        <button onClick={() => setSelectedSection('JobOfferCreator')}>
          JobOffers
        </button>
        <button onClick={() => setSelectedSection('ApplicationList')}>
         Gestion des candidatures
        </button>
        <button onClick={() => setSelectedSection('ApplicationManager')}>
         status
        </button>
        <button onClick={() => setSelectedSection('JobOfferList')}>
          Listes des offres
        </button>
      </aside>
      <div className="content">
        <h1>Recruiter-Dashboard</h1>
        {renderSection()}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
