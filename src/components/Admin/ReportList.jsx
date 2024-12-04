import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importation de jsPDF

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/reports/list')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des rapports:', error);
      });
  }, []);

  const startEdit = (report) => {
    setEditingReport(report);
    setFormData({ title: report.title, description: report.description });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!editingReport) return;

    axios.put(`http://localhost:8080/api/reports/${editingReport.id}`, formData)
      .then(() => {
        setReports(prevReports =>
          prevReports.map(report =>
            report.id === editingReport.id ? { ...report, ...formData } : report
          )
        );
        setEditingReport(null);
        setFormData({ title: '', description: '' });
        navigate('/admin');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du rapport:', error);
      });
  };

  const deleteReport = (id) => {
    axios.delete(`http://localhost:8080/api/reports/${id}`)
      .then(() => {
        setReports(prevReports => prevReports.filter(report => report.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du rapport:', error);
      });
  };

  // Fonction pour générer et télécharger le rapport au format PDF
  const handleDownload = (report) => {
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
    <div className="report-list-container">
      <h1>Liste des Rapports</h1>
      <Link to="/report-generator" className="btn btn-primary">Créer un rapport</Link>

      {editingReport ? (
        <form onSubmit={handleEditSubmit}>
          <h2>Modifier le Rapport</h2>
          <label>
            Titre :
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </label>
          <br />
          <label>
            Description :
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </label>
          <br />
          <button type="submit" className="btn btn-primary">Mettre à jour</button>
          <button onClick={() => setEditingReport(null)} className="btn btn-secondary">Annuler</button>
        </form>
      ) : (
        <ul className="report-list">
          {reports.length > 0 ? (
            reports.map(report => (
              <li key={report.id} className="report-item">
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <p>Créé le : {report.createdDate}</p>
                <button onClick={() => deleteReport(report.id)} className="btn btn-danger">Supprimer</button>
                <button onClick={() => startEdit(report)} className="btn btn-info">Modifier</button>
                <button onClick={() => handleDownload(report)} className="btn btn-success">Télécharger</button> {/* Bouton pour télécharger le rapport */}
              </li>
            ))
          ) : (
            <p>Aucun rapport disponible.</p>
          )}
        </ul>
      )}

      <style jsx="true">{`
        .btn-success {
          background-color: #28a745;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ReportList;
