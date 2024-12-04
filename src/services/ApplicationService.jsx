import axios from '../services/api';

const BASE_URL = 'http://localhost:8080/api/applications';

const ApplicationService = {
  getApplicationsByCandidate: (candidateId) =>
    axios.get(`${BASE_URL}/candidate/${candidateId}`),

  getApplicationsForJob: (jobOfferId) =>
    axios.get(`${BASE_URL}/job-offer/${jobOfferId}`),

  getAllApplications: () => axios.get(`${BASE_URL}/list-app`),

  updateApplicationStatus: (id, status) =>
    axios.patch(`${BASE_URL}/status/${id}`, null, {
      params: { status },
    }),
};

export default ApplicationService;
