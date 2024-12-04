import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageInformationManager = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get('/api/pages/list'); // Récupérer toutes les pages
      setPages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des pages :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const savePage = async () => {
    if (!formData.title || !formData.content) {
      console.error("Le titre et le contenu sont obligatoires.");
      return;
    }

    try {
      if (selectedPage) {
        // Mettre à jour une page existante
        await axios.put(`/api/pages/${selectedPage.id}`, formData);
      } else {
        // Créer une nouvelle page
        await axios.post('/api/pages/create', formData);
      }
      fetchPages();
      setFormData({ title: '', content: '' }); // Nettoyer le formulaire
      setSelectedPage(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la page :", error);
    }
  };

  const deletePage = async (id) => {
    try {
      await axios.delete(`/api/pages/${id}`); // Supprimer une page
      fetchPages();
    } catch (error) {
      console.error("Erreur lors de la suppression de la page :", error);
    }
  };

  return (
    <div>
      <h1>Gestion des Pages d'Information</h1>
      <div>
        <h2>{selectedPage ? "Modifier une page" : "Créer une nouvelle page"}</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Titre de la page"
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          value={formData.content}
          placeholder="Contenu de la page"
          onChange={handleInputChange}
        />
        <button onClick={savePage}>
          {selectedPage ? "Mettre à jour" : "Enregistrer"}
        </button>
      </div>

      <h2>Pages existantes</h2>
      <ul>
        {Array.isArray(pages) && pages.map((page) => (
          <li key={page.id}>
            <h3>{page.title}</h3>
            <button onClick={() => {
              setSelectedPage(page);
              setFormData({ title: page.title, content: page.content });
            }}>
              Modifier
            </button>
            <button onClick={() => deletePage(page.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageInformationManager;
