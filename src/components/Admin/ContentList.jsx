// src/components/ContentList.js
import React, { useEffect, useState } from 'react';
import ContentService from '../../services/ContentService';

const ContentList = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = () => {
        setLoading(true);
        ContentService.getAllContents()
            .then(response => {
                setContents(Array.isArray(response.data) ? response.data : []); // S'assurer que les données sont un tableau
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des contenus:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleApprove = (id) => {
        ContentService.approveContent(id)
            .then(() => fetchContents());
    };

    const handleReject = (id) => {
        ContentService.rejectContent(id)
            .then(() => fetchContents());
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
            ContentService.deleteContent(id)
                .then(() => fetchContents());
        }
    };

    return (
        <div>
            <h1>Liste des Contenus</h1>
            {loading ? (
                <p>Chargement des contenus...</p>
            ) : contents.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Approuvé</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map((content) => (
                            <tr key={content.id}>
                                <td>{content.titre}</td>
                                <td>{content.description}</td>
                                <td>{content.approuve ? 'Oui' : 'Non'}</td>
                                <td>
                                    <button onClick={() => handleApprove(content.id)}>Approuver</button>
                                    <button onClick={() => handleReject(content.id)}>Rejeter</button>
                                    <button onClick={() => handleDelete(content.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun contenu disponible.</p>
            )}
        </div>
    );
};

export default ContentList;
