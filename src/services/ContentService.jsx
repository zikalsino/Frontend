// src/services/ContentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/contents'; // Assurez-vous que l'URL est correcte

const getAllContents = () => {
    return axios.get(API_URL);
};

const addContent = (content) => {
    return axios.post(`${API_URL}/create`, content);
};

const updateContent = (id, content) => {
    return axios.put(`${API_URL}/${id}`, content);
};

const approveContent = (id) => {
    return axios.put(`${API_URL}/${id}/approve`);
};

const rejectContent = (id) => {
    return axios.put(`${API_URL}/${id}/reject`);
};

const deleteContent = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllContents,
    addContent,
    updateContent,
    approveContent,
    rejectContent,
    deleteContent,
};
