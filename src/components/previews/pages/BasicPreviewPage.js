import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/basicPreview.css";
import { DownloadPDF } from "../../downloadFunctions/DownloadPDF";
import { BackButton } from "../../icons/BackButton";
import ReactDOMServer from "react-dom/server";

// ResumeHTML.js
const ResumeHTML = ({ resumeData }) => {
  return (
    <div id="resume" className="preview-container">
      <div className="personal-summary">
        <h2 style={{marginBottom: "-5px"}}>{resumeData?.personalInfo?.name}</h2>
        <p>{resumeData?.personalInfo?.email}</p>
        <p>{resumeData?.personalInfo?.phone}</p>
        <p>{resumeData?.personalInfo?.address}</p>
        <p>{resumeData?.personalInfo?.linkedin}</p>
        <p>{resumeData?.personalInfo?.website}</p>
      </div>
      {resumeData?.professionalSummary?.length ? (
        <div className="professional-summary">
          <h3 className="summary-header">PROFESSIONAL SUMMARY</h3>
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
      {resumeData?.workExperience?.length > 0 &&
      resumeData?.workExperience[0]?.company?.length > 0 ? (
        <div className="work-summary">
          <h3 className="summary-header">WORK EXPERIENCE</h3>
          <div>
            {resumeData?.workExperience?.map((exp, index) => (
              <div
                key={exp.id}
                className="summary-details"
                style={{ paddingBottom: "10px" }}
              >
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
      {resumeData?.education?.length > 0 &&
      resumeData?.education[0]?.institution?.length > 0 ? (
        <div className="educational-summary">
          <h3 className="summary-header">EDUCATION</h3>
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
      {resumeData?.skills?.length > 0 && resumeData?.skills[0] !== "" ? (
        <div className="skills-summary">
          <h3 className="summary-header">SKILLS</h3>
          <div className="skills-summary-list">
            {resumeData?.skills?.map((skill, index) =>
              skill !== "" ? (
                <span key={index} className="skill-summary-tag">
                  {skill +
                    (index + 1 !== resumeData?.skills?.length ? ", " : "")}
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
      {resumeData?.certifications?.length > 0 &&
      resumeData?.certifications[0] !== "" ? (
        <div className="certifications-summary">
          <h3 className="summary-header">CERTIFICATIONS</h3>
          <div className="certifications-summary-list">
            {resumeData?.certifications?.map((certification, index) =>
              certification !== "" ? (
                <span key={index} className="certification-summary-tag">
                  {certification +
                    (index + 1 !== resumeData?.certifications?.length
                      ? ", "
                      : "")}
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
      {resumeData?.languages?.length > 0 && resumeData?.languages[0] !== "" ? (
        <div className="languages-summary">
          <h3 className="summary-header">LANGUAGES</h3>
          <div className="languages-summary-list">
            {resumeData?.languages?.map((language, index) =>
              language !== "" ? (
                <span key={index} className="language-summary-tag">
                  {language +
                    (index + 1 !== resumeData?.languages?.length ? ", " : "")}
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

      {resumeData?.additionalInfo?.length > 0 &&
      resumeData?.additionalInfo[0] !== "" ? (
        <div className="additionalInfo-summary">
          <h3 className="summary-header">ADDITIONAL INFORMATION</h3>
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
  );
};

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

  const staticHtml = ReactDOMServer.renderToStaticMarkup(
    <ResumeHTML resumeData={resumeData} />
  );

  const htmlWithCss = `
    <html>
      <head>
        <style>
        .preview-page-buttons {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding: 20px;
        }
        .preview-container {
          padding: 20px;
          p {
            font-size: 14px;
            color: black;
            margin: 0px;
            line-height: 1.2;
          }
          .ql-editor {
            padding: 0px;
            p {
              font-size: 14px;
            }
          }
          .gray {
            color: gray;
          }
          .mb-2 {
            margin-bottom: 5px;
          }
          .ml-10 {
            margin-left: 10px;
          }
          .summary-header {
            margin-bottom: 5px;
            font-weight: 900;
          }
          .personal-summary {
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
          }
          .professional-summary {
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
          }
          .work-summary {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
            .summary-details {
              margin-bottom: 10px;
            }
            .ql-editor {
              margin-bottom: 10px;
            }
          }
          .educational-summary {
            margin-bottom: 20px;
            .summary-details {
              margin-bottom: 10px;
            }
            .education-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                margin-top: 10px;
              }

              .education-table td {
                padding: 2px 12px;
                vertical-align: top;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              }

              .education-table td:first-child {
                font-weight: bold;
                width: 30%;
                color: #333;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
              }

              .education-table td:last-child {
                width: 70%;
                color: #555;
              }
          }

          .skills-summary {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
            .skills-summary-list {
              margin-bottom: 10px;
            }
          }
          
          .certifications-summary {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
            .certifications-summary-list {
              margin-bottom: 10px;
            }
          }
          
          .languages-summary {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
            .languages-summary-list {
              margin-bottom: 10px;
            }
          }
          
          .additionalInfo-summary {
            margin-bottom: 15px;
            .additionalInfo-summary-list {
              margin-bottom: 10px;
            }
          }
          :last-child {
            border-bottom: 0px;
          }
        }
        </style>
      </head>
      <body>${staticHtml}</body>
    </html>
  `;

  return (
    <>
      <div className="preview-page-buttons">
        <BackButton onClick={() => navigate(-1)} />
        {/* Download Button - Top Right */}
        <DownloadPDF html={htmlWithCss} />
      </div>
      <div id="resume" className="preview-container">
        <div className="personal-summary">
          <h2 style={{marginBottom: "-5px"}}>{resumeData?.personalInfo?.name}</h2>
          <p>{resumeData?.personalInfo?.email}</p>
          <p>{resumeData?.personalInfo?.phone}</p>
          <p>{resumeData?.personalInfo?.address}</p>
          <p>{resumeData?.personalInfo?.linkedin}</p>
          <p>{resumeData?.personalInfo?.website}</p>
        </div>
        {resumeData?.professionalSummary?.length ? (
          <div className="professional-summary">
            <h3 className="summary-header">PROFESSIONAL SUMMARY</h3>
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
        {resumeData?.workExperience?.length > 0 &&
        resumeData?.workExperience[0]?.company?.length > 0 ? (
          <div className="work-summary">
            <h3 className="summary-header">WORK EXPERIENCE</h3>
            <div>
              {resumeData?.workExperience?.map((exp, index) => (
                <div
                  key={exp.id}
                  className="summary-details"
                  style={{ paddingBottom: "10px" }}
                >
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
        {resumeData?.education?.length > 0 &&
        resumeData?.education[0]?.institution?.length > 0 ? (
          <div className="educational-summary">
            <h3 className="summary-header">EDUCATION</h3>
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
        {resumeData?.skills?.length > 0 && resumeData?.skills[0] !== "" ? (
          <div className="skills-summary">
            <h3 className="summary-header">SKILLS</h3>
            <div className="skills-summary-list">
              {resumeData?.skills?.map((skill, index) =>
                skill !== "" ? (
                  <span key={index} className="skill-summary-tag">
                    {skill +
                      (index + 1 !== resumeData?.skills?.length ? ", " : "")}
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
        {resumeData?.certifications?.length > 0 &&
        resumeData?.certifications[0] !== "" ? (
          <div className="certifications-summary">
            <h3 className="summary-header">CERTIFICATIONS</h3>
            <div className="certifications-summary-list">
              {resumeData?.certifications?.map((certification, index) =>
                certification !== "" ? (
                  <span key={index} className="certification-summary-tag">
                    {certification +
                      (index + 1 !== resumeData?.certifications?.length
                        ? ", "
                        : "")}
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
        {resumeData?.languages?.length > 0 &&
        resumeData?.languages[0] !== "" ? (
          <div className="languages-summary">
            <h3 className="summary-header">LANGUAGES</h3>
            <div className="languages-summary-list">
              {resumeData?.languages?.map((language, index) =>
                language !== "" ? (
                  <span key={index} className="language-summary-tag">
                    {language +
                      (index + 1 !== resumeData?.languages?.length ? ", " : "")}
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

        {resumeData?.additionalInfo?.length > 0 &&
        resumeData?.additionalInfo[0] !== "" ? (
          <div className="additionalInfo-summary">
            <h3 className="summary-header">ADDITIONAL INFORMATION</h3>
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
