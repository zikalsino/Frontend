import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApplicationForm.css';

const ApplicationForm = () => {
    const [candidateId, setCandidateId] = useState(null); // ID du candidat connecté
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedJob, setSelectedJob] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [message, setMessage] = useState('');

    // Récupérer l'utilisateur connecté au montage du composant
    useEffect(() => {
        fetchCurrentUser();
        fetchJobOffers();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/me');
            setCandidateId(response.data.id); // Suppose que l'ID du candidat est retourné
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur connecté", error);
            setMessage("Impossible de récupérer les informations de l'utilisateur.");
        }
    };

    const fetchJobOffers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/recruter/jobOffers', {
                params: { page: 0, size: 10 },
            });
            setJobOffers(response.data.content);
        } catch (error) {
            console.error("Erreur lors de la récupération des offres d'emploi", error);
        }
    };

    const handleFileUpload = (event) => {
        setCvFile(event.target.files[0]);
    };

    const handleApply = async () => {
        if (!candidateId) {
            setMessage("Impossible de récupérer votre identifiant. Veuillez vous connecter.");
            return;
        }

        if (!selectedJob || !cvFile || !coverLetter) {
            setMessage("Tous les champs (offre d'emploi, CV, lettre de motivation) sont requis.");
            return;
        }

        const formData = new FormData();
        formData.append('jobOfferId', selectedJob);
        formData.append('cv', cvFile);
        formData.append('coverLetter', coverLetter);

        try {
            const response = await axios.post(`http://localhost:8080/api/applications/apply`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data); // Message de succès
        } catch (error) {
            console.error("Erreur lors de la soumission de la candidature :", error.response?.data || error.message);
            setMessage("Échec de la soumission de la candidature.");
        }
    };

    return (
        <div className="application-form">
            <h2>Postuler à une Offre</h2>

            {message && (
                <p className={message.includes("succès") ? "success-message" : "error-message"}>
                    {message}
                </p>
            )}

            <label>Choisissez une offre d'emploi :</label>
            <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
            >
                <option value="">-- Sélectionnez une offre --</option>
                {jobOffers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                        {offer.title}
                    </option>
                ))}
            </select>

            <label>Importer votre CV :</label>
            <input type="file" onChange={handleFileUpload} />

            <label>Lettre de motivation :</label>
            <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Rédigez votre lettre de motivation ici (obligatoire)"
                required
            />

            <button onClick={handleApply}>Soumettre Candidature</button>
        </div>
    );
};

export default ApplicationForm;
