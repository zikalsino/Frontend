import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/recruter';

const CandidateService = {
  searchCandidates: (skill, experience) =>
    axios.get(`${BASE_URL}/search?skill=${skill}&experience=${experience}`),
};

export default CandidateService;
