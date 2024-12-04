import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./StatisticsAndReports.css";

function StatisticsAndReports() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('http://localhost:8080/api/admin/rapport');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Statistics and Reports</h2>
      {stats && (
        <div className="stats-grid">
          <div className="stat-item">
            <div className="circle">
              <span>{stats.totalUsers}</span>
            </div>
            <p>Users</p>
          </div>
          <div className="stat-item">
            <div className="circle">
              <span>{stats.totalJobOffers}</span>
            </div>
            <p>Job Offers</p>
          </div>
          <div className="stat-item">
            <div className="circle">
              <span>{stats.totalApplications}</span>
            </div>
            <p>Candidatures</p>
          </div>
          <div className="stat-item">
            <div className="circle">
              <span>{stats.activeRecruiters}</span>
            </div>
            <p>Active Recruiters</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsAndReports;
