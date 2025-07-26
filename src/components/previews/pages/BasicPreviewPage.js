import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
          <h3>
            {resumeData?.personalInfo?.name}
          </h3>
          <p>{resumeData?.personalInfo?.email}</p>
          <p>{resumeData?.personalInfo?.phone}</p>
          <p>{resumeData?.personalInfo?.address}</p>
          <p>{resumeData?.personalInfo?.linkedin}</p>
          <p>{resumeData?.personalInfo?.website}</p>
        </div>
        {resumeData?.professionalSummary?.length ? (
          <div className="professional-summary">
            <h4 className="summary-header">
              PROFESSIONAL SUMMARY
            </h4>
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
            <h4 className="summary-header">
              WORK EXPERIENCE
            </h4>
            <div>
              {resumeData?.workExperience?.map((exp, index) => (
                <div key={exp.id} className="summary-details" style={{paddingBottom: "10px"}}>
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
            <h4 className="summary-header">
              EDUCATION
            </h4>
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
            <h4 className="summary-header">
              SKILLS
            </h4>
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
            <h4 className="summary-header">
              CERTIFICATIONS
            </h4>
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
            <h4 className="summary-header">
              LANGUAGES
            </h4>
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
            <h4 className="summary-header">
              ADDITIONAL INFORMATION
            </h4>
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
