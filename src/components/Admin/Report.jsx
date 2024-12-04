import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Report = () => {
  const [report, setReport] = useState({
    id: null,
    title: '',
    description: '',
    contenu: '',
    createdDate: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Charger les données du rapport pour modification
      axios.get(`http://localhost:8080/api/reports/report/${id}`)
        .then(response => {
          setReport(response.data); // Charger le rapport avec ses données
        })
        .catch(error => {
          console.error('Erreur lors du chargement du rapport:', error);
          setErrorMessage('Erreur lors du chargement des données du rapport.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport(prevReport => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...reportData } = report;

    if (id) {
      // Mettre à jour un rapport existant
      axios.put(`http://localhost:8080/api/reports/${id}`, reportData)
        .then(() => {
          setSuccessMessage('Le rapport a été mis à jour avec succès !');
          setTimeout(() => navigate('/report-generator'), 2000);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du rapport:', error.response || error.message);
          setErrorMessage('Erreur lors de la mise à jour du rapport.');
        });
    } else {
      // Créer un nouveau rapport
      axios.post('http://localhost:8080/api/reports/create', reportData)
        .then(() => {
          setSuccessMessage('Le rapport a été créé avec succès !');
          setTimeout(() => navigate('/report-generator'), 2000);
        })
        .catch(error => {
          console.error('Erreur lors de la création du rapport:', error.response || error.message);
          setErrorMessage('Erreur lors de la création du rapport.');
        });
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Rapport', 10, 10);

    doc.setFontSize(12);
    doc.text(`Titre: ${report.title}`, 10, 20);
    doc.text(`Description: ${report.description}`, 10, 30);
    doc.text(`Contenu: ${report.contenu}`, 10, 40);
    doc.text(`Date de création: ${report.createdDate}`, 10, 50);

    doc.save(`${report.title}_rapport.pdf`);
  };

  return (
    <div className="container mt-4">
      <h1>{id ? 'Modifier le Rapport' : 'Créer un Rapport'}</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={report.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={report.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenu">Contenu</label>
          <textarea
            id="contenu"
            name="contenu"
            value={report.contenu}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdDate">Date de création</label>
          <input
            type="date"
            id="createdDate"
            name="createdDate"
            value={report.createdDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {id ? 'Mettre à jour' : 'Créer'}
        </button>
      </form>
      {successMessage && (
        <button onClick={handleDownload} className="btn btn-success mt-3">
          Télécharger le Rapport
        </button>
      )}
    </div>
  );
};

export default Report;
