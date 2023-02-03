import React from "react";
import { useRef } from "react";
import signature from "../../assets/certificate-signature.png";

const Certificate = () => {
  const elementRef = useRef(null);

  const handleDownload = () => {
    const element = elementRef.current;
    const signatureImg = `<img src="${signature}" alt="Signature" width="12%"/>`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Certificate of Completion</title>
      </head>
      <body>
        ${element.innerHTML}
        ${signatureImg}
      </body>
      </html>
    `;

    const contentBlob = new Blob([content], { type: "text/html" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(contentBlob);
    link.download = "certificate.html";
    link.click();
  };
  return (
    <>
      <div className="container mt-5 mb-5" ref={elementRef}>
        <h1 className="text-center font-weight-bold">
          Certificate of Completion
        </h1>
        <p className="text-center mt-3">
          This is to certify that
          <br />
          <br />
          <strong>John Doe</strong>
          <br />
          has completed the course
          <br />
          <br />
          <strong>Introduction to React</strong>
          <br />
          with flying colors.
        </p>
        <p className="text-center mt-3">Date: 01/01/2023</p>
        <p className="text-center mt-3">
          <img src={signature} alt="Signature" width={"12%"} />
          <br />
          <br />
          <strong>Instructor</strong>
        </p>
      </div>
      <button onClick={handleDownload} className="btn btn-primary mx-auto">
        Download Certificate
      </button>
    </>
  );
};

export default Certificate;
