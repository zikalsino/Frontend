// src/components/AddContent.js
import React, { useState } from 'react';
import ContentService from '../../services/ContentService';

const AddContent = ({ contentToEdit = null }) => {
    const [content, setContent] = useState(
        contentToEdit || { titre: '', description: '', content: '', type: '' }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent({ ...content, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);  // Désactive le bouton pendant l'envoi

        // Si un contenu est en édition, on met à jour
        if (content.id) {
            ContentService.updateContent(content.id, content)
                .then(() => {
                    setIsSubmitting(false);
                    alert('Contenu mis à jour avec succès !');
                    setContent({ titre: '', description: '', content: '', type: '' });  // Réinitialise le formulaire
                })
                .catch((error) => {
                    setIsSubmitting(false);
                    setError('Erreur lors de la mise à jour.');
                    console.error('Erreur lors de la mise à jour:', error);
                });
        } else {
            // Sinon on ajoute un nouveau contenu
            ContentService.addContent(content)
                .then(() => {
                    setIsSubmitting(false);
                    alert('Contenu ajouté avec succès !');
                    setContent({ titre: '', description: '', content: '', type: '' });  // Réinitialise le formulaire
                })
                .catch((error) => {
                    setIsSubmitting(false);
                    setError('Erreur lors de l\'ajout.');
                    console.error('Erreur lors de l\'ajout:', error);
                });
        }
    };

    return (
        <div>
            <h2>{content.id ? 'Modifier le Contenu' : 'Ajouter un Nouveau Contenu'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre :</label>
                    <input
                        type="text"
                        name="titre"
                        value={content.titre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description :</label>
                    <textarea
                        name="description"
                        value={content.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type :</label>
                    <input
                        type="text"
                        name="type"
                        value={content.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contenu :</label>
                    <textarea
                        name="content"
                        value={content.content}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
};

export default AddContent;
