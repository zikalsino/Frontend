import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function ProfileManagement() {
  const [candidate, setCandidate] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    poste: '',
    entreprise: '',
    description: '',
    dateDebut: '',
    dateFin: ''
  });
  const [newCompetence, setNewCompetence] = useState({
    nom: '',
    domaine: '',
  });
  const [view, setView] = useState('main');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const candidateId = 1; // Remplacer par l'ID réel
  const BASE_URL = 'http://localhost:8080/api/profile';

  // Fonction pour récupérer le profil complet
  const fetchFullProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching profile for ID:', candidateId);
      
      // Fetch profile data
      const profileResponse = await axios.get(`${BASE_URL}/${candidateId}`);
      
      // Fetch experiences
      const experiencesResponse = await axios.get(`${BASE_URL}/${candidateId}/experiences`);
      
      // Fetch competences
      const competencesResponse = await axios.get(`${BASE_URL}/${candidateId}/competences`);

      console.log('Profile Response:', profileResponse.data);
      console.log('Experiences:', experiencesResponse.data);
      console.log('Competences:', competencesResponse.data);

      // Update state with fetched data
      setCandidate({
        name: profileResponse.data.name || 'N/A',
        email: profileResponse.data.email || 'N/A',
        skills: profileResponse.data.skills || 'Aucune compétence listée'
      });

      setExperiences(experiencesResponse.data || []);
      setCompetences(competencesResponse.data || []);
      
      // Switch to profile view
      setView('profile');
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      setError('Impossible de charger le profil. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const addExperience = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/${candidateId}/experiences`, newExperience);
      setExperiences([...experiences, response.data]);
      setNewExperience({
        poste: '',
        entreprise: '',
        description: '',
        dateDebut: '',
        dateFin: ''
      });
      setView('main');
      alert('Expérience ajoutée avec succès');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'expérience", error);
      alert("Erreur lors de l'ajout de l'expérience");
    }
  };

  const addCompetence = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/${candidateId}/competences`, newCompetence);
      setCompetences([...competences, response.data]);
      setNewCompetence({
        nom: '',
        domaine: '',
      });
      setView('main');
      alert('Compétence ajoutée avec succès');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence", error);
      alert("Erreur lors de l'ajout de la compétence");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {view === 'main' && (
        <>
          <h1 className="text-2xl font-bold mb-4">Gestion du Profil</h1>
          <div className="flex flex-col items-start">
            <button
              onClick={() => setView('addExperience')}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
            >
              Ajouter une expérience
            </button>
            <button
              onClick={() => setView('addCompetence')}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
            >
              Ajouter une compétence
            </button>
            <button
              onClick={fetchFullProfile}
              disabled={loading}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Chargement...' : 'Voir le profil'}
            </button>
          </div>
        </>
      )}

      {view === 'profile' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}

          <h2 className="text-xl font-bold mb-4">Profil du Candidat</h2>
          {candidate ? (
            <div className="mb-4">
              <p><strong>Nom :</strong> {candidate.name}</p>
              <p><strong>Email :</strong> {candidate.email}</p>
              <p><strong>Compétences :</strong> {candidate.skills}</p>
            </div>
          ) : (
            <p>Profil introuvable</p>
          )}

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Expériences</h3>
            {experiences.length > 0 ? (
              <ul>
                {experiences.map((exp, index) => (
                  <li key={exp.id || index} className="mb-2 border-b pb-2">
                    <strong>{exp.poste}</strong> chez {exp.entreprise} 
                    <p className="text-gray-600">({exp.dateDebut} - {exp.dateFin})</p>
                    <p>{exp.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune expérience trouvée</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Compétences</h3>
            {competences.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {competences.map((comp, index) => (
                  <li 
                    key={comp.id || index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {comp.nom} - {comp.domaine}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune compétence trouvée</p>
            )}
          </div>

          <button
            onClick={() => setView('main')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Retour
          </button>
        </div>
      )}

      {view === 'addExperience' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-bold mb-4">Ajouter une expérience</h2>
          <input
            type="text"
            placeholder="Poste"
            value={newExperience.poste}
            onChange={(e) => setNewExperience({ ...newExperience, poste: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
            required
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={newExperience.entreprise}
            onChange={(e) => setNewExperience({ ...newExperience, entreprise: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
            required
          />
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
            rows="4"
          />
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm mb-2">Date de début</label>
              <input
                type="date"
                value={newExperience.dateDebut}
                onChange={(e) => setNewExperience({ ...newExperience, dateDebut: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm mb-2">Date de fin</label>
              <input
                type="date"
                value={newExperience.dateFin}
                onChange={(e) => setNewExperience({ ...newExperience, dateFin: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={addExperience}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter
            </button>
            <button
              onClick={() => setView('main')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {view === 'addCompetence' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-bold mb-4">Ajouter une compétence</h2>
          <input
            type="text"
            placeholder="Compétence"
            value={newCompetence.nom}
            onChange={(e) => setNewCompetence({ ...newCompetence, nom: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
            required
          />
          <input
            type="text"
            placeholder="Domaine"
            value={newCompetence.domaine}
            onChange={(e) => setNewCompetence({ ...newCompetence, domaine: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={addCompetence}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter
            </button>
            <button
              onClick={() => setView('main')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileManagement;