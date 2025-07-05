import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/resumeEditor.css';
import BasicModal from '../modals/BasicModal';

const BasicPreview = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('tempResumeData') === undefined || localStorage.getItem('tempResumeData') === null) {
      navigate('/');
    }
  }, [])
  let details = JSON.parse(localStorage.getItem('tempResumeData'));
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: details?.personalInfo?.fullName,
      email: details?.personalInfo?.email,
      phone: details?.personalInfo?.phone,
      address: details?.personalInfo?.address,
      linkedin: details?.personalInfo?.linkedin,
      website: details?.personalInfo?.website
    },
    professionalSummary: details?.summary,
    workExperience: details?.experience,
    education: details?.education,
    certifications: details?.certifications,
    languages: details?.languages,
    skills: details?.skills,
  });

  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState({});

  const handleEdit = (section, data = null) => {
    setEditingSection(section);
    if (data) {
      setTempData(data);
    } else {
      setTempData(resumeData[section]);
    }
  };

  const handleSave = (section) => {
    setResumeData(prev => ({
      ...prev,
      [section]: tempData
    }));
    setEditingSection(null);
    setTempData({});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData({});
  };

  const handleDownload = () => {
    // Implement download functionality here
    // This could generate PDF or trigger print dialog
    window.print();
  };

  const updateTempData = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateArrayItem = (index, field, value) => {
    const updatedArray = [...tempData];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    setTempData(updatedArray);
  };

  const addArrayItem = (newItem) => {
    const currentArray = Array.isArray(tempData) ? tempData : [];
    const newId = currentArray.length > 0 ? Math.max(...currentArray.map(item => item.id || 0)) + 1 : 1;
    setTempData([...currentArray, { ...newItem, id: newId }]);
  };

  const removeArrayItem = (id) => {
    if (Array.isArray(tempData)) {
      setTempData(tempData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="resume-container">
      <BasicModal />
    </div>
  );
};

export default BasicPreview;