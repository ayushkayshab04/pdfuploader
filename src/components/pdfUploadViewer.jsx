import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { UploadIcon } from "../Icons/GenricIcon";
import { baseUrl } from "../config/config";

// Use the local worker from node_modules
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfUploadViewer = ({ pdfUrl, setPdfUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [pdfUrlString, setPdfUrlString] = useState("");
  const inputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      console.log("=====++Url", url);
      setPdfUrlString(url);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const res = await axios.post(`${baseUrl}/api/pdf/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Extracted text:", res.data.text);
      setPdfUrl(res.data.text);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {pdfUrl ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px auto",
          }}
        >
          <div
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              width: "100%",
              height: "90vh", // Limit height to 80% of the viewport
              overflowY: "auto", // Enable internal scrolling
              padding: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Document file={pdfUrlString} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  pageNumber={index + 1}
                  id={`page-${index + 1}`}
                />
              ))}
            </Document>
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => inputRef.current.click()}
            style={{
              display: "flex",
              height: "200px",
              width: "300px",
              flexDirection: "column",
              border: "2.5px dashed grey",
              borderRadius: "25px",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              transition: "0.3s ease",
            }}
          >
            <UploadIcon height={50} width={80} />
            <p style={{ marginTop: "10px", fontSize: "16px", color: "#555" }}>
              Click to Upload PDF
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </>
      )}
    </div>
  );
};

export default PdfUploadViewer;
