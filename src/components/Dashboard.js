import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserResumes, downloadResume } from '../redux/resumeSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { resumes, isLoading } = useSelector((state) => state.resume);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(getUserResumes());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleDownload = (resumeId, templateId = 1) => {
    dispatch(downloadResume({ resumeId, templateId }));
  };

  const handleCreateNew = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <button onClick={handleCreateNew} className="create-btn">
            <i className="fas fa-plus"></i>
            Create New Resume
          </button>
        </div>

        <div className="dashboard-content">
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="stat-info">
                <h3>{resumes.length}</h3>
                <p>Total Resumes</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-download"></i>
              </div>
              <div className="stat-info">
                <h3>{resumes.filter(r => r.downloaded).length}</h3>
                <p>Downloaded</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-palette"></i>
              </div>
              <div className="stat-info">
                <h3>10</h3>
                <p>Templates Available</p>
              </div>
            </div>
          </div>

          <div className="resumes-section">
            <h2>Your Resumes</h2>
            {resumes.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-file-alt"></i>
                <h3>No resumes yet</h3>
                <p>Create your first professional resume to get started</p>
                <button onClick={handleCreateNew} className="create-btn">
                  Create Your First Resume
                </button>
              </div>
            ) : (
              <div className="resumes-grid">
                {resumes.map((resume) => (
                  <div key={resume._id} className="resume-card">
                    <div className="resume-preview">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="resume-info">
                      <h3>{resume.personalInfo.fullName}'s Resume</h3>
                      <p>Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                      <p>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="resume-actions">
                      <button
                        onClick={() => handleDownload(resume._id)}
                        className="download-btn"
                      >
                        <i className="fas fa-download"></i>
                        Download
                      </button>
                      <button
                        onClick={() => navigate('/templates', { state: { resumeId: resume._id } })}
                        className="template-btn"
                      >
                        <i className="fas fa-palette"></i>
                        Choose Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;