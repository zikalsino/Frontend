import React, { useEffect, useState } from 'react';
import ApplicationService from '../../services/ApplicationService';
import './ApplicationList.css';

const ApplicationList = ({ type, id }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let fetchApplications;

    if (type === 'candidate') {
      fetchApplications = ApplicationService.getApplicationsByCandidate(id);
    } else if (type === 'job') {
      fetchApplications = ApplicationService.getApplicationsForJob(id);
    } else {
      fetchApplications = ApplicationService.getAllApplications();
    }

    fetchApplications
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des candidatures.');
        setLoading(false);
      });
  }, [type, id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="application-list">
      <h2>Liste des Candidatures</h2>
      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Prenom</th>
              <th>nom</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>phoneNumber</th>
              <th>Offre</th>
              <th>Statut</th>
              <th>CV</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.candidate?.firstName || 'Non spécifié'}</td>
                <td>{app.candidate?.lastName || 'Non spécifié'}</td>
                <td>{app.candidate?.email || 'Non spécifié'}</td>
                <td>{app.candidate?.address || 'Non spécifié'}</td>
                <td>{app.candidate?.phoneNumber || 'Non spécifié'}</td>
                <td>{app.jobOffer?.title || 'Non spécifiée'}</td>
                <td>{app.status}</td>
                <td>
                  {app.cv ? (
                    <a href={app.cv} target="_blank" rel="noopener noreferrer">
                      Voir le CV
                    </a>
                  ) : (
                    'Non fourni'
                  )}
                </td>
                <td>
                  <button onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}>Accepter</button>
                  <button onClick={() => handleStatusUpdate(app.id, 'REJECTED')}>Rejeter</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune candidature trouvée.</p>
      )}
    </div>
  );

  function handleStatusUpdate(applicationId, status) {
    ApplicationService.updateApplicationStatus(applicationId, status)
      .then(() => {
        alert(`Statut mis à jour vers ${status}.`);
        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status } : app
          )
        );
      })
      .catch((err) => alert('Erreur lors de la mise à jour du statut.'));
  }
};

export default ApplicationList;
