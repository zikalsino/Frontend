import api from '../services/api';

const JobService = {
    // Recherche d'offres d'emploi avec critères
    searchJobs: (searchCriteria) => api.post('/api/jobs/search', searchCriteria),

    // Soumettre une candidature pour une offre d'emploi spécifique
    applyToJob: (jobId, formData) => 
        api.post(`/api/applications/apply`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),

    // Récupérer les candidatures d'un candidat spécifique
    getCandidateApplications: (candidateId) => 
        api.get(`/api/applications/candidate/${candidateId}`),

    // Récupérer les candidatures pour une offre d'emploi spécifique
    getApplicationsForJob: (jobOfferId) => 
        api.get(`/api/applications/job-offer/${jobOfferId}`),

    // Mettre à jour le statut d'une candidature
    updateApplicationStatus: (applicationId, status) => 
        api.post(`/api/applications/${applicationId}/status`, { status }),

    // Évaluer une candidature
    evaluateApplication: (applicationId, evaluationData) => 
        api.post(`/api/applications/${applicationId}/evaluate`, evaluationData),

    // Envoyer une notification au candidat pour une candidature
    notifyCandidate: (applicationId, notificationType) => 
        api.post(`/api/applications/${applicationId}/notify`, { type: notificationType }),
};

export default JobService;
