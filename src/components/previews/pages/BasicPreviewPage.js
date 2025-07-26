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
    additionalInfo: details?.additionalInfo,
  });

  return (
    <>
      <div className="preview-page-buttons">
        <BackButton onClick={() => navigate(-1)} />
        {/* Download Button - Top Right */}
        <DownloadPDF />
      </div>
      <div id="resume" className="preview-container">
        <div className="personal-summary">
          <p>
            <b>{resumeData?.personalInfo?.name}</b>
          </p>
          <p>{resumeData?.personalInfo?.email}</p>
          <p>{resumeData?.personalInfo?.phone}</p>
          <p>{resumeData?.personalInfo?.address}</p>
          <p>{resumeData?.personalInfo?.linkedin}</p>
          <p>{resumeData?.personalInfo?.website}</p>
        </div>
        {resumeData?.professionalSummary?.length ? (
          <div className="professional-summary">
            <p className="summary-header">
              <b>PROFESSIONAL SUMMARY</b>
            </p>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: resumeData?.professionalSummary,
              }}
            />
          </div>
        ) : (
          ""
        )}
        {resumeData?.workExperience?.length ? (
          <div className="work-summary">
            <p className="summary-header">
              <b>WORK EXPERIENCE</b>
            </p>
            <div>
              {resumeData?.workExperience?.map((exp, index) => (
                <div key={exp.id} className="summary-details">
                  <p>
                    <b>
                      {index + 1}. {exp.position}
                    </b>
                  </p>
                  <p className="gray">{exp.duration}</p>
                  <p className="mb-2">{exp.company}</p>
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: exp.description,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {resumeData?.education?.length ? (
          <div className="educational-summary">
            <p className="summary-header">
              <b>EDUCATION</b>
            </p>
            <div>
              {resumeData?.education?.map((edu) => (
                <div>
                  <div key={edu.id} className="summary-details">
                    <table className="education-table">
                      <tbody>
                        <tr>
                          <td>Degree</td>
                          <td>{edu?.degree}</td>
                        </tr>
                        <tr>
                          <td>Year</td>
                          <td>{edu?.year}</td>
                        </tr>
                        <tr>
                          <td>Institution</td>
                          <td>{edu?.institution}</td>
                        </tr>
                        <tr>
                          <td>Field / Stream</td>
                          <td>{edu?.field}</td>
                        </tr>
                        <tr>
                          <td>GPA / Percentage</td>
                          <td>{edu?.gpa}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {resumeData?.skills?.length ? (
          <div className="skills-summary">
            <p className="summary-header">
              <b>SKILLS</b>
            </p>
            <div className="skills-summary-list">
              {resumeData?.skills?.map((skill, index) =>
                skill !== "" ? (
                  <span key={index} className="skill-summary-tag">
                    {skill + (index+1 !== resumeData?.skills?.length ? ", " : "")}
                  </span>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {resumeData?.certifications?.length ? (
          <div className="certifications-summary">
            <p className="summary-header">
              <b>CERTIFICATIONS</b>
            </p>
            <div className="certifications-summary-list">
              {resumeData?.certifications?.map((certification, index) =>
                certification !== "" ? (
                  <span key={index} className="certification-summary-tag">
                    {certification + (index+1 !== resumeData?.certifications?.length ? ", " : "")}
                  </span>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {resumeData?.languages?.length ? (
          <div className="languages-summary">
            <p className="summary-header">
              <b>LANGUAGES</b>
            </p>
            <div className="languages-summary-list">
              {resumeData?.languages?.map((language, index) =>
                language !== "" ? (
                  <span key={index} className="language-summary-tag">
                    {language + (index+1 !== resumeData?.languages?.length ? ", " : "")}
                  </span>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        
        {resumeData?.additionalInfo?.length ? (
          <div className="additionalInfo-summary">
            <p className="summary-header">
              <b>ADDITIONAL INFORMATION</b>
            </p>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: resumeData?.additionalInfo,
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default BasicPreviewPage;
