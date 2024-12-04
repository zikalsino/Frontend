import React, { useState } from "react";
import axios from "axios";
import "./Manage.css";
//import ApplicationService from "../../services/ApplicationService";

const ApplicationManager = () => {
  const [currentPage, setCurrentPage] = useState("home"); // Page courante
  const [jobOfferId, setJobOfferId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fonction pour aller à une autre page
  const navigateTo = (page) => {
    setCurrentPage(page);
    setError("");
    setSuccess("");
  };

  // Fonction pour revenir à la page d'accueil
  const goBack = () => {
    setCurrentPage("home");
  };

  // Visualiser les candidatures
  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:8080/api/applications/offres/candidatures", {
        id: jobOfferId,
      });
      setApplications(response.data);
      setSuccess("Candidatures récupérées avec succès !");
    } catch (err) {
      setError("Erreur lors de la récupération des candidatures.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Évaluer une candidature
  const evaluateApplication = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`http://localhost:8080/api/applications/evaluate/${applicationId}`, null, {
        params: { score, notes },
      });
      setSuccess("Candidature évaluée avec succès !");
      console.log(response.data);
    } catch (err) {
      setError("Erreur lors de l'évaluation de la candidature.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Modifier le statut d'une candidature
  const updateApplicationStatus = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.patch(`http://localhost:8080/api/applications/status/${applicationId}`, null, {
        params: { status },
      });
      setSuccess("Statut du candidat mis à jour avec succès !");
      console.log(response.data);
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut de la candidature.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Notifier un candidat
  const notifyCandidate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(`http://localhost:8080/api/applications/notify/${candidateId}`, message, {
        headers: { "Content-Type": "text/plain" },
      });
      setSuccess("Notification envoyée avec succès !");
    } catch (err) {
      setError("Erreur lors de l'envoi de la notification.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Contenu des pages
  const renderHomePage = () => (
    <div>
      <h1>Gestion des Candidatures</h1>
      <button onClick={() => navigateTo("viewApplications")}>Visualiser les Candidatures</button>
      <button onClick={() => navigateTo("evaluateApplication")}>Évaluer une Candidature</button>
      <button onClick={() => navigateTo("updateApplicationStatus")}>Mettre à jour le Statut</button>
      <button onClick={() => navigateTo("notifyCandidate")}>Notifier un Candidat</button>
    </div>
  );

  const renderViewApplicationsPage = () => (
    <div>
      <h2>Visualiser les Candidatures</h2>
      <input
        type="text"
        placeholder="ID de l'offre d'emploi"
        value={jobOfferId}
        onChange={(e) => setJobOfferId(e.target.value)}
      />
      <button onClick={fetchApplications}>Afficher les candidatures</button>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {applications.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Statut</th>
              <th>Score</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.status}</td>
                <td>{app.score || "Non noté"}</td>
                <td>{app.notes || "Aucune"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={goBack}>Retour</button>
    </div>
  );

  const renderEvaluateApplicationPage = () => (
    <div>
      <h2>Évaluer une Candidature</h2>
      <input
        type="text"
        placeholder="ID de la candidature"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={evaluateApplication}>Évaluer</button>
      <button onClick={goBack}>Retour</button>
    </div>
  );

  const renderUpdateStatusPage = () => (
    <div>
      <h2>Mettre à jour le Statut</h2>
      <input
        type="text"
        placeholder="ID de la candidature"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nouveau statut"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={updateApplicationStatus}>Mettre à jour</button>
      <button onClick={goBack}>Retour</button>
    </div>
  );

  const renderNotifyCandidatePage = () => (
    <div>
      <h2>Notifier un Candidat</h2>
      <input
        type="text"
        placeholder="ID du candidat"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={notifyCandidate}>Envoyer</button>
      <button onClick={goBack}>Retour</button>
    </div>
  );

  // Affichage en fonction de la page courante
  return (
    <div className="container">
      {currentPage === "home" && renderHomePage()}
      {currentPage === "viewApplications" && renderViewApplicationsPage()}
      {currentPage === "evaluateApplication" && renderEvaluateApplicationPage()}
      {currentPage === "updateApplicationStatus" && renderUpdateStatusPage()}
      {currentPage === "notifyCandidate" && renderNotifyCandidatePage()}
    </div>
  );
};

export default ApplicationManager;
