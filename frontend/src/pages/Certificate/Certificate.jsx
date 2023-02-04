import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import signature from "../../../src/assets/certificate-signature.png";
import "./Certificate.scss";
import congrats from "../../../src/assets/congrats.png";

const Certificate = () => {
  const elementRef = useRef(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    let today = new Date();
    let date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    console.log(date);
    setDate(date);
  }, []);
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
      <div
        className="container mt-5 mb-5 certificate position-relative border p-3 border-dark rounded w-75"
        ref={elementRef}
      >
        <h1 className="text-center font-weight-bold">
          Certificate of Completion &nbsp;
          <i className="bi bi-patch-check text-primary"></i>
        </h1>
        <p className="text-center mt-3 fs-4">
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
        <p className="text-center mt-3 fs-5">Date: {date}</p>
        <p className="text-center mt-3">
          <img src={signature} alt="Signature" width={"12%"} />
          <br />
          <br />
          <p className="fs-5 fw-bold">Instructor: Mark Hovers</p>
        </p>
        <img
          src={congrats}
          alt="Congratulations"
          width={"15%"}
          className="congrats position-absolute"
        />
      </div>
      <div className="button-wrapper text-center mb-5">
        <button onClick={handleDownload} className="btn btn-primary btn-lg">
          Download Certificate
        </button>
      </div>
    </>
  );
};

export default Certificate;
