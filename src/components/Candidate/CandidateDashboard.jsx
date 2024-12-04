import React, { useState } from 'react';
import './CandidateDashboard.css';
import JobList from './JobList';

import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../Application/ApplicationForm';
import ProfileManagement from '../Profile/ProfileManagement';


function CandidateDashboard() {
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const renderSection = () => {
    switch (selectedSection) {
      case 'ProfileManagement':
        return <ProfileManagement/>;
      case 'ApplicationForm':
        return <ApplicationForm/>;
        case 'JobList':
          return <JobList />;
      
      default:
        return <p>Sélectionnez une option dans le menu pour afficher son contenu.</p>;
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  

  return (
    <div className="candidate-dashboard">
      

      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
      </button>
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <button onClick={() => setSelectedSection('ProfileManagement')}>Gestion du profile</button>
        <button onClick={() => setSelectedSection('ApplicationForm')}>Candidater</button>
        <button onClick={() => setSelectedSection('JobList')}>JobList</button>
        
        
      </aside>

      <div className="content">
      
        <h1>Candidate Dashboard</h1>
        {renderSection()}
      </div>
    </div>
  );
}

export default CandidateDashboard;
