import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/basicPreview.css";
import { DownloadPDF } from "../../downloadFunctions/DownloadPDF";
import { BackButton } from "../../icons/BackButton";
import ReactDOMServer from "react-dom/server";
import ButtonSelector from "../../common/ButtonSelector";
import ClassicPreviewPage from "./ClassicPreview";
import ModernPreviewPage from "./ModernPreview";

// ResumeHTML.js
const ResumeHTML = ({ resumeData }) => {
  return (
    <div
      id="resume"
      className={`preview-container ${resumeData?.selectedTemplate
        .replace(" ", "")
        .toLowerCase()}`}
    >
      {resumeData?.selectedTemplate !== "Modern" && <ClassicPreviewPage />}
      {resumeData?.selectedTemplate === "Modern" && <ModernPreviewPage />}
    </div>
  );
};

const BasicPreviewPage = (props) => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");

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
    selectedTemplate: selectedTemplate
  });

  const staticHtml = ReactDOMServer.renderToStaticMarkup(
    <ResumeHTML resumeData={resumeData} />
  );

  const htmlWithCss = `
    <html>
      <head>
        <style>
        * {
          box-sizing: border-box;
        }
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

        .lclassico {
          .personal-summary {
            text-align: left;
          }
        }
        .rclassico {
          .personal-summary {
            text-align: right;
          }
        }
        .modern {
          display: flex;
          justify-content: center;
          .summary-header {
            border-bottom: 1px solid black;
            width: fit-content;
          }
          .left-container {
            border-right: 1px solid lightblue;
            margin-right: 10px;
            padding-right: 10px;
            .personal-summary {
              text-align: left;
              p {
                line-height: 1.5;
              }
              .square-container {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start; /* align to left */
                padding: 0px;
                box-sizing: border-box;
              }

              .initials-square {
                width: 50%;
                aspect-ratio: 1 / 1; /* ensures it's a square */
                background-color: black;
                color: white;
                font-size: 55px; /* responsive large font */
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
                box-sizing: border-box;
              }
            }
          }
        }
        @media print {
        * {
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
          }
          h1, h2 {
            page-break-after: avoid;
          }
          .preview-container {
            padding: 0
          }
        }
        </style>
      </head>
      <body>${staticHtml}</body>
    </html>
  `;

  useEffect(() => {
    if (
      localStorage.getItem("tempResumeData") === undefined ||
      localStorage.getItem("tempResumeData") === null
    ) {
      navigate("/");
    } else {
      setResumeData({ ...resumeData, selectedTemplate: selectedTemplate })
    }
  }, [selectedTemplate]);

  return (
    <>
      <div className="preview-page-buttons">
        <BackButton onClick={() => navigate(-1)} />
        {/* Download Button - Top Right */}
        <DownloadPDF html={htmlWithCss} name={resumeData?.personalInfo?.name} />
      </div>
      <div>
        <ButtonSelector
          selected={selectedTemplate}
          setSelected={setSelectedTemplate}
        />
      </div>
      <div
        id="resume"
        className={`preview-container ${selectedTemplate
          .replace(" ", "")
          .toLowerCase()}`}
      >
        {selectedTemplate !== "Modern" && <ClassicPreviewPage />}
        {selectedTemplate === "Modern" && <ModernPreviewPage />}
      </div>
    </>
  );
};

export default BasicPreviewPage;
