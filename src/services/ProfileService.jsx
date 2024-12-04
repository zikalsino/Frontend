//import axi from '../../services/api';
import axios from 'axios';

const ProfileService = {
    getProfile: () => api.get('/profile'),
    updateProfile: (profileData) => axios.put('/profile', profileData),
    uploadCV: (cvFile) => axios.post('/profile/upload-cv', cvFile, { headers: { 'Content-Type': 'multipart/form-data' } }),
    getSkills: () => axios.get('/profile/skills'),
    addSkill: (skill) => axios.post('/profile/skills', { skill }),
    getExperiences: () => axios.get('/profile/experiences'),
    addExperience: (experience) => axios.post('/profile/experiences', { experience }),
};

export default ProfileService;
