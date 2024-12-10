import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manage.css";

const ApplicationManager = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [jobOffers, setJobOffers] = useState([]); // Liste des offres d'emploi
  const [selectedJobOffer, setSelectedJobOffer] = useState(""); // Offre sélectionnée
  const [applications, setApplications] = useState([]);
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger les offres d'emploi lors du premier rendu
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/recruter/published");
        setJobOffers(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des offres d'emploi", err);
      }
    };
    fetchJobOffers();
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setError("");
    setSuccess("");
  };

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
        id: selectedJobOffer,
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
      const response = await axios.post(
        `http://localhost:8080/api/applications/evaluate/${applicationId}`,
        null,
        { params: { score, notes } }
      );
      setSuccess("Candidature évaluée avec succès !");
    } catch (err) {
      setError("Erreur lors de l'évaluation de la candidature.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le statut
  const updateApplicationStatus = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/applications/status/${applicationId}`,
        null,
        { params: { status } }
      );
      setSuccess("Statut mis à jour avec succès !");
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderHomePage = () => (
    <div>
      <h1>Gestion des Candidatures</h1>
      <button onClick={() => navigateTo("viewApplications")}>Visualiser les Candidatures</button>
      <button onClick={() => navigateTo("evaluateApplication")}>Évaluer une Candidature</button>
      <button onClick={() => navigateTo("updateApplicationStatus")}>Mettre à jour le Statut</button>
      {/* <button onClick={() => navigateTo("notifyCandidate")}>Notifier un Candidat</button> */}
    </div>
  );

  const renderViewApplicationsPage = () => (
    <div>
      <h2>Visualiser les Candidatures</h2>
      <select
        value={selectedJobOffer}
        onChange={(e) => setSelectedJobOffer(e.target.value)}
      >
        <option value="">-- Sélectionner une offre d'emploi --</option>
        {jobOffers.map((offer) => (
          <option key={offer.id} value={offer.id}>
            {offer.title}
          </option>
        ))}
      </select>
      <button onClick={fetchApplications} disabled={!selectedJobOffer}>
        Afficher les candidatures
      </button>
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

  return (
    <div className="container">
      {currentPage === "home" && renderHomePage()}
      {currentPage === "viewApplications" && renderViewApplicationsPage()}
      {currentPage === "evaluateApplication" && renderEvaluateApplicationPage()}
      {currentPage === "updateApplicationStatus" && renderUpdateStatusPage()}
    </div>
  );
};

export default ApplicationManager;
