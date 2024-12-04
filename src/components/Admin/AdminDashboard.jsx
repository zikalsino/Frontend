import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import UserManagement from './UserManagement';
import StatisticsAndReports from './StatisticsAndReports';
import ContentManagement from './ContentManagement';
import AddUser from './AddUser';
import './AdminDashboard.css';
import logo from '../../assets/yas-logo.png'; // Import du logo
import Report from './Report';
import ContentList from './ContentList';
import AddContent from './AddContent';
//import NewsManager from './NewsManager';
//import PageInformationManager from './PageInformationManager';
import ReportList from './ReportList'; // Assurez-vous que le composant est importé correctement

function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate(); // Pour la redirection

  const renderSection = () => {
    switch (selectedSection) {
      case 'UserManagement':
        return <UserManagement />;
      case 'StatisticsAndReports':
        return <StatisticsAndReports />;
      case 'ContentManagement':
        return <ContentManagement />;
      case 'AddUser':
        return <AddUser />;
      case 'Report':
        return <Report />; // Rendre le composant Rapport
      case 'ContentList':
        return <ContentList />;
      case 'AddContent':
        return <AddContent />;
      // case 'News':
      //   return <NewsManager />;
      case 'ReportList': // Corriger ici en 'ReportList' au lieu de 'List'
        return <ReportList />;
      // case 'Infos':
      //   return <PageInformationManager />; // Rendre le composant Info
      default:
        return <p>Sélectionnez une option dans le menu pour afficher son contenu.</p>;
    }
  };

  const handleLogout = () => {
    // Logique de déconnexion, ex: suppression du token
    // Redirection vers la page de login
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Bouton de déconnexion */}
      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> {/* Icône de déconnexion */}
      </button>
      {/* Sidebar */}
      <aside className="sidebar">
      <img src={logo} alt="Logo" className="logo" />
        <div>
          <h2>Dashboard Admin</h2>
          <button onClick={() => setSelectedSection('UserManagement')}>
            User Management
          </button>
          <button onClick={() => setSelectedSection('StatisticsAndReports')}>
            Statistics
          </button>
          {/* <button onClick={() => setSelectedSection('ContentManagement')}>
            Content Management
          </button> */}
        </div>
      </aside>

      {/* Contenu dynamique */}
      <div className="content">
        {/* <button onClick={() => setSelectedSection('Infos')}> {/* Gestion des infos */}
         
        {/* </button> */}
        {/* <button onClick={() => setSelectedSection('News')}>
          News */}
        {/* </button> */}
        <button onClick={() => setSelectedSection('AddUser')}>
          Add User
        </button>
        <button onClick={() => setSelectedSection('Report')}> {/* Gestion des rapports */}
          Rapport
        </button>
        <button onClick={() => setSelectedSection('ContentList')}>
          Content List
        </button>
        <button onClick={() => setSelectedSection('AddContent')}>
          Add Content
        </button>
        <button onClick={() => setSelectedSection('ReportList')}> {/* Correctif ici */}
          RapportList
        </button>

        
        {renderSection()}
      </div>
    </div>
  );
}

export default AdminDashboard;
