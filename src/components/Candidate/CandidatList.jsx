import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get('http://localhost:8080/api/candidates/list'); // Utilisez l'URL relative
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error); // Loguer l'erreur
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);
  
  return (
    <div>
      <h2>Candidate List</h2>
      {loading && <p>Loading candidates...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.firstName} - {candidate.lastName} - {candidate.address} - {candidate.phoneNumber} - {candidate.email} - {candidate.cvPath}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CandidateList;
