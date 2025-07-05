import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export const DownloadPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const details = JSON.parse(localStorage.getItem('tempResumeData'));
  const handleDownload = () => {
    setIsLoading(true);
    const resume = document.getElementById("resume");
    const originalOverflow = resume.style.overflow;
    resume.style.overflow = "visible";

    html2canvas(resume, {
      scale: 3,
      scrollY: -window.scrollY,
      useCORS: true,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: resume.scrollHeight,
    })
      .then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 10;
        const usablePageWidth = pageWidth - 2 * margin;
        const usablePageHeight = pageHeight - 2 * margin;

        const imgWidth = usablePageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create a temporary canvas to hold each page slice
        const totalPages = Math.ceil(imgHeight / usablePageHeight);

        for (let i = 0; i < totalPages; i++) {
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");

          const sliceHeight =
            (usablePageHeight * canvas.width) / usablePageWidth;
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;

          pageCtx.drawImage(
            canvas,
            0,
            i * sliceHeight,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight
          );

          const imgData = pageCanvas.toDataURL("image/png");

          if (i > 0) pdf.addPage();

          pdf.addImage(
            imgData,
            "PNG",
            margin,
            margin,
            usablePageWidth,
            usablePageHeight
          );
        }

        pdf.save((details !== undefined && details !== null) ? details?.personalInfo?.fullName + ".pdf" : "resume.pdf");
        resume.style.overflow = originalOverflow;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setIsLoading(false); // Ensure loader is hidden even on error
      });
  };

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
      <button
        disabled={isLoading}
        className="download-btn"
        onClick={handleDownload}
        style={{ marginRight: "10px", position: "absolute", right: "15px", top: "15px" }}
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
