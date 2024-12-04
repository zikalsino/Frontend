import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RequestResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Vérifiez si cela s'affiche dans la console
  
    axios.post('http://localhost:8080/api/users/request-reset-password', { email })
      .then(response => {
        console.log('Response:', response.data); // Vérifiez si une réponse est reçue
        if (response.data) {
          alert('Reset email sent successfully');
          setTimeout(() => {
            navigate('/reset-password');
          }, 4000);
        } else {
          setError('An error occurred!');
        }
      })
      .catch((error) => {
        console.error('Error:', error); // Affichez l'erreur pour débogage
        setError('Reset failed!');
      });
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Request Reset Password</h1>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
            placeholder='Email'
          />
        </div>
        <button type='submit' style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
          Reset
        </button>
      </form>
    </div>
  );
}
