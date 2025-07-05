import React, { useState } from "react";
import RefreshButton from "./icons/RefreshButton";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

const ResumeForm = ({ onSubmit, initialData = {} }) => {
  let details = JSON.parse(localStorage.getItem("tempResumeData"));
  if (details !== null && details !== undefined) {
    initialData = details;
  }
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: initialData.personalInfo?.fullName || "",
      email: initialData.personalInfo?.email || "",
      phone: initialData.personalInfo?.phone || "",
      address: initialData.personalInfo?.address || "",
      linkedin: initialData.personalInfo?.linkedin || "",
      website: initialData.personalInfo?.website || "",
    },
    summary: initialData.summary || "",
    experience: initialData.experience || [
      {
        company: "",
        position: "",
        duration: "",
        description: "",
      },
    ],
    education: initialData.education || [
      {
        institution: "",
        degree: "",
        field: "",
        year: "",
        gpa: "",
      },
    ],
    skills: initialData.skills || [""],
    certifications: initialData.certifications || [""],
    languages: initialData.languages || [""],
    additionalInfo: initialData.additionalInfo || "",
  });

  const handleInputChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (index !== null) {
        // Handle array fields
        const updatedArray = [...prev[section]];
        if (typeof updatedArray[index] === "object") {
          updatedArray[index] = { ...updatedArray[index], [field]: value };
        } else {
          updatedArray[index] = value;
        }
        return { ...prev, [section]: updatedArray };
      } else if (section === "personalInfo") {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value },
        };
      } else {
        return { ...prev, [section]: value };
      }
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const fetchMonth = (str) => {
    let month = "";
    if (str?.length) {
      switch (str) {
        case "01": {
          month = "Jan";
          break;
        }
        case "02": {
          month = "Feb";
          break;
        }
        case "03": {
          month = "Mar";
          break;
        }
        case "04": {
          month = "Apr";
          break;
        }
        case "05": {
          month = "May";
          break;
        }
        case "06": {
          month = "Jun";
          break;
        }
        case "07": {
          month = "Jul";
          break;
        }
        case "08": {
          month = "Aug";
          break;
        }
        case "09": {
          month = "Sep";
          break;
        }
        case "10": {
          month = "Oct";
          break;
        }
        case "11": {
          month = "Nov";
          break;
        }
        case "12": {
          month = "Dec";
          break;
        }
      }
    }
    return month;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData?.education?.length) {
      let edCount = 1;
      formData?.education?.forEach((ed) => {
        ed.id = edCount;
        edCount++;
      });
    }
    if (formData?.experience?.length) {
      let expCount = 1;
      formData?.experience?.forEach((exp) => {
        exp.id = expCount;
        expCount++;
      });
    }
    onSubmit(formData);
  };

  const handleReset = () => {
    const details = JSON.parse(localStorage.getItem("tempResumeData"));
    if (details !== undefined && details !== null) {
      localStorage.removeItem("tempResumeData");
      setFormData({
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          website: "",
        },
        summary: "",
        experience: [
          {
            company: "",
            position: "",
            duration: "",
            description: "",
          },
        ],
        education: [
          {
            institution: "",
            degree: "",
            field: "",
            year: "",
            gpa: "",
          },
        ],
        skills: [""],
        certifications: [""],
        languages: [""],
      });
    }
  };

  return (
    <div className="resume-form">
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        {
          <div>
            <RefreshButton onClick={handleReset} />
          </div>
        }
        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.personalInfo.fullName}
              onChange={(e) =>
                handleInputChange("personalInfo", "fullName", e.target.value)
              }
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.personalInfo.email}
              onChange={(e) =>
                handleInputChange("personalInfo", "email", e.target.value)
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.personalInfo.phone}
              onChange={(e) =>
                handleInputChange("personalInfo", "phone", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.personalInfo.address}
              onChange={(e) =>
                handleInputChange("personalInfo", "address", e.target.value)
              }
            />
            <input
              type="url"
              placeholder="LinkedIn Profile"
              value={formData.personalInfo.linkedin}
              onChange={(e) =>
                handleInputChange("personalInfo", "linkedin", e.target.value)
              }
            />
            <input
              type="url"
              placeholder="Personal Website"
              value={formData.personalInfo.website}
              onChange={(e) =>
                handleInputChange("personalInfo", "website", e.target.value)
              }
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="form-section">
          <h3>Professional Summary</h3>
          <FroalaEditorComponent
            tag="textarea"
            model={formData.summary || ""}
            onModelChange={(content) =>
              handleInputChange("summary", null, content)
            }
            config={{
              placeholderText: "Write a brief professional summary...",

              // Enhanced toolbar with more options
              toolbarButtons: {
                moreText: {
                  buttons: [
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "subscript",
                    "superscript",
                    "fontFamily",
                    "fontSize",
                    "textColor",
                    "backgroundColor",
                    "inlineClass",
                    "inlineStyle",
                    "clearFormatting",
                  ],
                },
                moreParagraph: {
                  buttons: [
                    "alignLeft",
                    "alignCenter",
                    "alignRight",
                    "alignJustify",
                    "formatOL",
                    "formatUL",
                    "paragraphFormat",
                    "paragraphStyle",
                    "lineHeight",
                    "outdent",
                    "indent",
                    "quote",
                  ],
                },
                moreRich: {
                  buttons: [
                    "insertLink",
                    "insertTable",
                    "emoticons",
                    "fontAwesome",
                    "specialCharacters",
                    "embedly",
                    "insertFile",
                    "insertHR",
                  ],
                },
                moreMisc: {
                  buttons: [
                    "undo",
                    "redo",
                    "fullscreen",
                    "print",
                    "getPDF",
                    "spellChecker",
                    "selectAll",
                    "html",
                    "help",
                  ],
                },
              },

              // Alternative: Simple toolbar with commonly used options
              // toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', '|', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|', 'formatUL', 'formatOL', 'outdent', 'indent', '|', 'insertLink', 'insertTable', '|', 'undo', 'redo', 'clearFormatting'],

              // Font options
              fontFamily: {
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "Times New Roman,Times,serif": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana",
              },

              fontSize: [
                "8",
                "9",
                "10",
                "11",
                "12",
                "14",
                "16",
                "18",
                "24",
                "30",
                "36",
                "48",
                "60",
                "72",
                "96",
              ],

              // Paragraph formats
              paragraphFormat: {
                N: "Normal",
                H1: "Heading 1",
                H2: "Heading 2",
                H3: "Heading 3",
                H4: "Heading 4",
                PRE: "Code",
              },

              // Colors
              colorsDefaultTab: "background",
              colorsText: [
                "#61BD6D",
                "#1ABC9C",
                "#54ACD2",
                "#2C82C9",
                "#9365B8",
                "#475577",
                "#CCCCCC",
                "#41A85F",
                "#00A885",
                "#3D8EB9",
                "#2969B0",
                "#553982",
                "#28324E",
                "#000000",
                "#F7DA64",
                "#FBA026",
                "#EB6B56",
                "#E25041",
                "#A38F84",
                "#EFEFEF",
                "#FFFFFF",
                "#FAC51C",
                "#F37934",
                "#D14841",
                "#B8312F",
                "#7C706B",
                "#D1D5D8",
                "REMOVE",
              ],
              colorsBackground: [
                "#61BD6D",
                "#1ABC9C",
                "#54ACD2",
                "#2C82C9",
                "#9365B8",
                "#475577",
                "#CCCCCC",
                "#41A85F",
                "#00A885",
                "#3D8EB9",
                "#2969B0",
                "#553982",
                "#28324E",
                "#000000",
                "#F7DA64",
                "#FBA026",
                "#EB6B56",
                "#E25041",
                "#A38F84",
                "#EFEFEF",
                "#FFFFFF",
                "#FAC51C",
                "#F37934",
                "#D14841",
                "#B8312F",
                "#7C706B",
                "#D1D5D8",
                "REMOVE",
              ],

              // Table options
              tableStyles: {
                "fr-table-blue": "Blue",
                "fr-table-red": "Red",
                "fr-table-dark": "Dark",
              },

              // List options
              listAdvancedTypes: true,

              // Size and behavior
              heightMin: 150,
              heightMax: 400,
              charCounterCount: true,
              charCounterMax: 5000,

              // Quick insert
              quickInsertButtons: ["image", "table", "ul", "ol", "hr"],

              // Other useful options
              linkAlwaysBlank: true,
              linkAutoPrefix: "https://",
              tabSpaces: 4,
              shortcutsEnabled: [
                "show",
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "indent",
                "outdent",
              ],

              // Remove attribution (for paid version)
              attribution: false,

              // Add your license key here (for paid version)
              // key: 'YOUR_LICENSE_KEY'
            }}
          />
        </div>

        {/* Experience */}
        <div className="form-section">
          <h3>Work Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "company",
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "position",
                      e.target.value,
                      index
                    )
                  }
                />
                {/* <input
                  type="month"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "startDate",
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type="month"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "endDate",
                      e.target.value,
                      index
                    )
                  }
                /> */}
              </div>
              <div className="form-grid" style={{marginBottom:"17px"}}>
                <input
                  type="text"
                  placeholder="Jan 2000 - Jan 2025"
                  value={exp.duration}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      "duration",
                      e.target.value,
                      index
                    )
                  }
                />
              </div>
              <FroalaEditorComponent
                tag="textarea"
                model={exp.description || ""}
                onModelChange={(content) =>
                  handleInputChange("experience",
                    "description",
                    content,
                    index)
                }
                config={{
                  placeholderText: "Job description and achievements...",

                  // Enhanced toolbar with more options
                  toolbarButtons: {
                    moreText: {
                      buttons: [
                        "bold",
                        "italic",
                        "underline",
                        "strikeThrough",
                        "subscript",
                        "superscript",
                        "fontFamily",
                        "fontSize",
                        "textColor",
                        "backgroundColor",
                        "inlineClass",
                        "inlineStyle",
                        "clearFormatting",
                      ],
                    },
                    moreParagraph: {
                      buttons: [
                        "alignLeft",
                        "alignCenter",
                        "alignRight",
                        "alignJustify",
                        "formatOL",
                        "formatUL",
                        "paragraphFormat",
                        "paragraphStyle",
                        "lineHeight",
                        "outdent",
                        "indent",
                        "quote",
                      ],
                    },
                    moreRich: {
                      buttons: [
                        "insertLink",
                        "insertTable",
                        "emoticons",
                        "fontAwesome",
                        "specialCharacters",
                        "embedly",
                        "insertFile",
                        "insertHR",
                      ],
                    },
                    moreMisc: {
                      buttons: [
                        "undo",
                        "redo",
                        "fullscreen",
                        "print",
                        "getPDF",
                        "spellChecker",
                        "selectAll",
                        "html",
                        "help",
                      ],
                    },
                  },

                  // Alternative: Simple toolbar with commonly used options
                  // toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', '|', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|', 'formatUL', 'formatOL', 'outdent', 'indent', '|', 'insertLink', 'insertTable', '|', 'undo', 'redo', 'clearFormatting'],

                  // Font options
                  fontFamily: {
                    "Arial,Helvetica,sans-serif": "Arial",
                    "Georgia,serif": "Georgia",
                    "Impact,Charcoal,sans-serif": "Impact",
                    "Tahoma,Geneva,sans-serif": "Tahoma",
                    "Times New Roman,Times,serif": "Times New Roman",
                    "Verdana,Geneva,sans-serif": "Verdana",
                  },

                  fontSize: [
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "14",
                    "16",
                    "18",
                    "24",
                    "30",
                    "36",
                    "48",
                    "60",
                    "72",
                    "96",
                  ],

                  // Paragraph formats
                  paragraphFormat: {
                    N: "Normal",
                    H1: "Heading 1",
                    H2: "Heading 2",
                    H3: "Heading 3",
                    H4: "Heading 4",
                    PRE: "Code",
                  },

                  // Colors
                  colorsDefaultTab: "background",
                  colorsText: [
                    "#61BD6D",
                    "#1ABC9C",
                    "#54ACD2",
                    "#2C82C9",
                    "#9365B8",
                    "#475577",
                    "#CCCCCC",
                    "#41A85F",
                    "#00A885",
                    "#3D8EB9",
                    "#2969B0",
                    "#553982",
                    "#28324E",
                    "#000000",
                    "#F7DA64",
                    "#FBA026",
                    "#EB6B56",
                    "#E25041",
                    "#A38F84",
                    "#EFEFEF",
                    "#FFFFFF",
                    "#FAC51C",
                    "#F37934",
                    "#D14841",
                    "#B8312F",
                    "#7C706B",
                    "#D1D5D8",
                    "REMOVE",
                  ],
                  colorsBackground: [
                    "#61BD6D",
                    "#1ABC9C",
                    "#54ACD2",
                    "#2C82C9",
                    "#9365B8",
                    "#475577",
                    "#CCCCCC",
                    "#41A85F",
                    "#00A885",
                    "#3D8EB9",
                    "#2969B0",
                    "#553982",
                    "#28324E",
                    "#000000",
                    "#F7DA64",
                    "#FBA026",
                    "#EB6B56",
                    "#E25041",
                    "#A38F84",
                    "#EFEFEF",
                    "#FFFFFF",
                    "#FAC51C",
                    "#F37934",
                    "#D14841",
                    "#B8312F",
                    "#7C706B",
                    "#D1D5D8",
                    "REMOVE",
                  ],

                  // Table options
                  tableStyles: {
                    "fr-table-blue": "Blue",
                    "fr-table-red": "Red",
                    "fr-table-dark": "Dark",
                  },

                  // List options
                  listAdvancedTypes: true,

                  // Size and behavior
                  heightMin: 150,
                  heightMax: 400,
                  charCounterCount: true,
                  charCounterMax: 5000,

                  // Quick insert
                  quickInsertButtons: ["image", "table", "ul", "ol", "hr"],

                  // Other useful options
                  linkAlwaysBlank: true,
                  linkAutoPrefix: "https://",
                  tabSpaces: 4,
                  shortcutsEnabled: [
                    "show",
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "indent",
                    "outdent",
                  ],

                  // Remove attribution (for paid version)
                  attribution: false,

                  // Add your license key here (for paid version)
                  // key: 'YOUR_LICENSE_KEY'
                }}
              />
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("experience", index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("experience", {
                company: "",
                position: "",
                duration: "",
                description: "",
              })
            }
            className="add-btn"
          >
            Add Experience
          </button>
        </div>

        {/* Education */}
        <div className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={edu.institution}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "institution",
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "degree",
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "field",
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      "year",
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="GPA / Percentage"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleInputChange("education", "gpa", e.target.value, index)
                  }
                />
              </div>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("education", index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("education", {
                institution: "",
                degree: "",
                field: "",
                year: "",
              })
            }
            className="add-btn"
          >
            Add Education
          </button>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h3>Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <input
                type="text"
                placeholder="Enter a skill"
                value={skill}
                onChange={(e) =>
                  handleInputChange("skills", null, e.target.value, index)
                }
              />
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("skills", index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("skills", "")}
            className="add-btn"
          >
            Add Skill
          </button>
        </div>

        {/* Certifications */}
        <div className="form-section">
          <h3>Certifications</h3>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <input
                type="text"
                placeholder="Certification name"
                value={cert}
                onChange={(e) =>
                  handleInputChange(
                    "certifications",
                    null,
                    e.target.value,
                    index
                  )
                }
              />
              {formData.certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("certifications", index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("certifications", "")}
            className="add-btn"
          >
            Add Certification
          </button>
        </div>

        {/* Languages */}
        <div className="form-section">
          <h3>Languages</h3>
          {formData.languages.map((skill, index) => (
            <div key={index} className="skill-item">
              <input
                type="text"
                placeholder="Enter a language"
                value={skill}
                onChange={(e) =>
                  handleInputChange("languages", null, e.target.value, index)
                }
              />
              {formData.languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("languages", index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("languages", "")}
            className="add-btn"
          >
            Add Language
          </button>
        </div>

        {/* Additional Info */}
        <div className="form-section">
          <h3>Additional Information</h3>
          <FroalaEditorComponent
            tag="textarea"
            model={formData.additionalInfo || ""}
            onModelChange={(content) =>
              handleInputChange("additionalInfo", null, content)
            }
            config={{
              placeholderText: "Add more information (if any)...",

              // Enhanced toolbar with more options
              toolbarButtons: {
                moreText: {
                  buttons: [
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "subscript",
                    "superscript",
                    "fontFamily",
                    "fontSize",
                    "textColor",
                    "backgroundColor",
                    "inlineClass",
                    "inlineStyle",
                    "clearFormatting",
                  ],
                },
                moreParagraph: {
                  buttons: [
                    "alignLeft",
                    "alignCenter",
                    "alignRight",
                    "alignJustify",
                    "formatOL",
                    "formatUL",
                    "paragraphFormat",
                    "paragraphStyle",
                    "lineHeight",
                    "outdent",
                    "indent",
                    "quote",
                  ],
                },
                moreRich: {
                  buttons: [
                    "insertLink",
                    "insertTable",
                    "emoticons",
                    "fontAwesome",
                    "specialCharacters",
                    "embedly",
                    "insertFile",
                    "insertHR",
                  ],
                },
                moreMisc: {
                  buttons: [
                    "undo",
                    "redo",
                    "fullscreen",
                    "print",
                    "getPDF",
                    "spellChecker",
                    "selectAll",
                    "html",
                    "help",
                  ],
                },
              },

              // Alternative: Simple toolbar with commonly used options
              // toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', '|', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|', 'formatUL', 'formatOL', 'outdent', 'indent', '|', 'insertLink', 'insertTable', '|', 'undo', 'redo', 'clearFormatting'],

              // Font options
              fontFamily: {
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "Times New Roman,Times,serif": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana",
              },

              fontSize: [
                "8",
                "9",
                "10",
                "11",
                "12",
                "14",
                "16",
                "18",
                "24",
                "30",
                "36",
                "48",
                "60",
                "72",
                "96",
              ],

              // Paragraph formats
              paragraphFormat: {
                N: "Normal",
                H1: "Heading 1",
                H2: "Heading 2",
                H3: "Heading 3",
                H4: "Heading 4",
                PRE: "Code",
              },

              // Colors
              colorsDefaultTab: "background",
              colorsText: [
                "#61BD6D",
                "#1ABC9C",
                "#54ACD2",
                "#2C82C9",
                "#9365B8",
                "#475577",
                "#CCCCCC",
                "#41A85F",
                "#00A885",
                "#3D8EB9",
                "#2969B0",
                "#553982",
                "#28324E",
                "#000000",
                "#F7DA64",
                "#FBA026",
                "#EB6B56",
                "#E25041",
                "#A38F84",
                "#EFEFEF",
                "#FFFFFF",
                "#FAC51C",
                "#F37934",
                "#D14841",
                "#B8312F",
                "#7C706B",
                "#D1D5D8",
                "REMOVE",
              ],
              colorsBackground: [
                "#61BD6D",
                "#1ABC9C",
                "#54ACD2",
                "#2C82C9",
                "#9365B8",
                "#475577",
                "#CCCCCC",
                "#41A85F",
                "#00A885",
                "#3D8EB9",
                "#2969B0",
                "#553982",
                "#28324E",
                "#000000",
                "#F7DA64",
                "#FBA026",
                "#EB6B56",
                "#E25041",
                "#A38F84",
                "#EFEFEF",
                "#FFFFFF",
                "#FAC51C",
                "#F37934",
                "#D14841",
                "#B8312F",
                "#7C706B",
                "#D1D5D8",
                "REMOVE",
              ],

              // Table options
              tableStyles: {
                "fr-table-blue": "Blue",
                "fr-table-red": "Red",
                "fr-table-dark": "Dark",
              },

              // List options
              listAdvancedTypes: true,

              // Size and behavior
              heightMin: 150,
              heightMax: 400,
              charCounterCount: true,
              charCounterMax: 5000,

              // Quick insert
              quickInsertButtons: ["image", "table", "ul", "ol", "hr"],

              // Other useful options
              linkAlwaysBlank: true,
              linkAutoPrefix: "https://",
              tabSpaces: 4,
              shortcutsEnabled: [
                "show",
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "indent",
                "outdent",
              ],

              // Remove attribution (for paid version)
              attribution: false,

              // Add your license key here (for paid version)
              // key: 'YOUR_LICENSE_KEY'
            }}
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
