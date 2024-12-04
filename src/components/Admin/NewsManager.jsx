import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [news, setNews] = useState({ id: '', title: '', content: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/news/list');
      setNewsList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/news/${news.id}`, news);
      } else {
        await axios.post('/api/news/create', news);
      }
      fetchNews();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  const setSelectedNews = (newsItem) => {
    setNews(newsItem);
    setIsEditing(true);
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`/api/news/${id}`);
      fetchNews();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const resetForm = () => {
    setNews({ id: '', title: '', content: '', category: '' });
    setIsEditing(false);
  };

  return (
    <div className="news-manager">
      <h1>Gestion des Articles</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={news.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Contenu"
          value={news.content}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={news.category}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Mettre à jour' : 'Créer'}</button>
        {isEditing && <button onClick={resetForm}>Annuler</button>}
      </form>

      <h2>Liste des Articles</h2>
      <ul>
  {Array.isArray(newsList) && newsList.map((news) => (
    <li key={news.id}>
      <h3>{news.title}</h3>
      <p>Catégorie: {news.category}</p>
      <p>Contenu: {news.content}</p>
      <button onClick={() => { setSelectedNews(news); setFormData(news); }}>Modifier</button>
      <button onClick={() => deleteNews(news.id)}>Supprimer</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default NewsManager;
