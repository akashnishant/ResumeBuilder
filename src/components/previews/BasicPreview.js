import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicPreviewPage from './pages/BasicPreviewPage';

const BasicPreview = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('tempResumeData') === undefined || localStorage.getItem('tempResumeData') === null) {
      navigate('/');
    }
  }, [])

  return (
    <BasicPreviewPage />
  );
};

export default BasicPreview;