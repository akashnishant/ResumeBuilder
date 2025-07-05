import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { downloadResume } from '../redux/resumeSlice';

const Templates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const resumeId = location.state?.resumeId;

  const templates = [
    { id: 1, name: 'Classic Professional', free: true, preview: '/api/templates/1/preview' },
    { id: 2, name: 'Modern Creative', free: false, price: '$9.99', preview: '/api/templates/2/preview' },
    { id: 3, name: 'Executive Elite', free: false, price: '$12.99', preview: '/api/templates/3/preview' },
    { id: 4, name: 'Tech Specialist', free: false, price: '$9.99', preview: '/api/templates/4/preview' },
    { id: 5, name: 'Creative Designer', free: false, price: '$14.99', preview: '/api/templates/5/preview' },
    { id: 6, name: 'Academic Scholar', free: false, price: '$8.99', preview: '/api/templates/6/preview' },
    { id: 7, name: 'Sales Professional', free: false, price: '$10.99', preview: '/api/templates/7/preview' },
    { id: 8, name: 'Healthcare Expert', free: false, price: '$11.99', preview: '/api/templates/8/preview' },
    { id: 9, name: 'Finance Analyst', free: false, price: '$9.99', preview: '/api/templates/9/preview' },
    { id: 10, name: 'Marketing Guru', free: false, price: '$13.99', preview: '/api/templates/10/preview' },
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!resumeId) {
      alert('Please select a resume from your dashboard first');
      navigate('/dashboard');
      return;
    }

    const template = templates.find(t => t.id === selectedTemplate);
    
    if (!template.free && !user.isPremium) {
      alert(`This template costs ${template.price}. Please upgrade to premium to use paid templates.`);
      return;
    }

    dispatch(downloadResume({ resumeId, templateId: selectedTemplate }));
  };

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login')
    }
  })

  return (
    <div className="templates-page">
      <div className="container">
        <div className="templates-header">
          <h1>Choose Your Resume Template</h1>
          <p>Select from our collection of professional resume templates</p>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="template-preview">
                <div className="template-placeholder">
                  <i className="fas fa-file-alt"></i>
                  <p>Template {template.id}</p>
                </div>
              </div>
              
              <div className="template-info">
                <h3>{template.name}</h3>
                <div className="template-price">
                  {template.free ? (
                    <span className="free-badge">FREE</span>
                  ) : (
                    <span className="price-badge">{template.price}</span>
                  )}
                </div>
              </div>

              {selectedTemplate === template.id && (
                <div className="selected-indicator">
                  <i className="fas fa-check"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="template-actions">
          <div className="selected-template-info">
            <h3>Selected: {templates.find(t => t.id === selectedTemplate)?.name}</h3>
            {!templates.find(t => t.id === selectedTemplate)?.free && (
              <p className="premium-notice">
                <i className="fas fa-crown"></i>
                This is a premium template
              </p>
            )}
          </div>
          
          <div className="action-buttons">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              Back to Dashboard
            </button>
            <button onClick={handleDownload} className="download-btn">
              <i className="fas fa-download"></i>
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;