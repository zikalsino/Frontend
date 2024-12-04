import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords are not the same');
      return;
    }
    axios.post('http://localhost:8080/api/users/reset-password', { code, newPassword })
      .then(response => {
        if (response.data) {
          navigate('/');
        } else {
          setError('Invalid or expired code.');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setError('Invalid or expired verification code');
        } else {
          setError('An error occurred');
        }
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h1>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <input
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
            placeholder='Code'
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
            placeholder='New Password'
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
            placeholder='Confirm New Password'
          />
        </div>
        <button type='submit' style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
