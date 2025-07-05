import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "../../styles/resumeEditor.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { BackButton } from "../icons/BackButton";

const ResumeEditor = (props) => {
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
      name: details?.personalInfo?.fullName || "",
      email: details?.personalInfo?.email || "",
      phone: details?.personalInfo?.phone || "",
      address: details?.personalInfo?.address || "",
      linkedin: details?.personalInfo?.linkedin || "",
      website: details?.personalInfo?.website || "",
    },
    professionalSummary: details?.summary || "",
    workExperience: details?.experience || [],
    education: details?.education || [],
    certifications: details?.certifications || [],
    languages: details?.languages || [],
    skills: details?.skills || [],
  });

  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState({});

  const handleEdit = (section, data = null) => {
    setEditingSection(section);

    if (data) {
      setTempData(data);
    } else {
      const sectionData = resumeData[section];

      if(section === "skills" || section === "certifications" || section === "languages") {
        setTempData(sectionData || "");
      }
      else if (section === "workExperience" && Array.isArray(sectionData)) {
        const deepCopy = sectionData.map((item, index) => {

          return {
            ...item,
            description: item.description || "",
          };
        });

        setTempData(deepCopy);
      } else if (Array.isArray(sectionData)) {
        const deepCopy = sectionData.map((item) => ({ ...item }));
        setTempData(deepCopy);
      } else if (typeof sectionData === "object" && sectionData !== null) {
        setTempData({ ...sectionData });
      } else {
        setTempData(sectionData || "");
      }
    }
  };

  const handleSave = (section) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: tempData,
    }));
    if (section === "personalInfo" && details !== undefined) {
      delete details.personalInfo;
      details.personalInfo = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    } else if (section === "professionalSummary" && details !== undefined) {
      delete details.summary;
      details.summary = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    } else if (section === "workExperience" && details !== undefined) {
      delete details.experience;
      details.experience = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    } else if (section === "education" && details !== undefined) {
      delete details.education;
      details.education = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    } else if (section === "skills" && details !== undefined) {
      delete details.skills;
      details.skills = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    } else if (section === "certifications" && details !== undefined) {
      delete details.certifications;
      details.certifications = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    } else if (section === "languages" && details !== undefined) {
      delete details.languages;
      details.languages = tempData;
      localStorage.setItem("tempResumeData", JSON.stringify(details));
    }

    setEditingSection(null);
    setTempData({});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData({});
  };

  const handlePreview = () => {
    // Implement download functionality here
    // This could generate PDF or trigger print dialog
    navigate("/basicPreview");
  };

  const updateTempData = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayItem = (index, field, value) => {
    const updatedArray = [...tempData];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value,
    };
    setTempData(updatedArray);
  };

  const addArrayItem = (newItem) => {
    const currentArray = Array.isArray(tempData) ? tempData : [];
    const newId =
      currentArray.length > 0
        ? Math.max(...currentArray.map((item) => item.id || 0)) + 1
        : 1;
    setTempData([...currentArray, { ...newItem, id: newId }]);
  };

  const removeArrayItem = (id) => {
    if (Array.isArray(tempData)) {
      setTempData(tempData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="resume-container">
      {!props.isPreview && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BackButton onClick={() => navigate(-1)} />
          {/* Preview Button - Top Right */}
          <button className="download-btn-template" onClick={handlePreview}>
            Preview & Download
          </button>
        </div>
      )}

      <div className="resume-content">
        {/* Personal Information Section */}
        <section className="resume-section personal-info">
          <div className="section-header personal-info-section-header">
            <h1 className="name">{resumeData?.personalInfo?.name}</h1>
            {!props.isPreview && (
              <button
                className="edit-btn"
                onClick={() => handleEdit("personalInfo")}
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === "personalInfo" ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={tempData.name || ""}
                  onChange={(e) => updateTempData("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={tempData.email || ""}
                  onChange={(e) => updateTempData("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  value={tempData.phone || ""}
                  onChange={(e) => updateTempData("phone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={tempData.address || ""}
                  onChange={(e) => updateTempData("address", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>LinkedIn:</label>
                <input
                  type="text"
                  value={tempData.linkedin || ""}
                  onChange={(e) => updateTempData("linkedin", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Website:</label>
                <input
                  type="text"
                  value={tempData.website || ""}
                  onChange={(e) => updateTempData("website", e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("personalInfo")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="contact-info">
              <p>{resumeData?.personalInfo?.email}</p>
              <p>{resumeData?.personalInfo?.phone}</p>
              <p>{resumeData?.personalInfo?.address}</p>
              <p>{resumeData?.personalInfo?.linkedin}</p>
              <p>{resumeData?.personalInfo?.website}</p>
            </div>
          )}
        </section>

        {/* Professional Summary Section */}
        <section className="resume-section">
          <div className="section-header">
            <h2>Professional Summary</h2>
            {!props.isPreview && (
              <button
                className="edit-btn"
                onClick={() => handleEdit("professionalSummary")}
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === "professionalSummary" ? (
            <div className="edit-form">
              <FroalaEditorComponent
                tag="textarea"
                model={tempData || ""}
                onModelChange={(content) =>
                  setTempData(content)
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
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("professionalSummary")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: resumeData?.professionalSummary,
              }}
            />
          )}
        </section>

        {/* Work Experience Section */}
        <section className="resume-section">
          <div className="section-header">
            <h2>Work Experience</h2>
            {!props.isPreview && (
              <button
                className="edit-btn"
                onClick={() => handleEdit("workExperience")}
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === "workExperience" ? (
            <div className="edit-form">
              {Array.isArray(tempData) &&
                tempData.map((exp, index) => (
                  <div
                    key={`edit-${exp.id || index}`}
                    className="experience-item-edit"
                  >
                    <div className="form-group">
                      <label>Position:</label>
                      <input
                        type="text"
                        value={exp.position || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "position", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Company:</label>
                      <input
                        type="text"
                        value={exp.company || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "company", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration:</label>
                      <input
                        type="text"
                        placeholder="Jan 2000 - Dec 2000"
                        value={exp.duration || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "duration", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Description:</label>
                      <FroalaEditorComponent
                        tag="textarea"
                        model={exp.description || ""}
                        onModelChange={(content) =>
                          updateArrayItem(index, "description", content)
                        }
                        config={{
                          placeholderText: "Enter job description...",

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
                          quickInsertButtons: [
                            "image",
                            "table",
                            "ul",
                            "ol",
                            "hr",
                          ],

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
                    <button
                      className="remove-btn-template"
                      onClick={() => removeArrayItem(exp.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              <button
                className="add-btn"
                onClick={() =>
                  addArrayItem({
                    position: "New Position",
                    company: "Company Name",
                    duration: "Duration",
                    description: "Job description...",
                  })
                }
              >
                Add Experience
              </button>
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("workExperience")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="experience-list">
              {resumeData?.workExperience?.map((exp, index) => (
                <div key={exp.id || index} className="experience-item">
                  <div className="experience-header">
                    <h3>{exp.position}</h3>
                    <span className="duration">{exp.duration}</span>
                  </div>
                  <h4>{exp.company}</h4>
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Education Section */}
        <section className="resume-section">
          <div className="section-header">
            <h2>Education</h2>
            {!props.isPreview && (
              <button
                className="edit-btn"
                onClick={() => handleEdit("education")}
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === "education" ? (
            <div className="edit-form">
              {Array.isArray(tempData) &&
                tempData.map((edu, index) => (
                  <div key={edu.id || index} className="education-item-edit">
                    <div className="form-group">
                      <label>Degree:</label>
                      <input
                        type="text"
                        value={edu.degree || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "degree", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Institution:</label>
                      <input
                        type="text"
                        value={edu.institution || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "institution", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Field of Study:</label>
                      <input
                        type="text"
                        value={edu.field || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "field", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Year:</label>
                      <input
                        type="text"
                        value={edu.year || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "year", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>GPA:</label>
                      <input
                        type="text"
                        value={edu.gpa || ""}
                        onChange={(e) =>
                          updateArrayItem(index, "gpa", e.target.value)
                        }
                      />
                    </div>
                    <button
                      className="remove-btn-template"
                      onClick={() => removeArrayItem(edu.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              <button
                className="add-btn"
                onClick={() =>
                  addArrayItem({
                    degree: "Degree Name",
                    institution: "Institution Name",
                    field: "Field of Study",
                    year: "Year",
                    gpa: "GPA",
                  })
                }
              >
                Add Education
              </button>
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("education")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="education-list">
              {resumeData?.education?.map((edu, index) => (
                <div key={edu.id || index} className="education-item">
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
          )}
        </section>

        {/* Skills Section */}
        <section className="resume-section">
          <div className="section-header">
            <h2>Skills</h2>
            {!props.isPreview && (
              <button className="edit-btn" onClick={() => handleEdit("skills")}>
                Edit
              </button>
            )}
          </div>

          {editingSection === "skills" ? (
            <div className="edit-form">
              <textarea
                value={Array.isArray(tempData) ? tempData.join(", ") : tempData}
                onChange={(e) => setTempData(e.target.value.split(", "))}
                rows="4"
                placeholder="Enter skills separated by commas"
                className="skills-textarea"
              />
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("skills")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="skills-list">
              {resumeData?.skills?.map((skill, index) => (
                skill !== "" ? <span key={index} className="skill-tag">
                  {skill}
                </span>
                : ""
              ))}
            </div>
          )}
        </section>

        {/* Certifications Section */}
        <section className="resume-section">
          <div className="section-header">
            <h2>Certifications</h2>
            {!props.isPreview && (
              <button
                className="edit-btn"
                onClick={() => handleEdit("certifications")}
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === "certifications" ? (
            <div className="edit-form">
              <textarea
                value={Array.isArray(tempData) ? tempData.join(", ") : tempData}
                onChange={(e) => setTempData(e.target.value.split(", "))}
                rows="4"
                placeholder="Enter certifications separated by commas"
                className="skills-textarea"
              />
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("certifications")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="skills-list">
              {resumeData?.certifications?.map((certification, index) => (
                certification !== "" ? <span key={index} className="skill-tag">
                  {certification}
                </span> : ""
              ))}
            </div>
          )}
        </section>

        {/* Languages Section */}
        <section className="resume-section">
          <div className="section-header">
            <h2>Languages</h2>
            {!props.isPreview && (
              <button
                className="edit-btn"
                onClick={() => handleEdit("languages")}
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === "languages" ? (
            <div className="edit-form">
              <textarea
                value={Array.isArray(tempData) ? tempData.join(", ") : tempData}
                onChange={(e) => setTempData(e.target.value.split(", "))}
                rows="4"
                placeholder="Enter languages separated by commas"
                className="skills-textarea"
              />
              <div className="form-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave("languages")}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="skills-list">
              {resumeData?.languages?.map((language, index) => (
                language !== "" ? <span key={index} className="skill-tag">
                  {language}
                </span> : ""
              ))}
            </div>
          )}
        </section>
      </div>

      {!props.isPreview && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Preview Button - Top Right */}
          <button className="download-btn-template" onClick={handlePreview}>
            Preview & Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeEditor;
