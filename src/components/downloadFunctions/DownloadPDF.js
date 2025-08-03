import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from 'react-hot-toast';

export const DownloadPDF = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const details = JSON.parse(localStorage.getItem('tempResumeData'));

  const handleDownload = async (html) => {
    setIsLoading(true);

    const htmlWithCss = html;

    const API_LOCAL = 'http://localhost:3001';
    const API = 'https://resumebuilder-api-production.up.railway.app';

    await fetch(`${API}/download-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ htmlContent: htmlWithCss }),
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${props?.name !== null && props?.name !== undefined ? props?.name : 'resume'}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setIsLoading(false);
        toast.success('Resume downloaded successfully!')
      });
  }
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  return (
    <>
      <Toaster position="top-right" />
      <button
        disabled={isLoading}
        className="download-btn"
        onClick={() => handleDownload(props.html)}
      >
        {isLoading ? "Generating..." : "Download as PDF"}
      </button>
      {isLoading && (
        <div style={overlayStyle}>
          <ClipLoader color="#36D7B7" size={60} />
          <p style={{ marginTop: "16px", color: "white", fontSize: "1.1rem" }}>
            Generating PDF, please wait...
          </p>
        </div>
      )}
    </>
  );
};
