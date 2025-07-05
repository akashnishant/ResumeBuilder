import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../../styles/basicPreview.css";
import { DownloadPDF } from "../../downloadFunctions/DownloadPDF";
import { BackButton } from "../../icons/BackButton";

const BasicPreviewPage = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("tempResumeData") === undefined ||
      localStorage.getItem("tempResumeData") === null
    ) {
      navigate("/");
    }
  }, []);

  let details = JSON.parse(localStorage.getItem("tempResumeData"));
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: details?.personalInfo?.fullName,
      email: details?.personalInfo?.email,
      phone: details?.personalInfo?.phone,
      address: details?.personalInfo?.address,
      linkedin: details?.personalInfo?.linkedin,
      website: details?.personalInfo?.website,
    },
    professionalSummary: details?.summary,
    workExperience: details?.experience,
    education: details?.education,
    certifications: details?.certifications,
    languages: details?.languages,
    skills: details?.skills,
  });

  return (
    <div className="resume-container basic-preview-page">
      <BackButton onClick={() => navigate(-1)} />
      {/* Download Button - Top Right */}
      <DownloadPDF />
      <div id="resume" className="resume-content">
        {/* Personal Information Section */}
        <section className="resume-section personal-info">
          <div className="personal-info-section-header">
            <h1 className="name">{resumeData?.personalInfo?.name}</h1>
          </div>

          <div className="contact-info">
            <p>{resumeData?.personalInfo?.email}</p>
            <p>{resumeData?.personalInfo?.phone}</p>
            <p>{resumeData?.personalInfo?.address}</p>
            <p>{resumeData?.personalInfo?.linkedin}</p>
            <p>{resumeData?.personalInfo?.website}</p>
          </div>
        </section>

        {/* Professional Summary Section */}
        {resumeData?.professionalSummary?.length ? <section className="resume-section">
          <div className="section-header">
            <h2>Professional Summary</h2>
          </div>

          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{
              __html: resumeData?.professionalSummary,
            }}
          />
        </section> : ""}

        {/* Work Experience Section */}
        {resumeData?.workExperience?.length ? <section className="resume-section">
          <div className="section-header">
            <h2>Work Experience</h2>
          </div>

          <div className="experience-list">
            {resumeData?.workExperience?.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <span className="duration">{exp.duration}</span>
                </div>
                <h4>{exp.company}</h4>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: exp.description,
                  }}
                />
              </div>
            ))}
          </div>
        </section> : ""}

        {/* Education Section */}
        {resumeData?.education?.length ? <section className="resume-section">
          <div className="section-header">
            <h2>Education</h2>
          </div>

          <div className="education-list">
            {resumeData?.education?.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="education-header">
                  <h3>{edu.degree}</h3>
                  <span className="year">{edu.year}</span>
                </div>
                <h4>{edu.institution}</h4>
                <p>{edu.field}</p>
                <p>GPA: {edu.gpa}</p>
              </div>
            ))}
          </div>
        </section> : ""}

        {/* Skills Section */}
        {resumeData?.skills?.length && resumeData?.skills[0]?.length ? <section className="resume-section">
          <div className="section-header">
            <h2>Skills</h2>
          </div>

          <div className="skills-list">
            {resumeData?.skills?.map((skill, index) => (
              skill !== "" ? <span key={index} className="skill-tag">
                {skill}
              </span>
              : ""
            ))}
          </div>
        </section> : ""}

        {/* Certifications Section */}
        {resumeData?.certifications?.length && resumeData?.certifications[0]?.length ? <section className="resume-section">
          <div className="section-header">
            <h2>Certifications</h2>
          </div>

          <div className="skills-list">
            {resumeData?.certifications?.map((certifications, index) => (
              <span key={index} className="skill-tag">
                {certifications}
              </span>
            ))}
          </div>
        </section> : ""}

        {/* Certifications Section */}
        {/* <section className="resume-section">
          <div className="section-header">
            <h2>Certifications</h2>
            {!props.isPreview && <button 
              className="edit-btn"
              onClick={() => handleEdit('certifications')}
            >
              Edit
            </button>}
          </div>
          
          {editingSection === 'certifications' ? (
            <div className="edit-form">
              {tempData.map((cert, index) => (
                <div key={cert.id} className="certification-item-edit">
                  <div className="form-group">
                    <label>Certification Name:</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateArrayItem(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuer:</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateArrayItem(index, 'issuer', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Year:</label>
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => updateArrayItem(index, 'year', e.target.value)}
                    />
                  </div>
                  <button 
                    className="remove-btn-template"
                    onClick={() => removeArrayItem(cert.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                className="add-btn"
                onClick={() => addArrayItem({
                  name: 'Certification Name',
                  issuer: 'Issuing Organization',
                  year: 'Year'
                })}
              >
                Add Certification
              </button>
              <div className="form-actions">
                <button className="save-btn" onClick={() => handleSave('certifications')}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="certifications-list">
              {resumeData?.certifications?.map(cert => (
                <div key={cert.id} className="certification-item">
                  <div className="certification-header">
                    <h3>{cert.name}</h3>
                    <span className="year">{cert.year}</span>
                  </div>
                  <h4>{cert.issuer}</h4>
                </div>
              ))}
            </div>
          )}
        </section> */}

        {/* Languages Section */}
        {resumeData?.languages?.length && resumeData?.languages[0]?.length ? <section className="resume-section">
          <div className="section-header">
            <h2>Languages</h2>
          </div>

          <div className="skills-list">
            {resumeData?.languages?.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section> : ""}
      </div>
    </div>
  );
};

export default BasicPreviewPage;
