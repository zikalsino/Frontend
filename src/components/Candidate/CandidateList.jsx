import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function CandidateList({ searchQuery }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, [searchQuery]);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('http://localhost:8080/api/candidates/list'); 
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };
  
  return (
    <div className="candidate-list">
      {candidates.length > 0 ? (
        candidates.map(candidate => (
          <div key={candidate.id} className="candidate-card">
            <h3>{candidate.firstName}</h3>
            <h3>{candidate.lastName}</h3>
            <p>Phone: {candidate.phoneNumber}</p>
            <p>Address: {candidate.address}</p>
            <p>Email: {candidate.email}</p>
            <button>View Profile</button>
          </div>
        ))
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
}

export default CandidateList;
