import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExperience from './AddExperience';
import Skills from './Skills';
import CVUpload from './CVUpload';

const ProfileManagement = ({ candidateId }) => {
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    skills: [],
    experience: [],
  });

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  // Charger le profil du candidat
  useEffect(() => {
    if (!candidateId) {
      console.error("ID du candidat est invalide !");
      return;
    }
    axios.get(`http://localhost:8080/api/profile/${candidateId}`)
      .then(response => setCandidate(response.data))
      .catch(error => console.error('Erreur lors du chargement du profil :', error));
  }, [candidateId]);

  // Charger les notifications non lues
  useEffect(() => {
    if (!candidateId) {
      console.error("ID du candidat est invalide !");
      return;
    }
    fetchNotifications();
  }, [candidateId]);

  const fetchNotifications = () => {
    if (!candidateId) {
      alert("ID du candidat est requis pour récupérer les notifications.");
      return;
    }

    setLoadingNotifications(true);
    axios.get(`http://localhost:8080/api/notifications/${candidateId}`)
      .then(response => setNotifications(response.data))
      .catch(error => {
        console.error('Erreur lors du chargement des notifications :', error);
        alert('Erreur lors du chargement des notifications.');
      })
      .finally(() => setLoadingNotifications(false));
  };

  // Marquer les notifications comme lues
  // Fonction pour marquer une notification comme lue
const markNotificationAsRead = (notificationId) => {
  axios.post(`http://localhost:8080/api/notifications/mark-as-read/${notificationId}`)
    .then(() => {
      // Mettre à jour l'état local après avoir marqué la notification comme lue
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      alert('Notification marquée comme lue.');
    })
    .catch(error => console.error('Erreur lors du marquage de la notification :', error));
};


  // Mettre à jour le profil du candidat
  const updateProfile = () => {
    if (!candidateId) {
      alert("ID du candidat est requis pour mettre à jour le profil.");
      return;
    }

    axios.put(`http://localhost:8080/api/profile/${candidateId}/profile`, candidate)
      .then(response => {
        setCandidate(response.data);
        alert('Profil mis à jour avec succès.');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil :', error);
        alert('Erreur lors de la mise à jour du profil.');
      });
  };

  const handleExperienceAdded = (newExperience) => {
    setCandidate(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const handleSkillAdded = (newSkill) => {
    setCandidate(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  return (
    <div>
      <h1>Gestion du Profil</h1>

      {/* Section Notifications */}
      <div>
        <h2>Notifications</h2>
        <button onClick={fetchNotifications}>
          Notifications
          {notifications.length > 0 && (
            <span style={{ marginLeft: '10px', color: 'red' }}>
              ({notifications.length})
            </span>
          )}
        </button>
        {loadingNotifications ? (
          <p>Chargement des notifications...</p>
        ) : (
          <div className="notifications-dropdown">
  {notifications.map(notification => (
    <div key={notification.id} style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>
      <p>{notification.message}</p>
      <small>{new Date(notification.createdAt).toLocaleString()}</small>
      <div>
        {/* Affichage de l'état de la notification (lue ou non) */}
        <strong>{notification.isRead ? 'Lue' : 'Non lue'}</strong>
        {/* Bouton pour marquer la notification comme lue */}
        {!notification.isRead && (
          <button onClick={() => markNotificationAsRead(notification.id)}>
            Marquer comme lue
          </button>
        )}
      </div>
    </div>
  ))}
  {notifications.length > 0 && (
    <button onClick={markNotificationsAsRead}>
      Marquer toutes comme lues
    </button>
  )}
</div>
        )}
      </div>

      {/* Mise à jour du profil */}
      <div>
        <h2>Mise à jour du profil</h2>
        <input
          type="text"
          placeholder="Prénom"
          value={candidate.firstName}
          onChange={e => setCandidate({ ...candidate, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nom"
          value={candidate.lastName}
          onChange={e => setCandidate({ ...candidate, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={candidate.email}
          onChange={e => setCandidate({ ...candidate, email: e.target.value })}
        />
        <button onClick={updateProfile}>
          Mettre à jour le profil
        </button>
      </div>

      {/* Ajouter les expériences */}
      <AddExperience candidateId={candidateId} onExperienceAdded={handleExperienceAdded} />

      {/* Ajouter les compétences */}
      <Skills candidateId={candidateId} onSkillAdded={handleSkillAdded} />

      {/* Uploader le CV */}
      <CVUpload candidateId={candidateId} />
    </div>
  );
};

export default ProfileManagement;
