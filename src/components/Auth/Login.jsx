import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/yas-logo.png'; // Import du logo "yas"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true // For handling session cookies
        }
      );

      console.log(response.data);
      const { jwt, role } = response.data;
      setSuccessMessage('Authentification réussie !');
      setError(null);
      localStorage.setItem('jwt', jwt);

      // Redirect based on user role
      if (role === 'CANDIDATE') {
        navigate('/candidate');
      } else if (role === 'RECRUITER') {
        navigate('/recruiter');
      } else if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        setError("Rôle inconnu. Contactez l'administrateur.");
      }

    } catch (error) {
      console.error('Login failed:', error);
      setSuccessMessage(null);
      if (error.response && error.response.status === 403) {
        setError('Identifiants invalides. Veuillez réessayer.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };
  
  const goToReset = () => {
    navigate('/Reset');
  }

  return (
    <div className='login-container'>
      {/* Changement du logo */}
      <img src={logo} alt="Logo" className="logo" />
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Se connecter</button>
      </form>

      <button onClick={goToRegister} className="redirect-button">
        s'inscrire
      </button>
      <button onClick={goToReset} className="redirect-button">
        Reinitialiser
      </button>
    </div>
  );
}

export default Login;
