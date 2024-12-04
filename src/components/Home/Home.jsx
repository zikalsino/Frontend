import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/yas-logo.png'; // Import du logo

function Home() {
  return (
    <div className="home-page">
      {/* Header qui prend toute la largeur de la page */}
      <header className="header">
      
        <h1>Bienvenue sur le portail</h1>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
      <img src={logo} alt="Logo" className="logo" />
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>
      </aside>

      {/* Contenu principal */}
      <div className="content">
        <p>Utilisez la barre latérale pour naviguer dans le portail.</p>
      </div>
      
    </div>
  );
}

export default Home;
