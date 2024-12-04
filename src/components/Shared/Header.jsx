import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import './Header.css';
// import Home from '../Home/Home';




function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
   
    
     <div>
    
   
  <nav className="navbar">
    <ul className="nav-list"  style={{
      position: 'relative',
      top :'0px',
      right :'0px',
      left :'100%',
      justifyContent:'flex-end',
      alignItems:'flex-end',
     }
      }>
   
      <li><Link to="/">Home</Link></li>
      {!isAuthenticated() ? (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      ) : (
        <>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/candidates-list">Candidats</Link></li> 
          <li><button onClick={handleLogout}>Logout</button></li>
        </>
      )}
    </ul>
  </nav>
  

</div>

    );


 };
export default Header;