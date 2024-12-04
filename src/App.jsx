import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CandidateDashboard from "./components/Candidate/CandidateDashboard";
import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import RequestResetPassword from "./components/Auth/RequestResetPassword";
//import './App.css';
//import PrivateRoute from './components/PrivateRoute';
import StatisticsAndReports from "./components/Admin/StatisticsAndReports";
import ContentManagement from "./components/Admin/ContentManagement";
import UserManagement from "./components/Admin/UserManagement";
import Home from "./components/Home/Home";
//import Navbar from "./components/Shared/Navbar";

import JobOffers from './components/Recruiter/JobOfferCreator';
import ApplicationManager from './components/Recruiter/ApplicationManager';
import ApplicationList from './components/Recruiter/ApplicationList';
import JobList from './components/Candidate/JobList';
import ProfileManagement from './components/Profile/ProfileManagement';
import UpdatePersonalInfo from './components/Profile/UpdatePersonnelnfo';
import AddExperience from './components/Profile/AddExperience';
import AddSkills from './components/Profile/AddSkills';
import CreateJobOfferForm from './components/Recruiter/CreateJobOfferForm';
import JobOfferList from './components/Recruiter/JobOfferList';
import AddUser from './components/Admin/AddUser';
import CVUpload from './components/Profile/CVUpload';
import ApplicationForm from './components/Application/ApplicationForm';
import ResetPassword from './components/Auth/ResetPassword';
import JobOfferCreator from './components/Recruiter/JobOfferCreator';
import Report from './components/Admin/Report';
import ContentList from './components/Admin/ContentList';
import AddContentForm from './components/Admin/AddContent';
import PageInformationManager from './components/Admin/PageInformationManager';
import  NewsManager  from './components/Admin/NewsManager';
import ReportList from './components/Admin/ReportList';


function App() {
  return (
    <Router>
       
     
       
      <div className="App">
      
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
          <Route path="/profile" element={<ProfileManagement />} />
                <Route path="/update-info" element={<UpdatePersonalInfo />} />
                <Route path="/add-experience" element={<AddExperience />} />
                <Route path="/add-skill" element={<AddSkills />} />
                <Route path="/upload-cv" element={<CVUpload />} />
       
          
          <Route   path='/JobList' element={<JobList />}/>
          <Route path="/apply/:jobId" element={<ApplicationForm />} />
          <Route   path='/JobOfferList' element={<JobOfferList />}/>
      
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/management" element={<UserManagement/>}/>
          <Route path="/report-generator" element={<Report />} />
          <Route path="/list" element={<ContentList />} />
          <Route path="/add" element={<AddContentForm />} />
          <Route path="/info" element={<PageInformationManager />} />
          <Route path="/new" element={<NewsManager/>} />
          <Route path="/reports" exact component={ReportList} />
          <Route path="/content" element={<ContentManagement/>}/>
          <Route path="/admin/add-user" element={<AddUser />} /> 
          <Route path="/statistics" element={<StatisticsAndReports/>}/>
          <Route path="/report-generator" element={<ReportList />} />
        <Route path="/report-generator/:id" element={<Report />} />
        <Route path="/report-generator/new" element={<Report />} />
        {/* Autres routes */}
          <Route path="/job-offers" element={<JobOffers />} />
          <Route path="/ApplicationEval" element={<ApplicationManager />} />
          <Route path="/ApplicationList" element={<ApplicationList />} />
          <Route path="/Reset" element={<RequestResetPassword />} />
          <Route path="/Reset/:jwt" element={<RequestResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create" element={<CreateJobOfferForm />} /> {/* Page création */}
          <Route path="/job" element={<JobOfferCreator />} />
        </Routes>
        
      </div>
      
    </Router>
  );
}

export default App;