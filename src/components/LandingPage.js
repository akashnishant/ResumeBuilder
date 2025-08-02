import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeForm from './ResumeForm';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateResume = (resumeData) => {
    // Store form data temporarily and redirect to register
    localStorage.setItem('tempResumeData', JSON.stringify(resumeData));
    // navigate('/resumeEditor');
    navigate('/basicPreview');
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Create Your Professional Resume in Minutes</h1>
          <p>Build a stunning resume with our professional templates and get hired faster</p>
        </div>
      </div>

      <div className="form-section">
        <div className="container">
          <h2>Start Building Your Resume</h2>
          <ResumeForm onSubmit={handleCreateResume} />
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Why Choose ResuMate?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-palette"></i>
              <h3>Professional Templates</h3>
              <p>Choose from professionally designed templates</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-download"></i>
              <h3>Easy Download</h3>
              <p>Download your resume as PDF instantly</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile Friendly</h3>
              <p>Create and edit resumes on any device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;