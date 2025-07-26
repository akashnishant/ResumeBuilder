import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/resumeEditor.css';
import BasicModal from '../modals/BasicModal';
import BasicPreviewPage from './pages/BasicPreviewPage';

const BasicPreview = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('tempResumeData') === undefined || localStorage.getItem('tempResumeData') === null) {
      navigate('/');
    }
  }, [])

  return (
    <div className="resume-container">
      {/* <BasicModal /> */}
      <BasicPreviewPage />
    </div>
  );
};

export default BasicPreview;