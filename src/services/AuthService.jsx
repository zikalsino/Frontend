//import axios from 'axios';
//import axios from '';

const AuthService = {
    login: (email, password) => {
        return api.post("http://localhost:8080/api/users/login", { email,
             password });
    },
    register: (firstName,lastName, email, password,address,phoneNumber) => {
        return api.post("http://localhost:8080/api/users/register", {firstName,
            lastName,
             email,
              password,
              address,
              phoneNumber });
    },
    async resetPassword(jwt, newPassword) {
        try {
          await axios.post(`/api/users/request-reset-password`, { jwt, newPassword });
        } catch (error) {
          console.error("Erreur lors de la réinitialisation du mot de passe :", error);
          throw error;
        }
      },
    JobOfferCreator : (title, description, company,Location, requirements) =>{
        return api.post("http://localhost:8080/api/recruiter/create", {title,
             description,
              company,
              Location,
             requirements
            });
        }
    
};

export default AuthService;