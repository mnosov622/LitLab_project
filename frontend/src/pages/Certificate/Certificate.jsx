import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import "./Certificate.scss";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Certificate = () => {
  const elementRef = useRef(null);
  const [date, setDate] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  function downloadPrint() {
    const win = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );
    win.document.write(elementRef.current.innerHTML);
    win.document.close();
    win.focus();
    win.onload = function () {
      win.print();
      // win.close();
    };
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    let today = new Date();
    let date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    setDate(date);
    fetch(`https://litlab-backend-v2.vercel.app/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data.course);
      });

    fetch(`https://litlab-backend-v2.vercel.app/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  const handleDownload = () => {
    const element = elementRef.current;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Certificate of Completion</title>
      </head>
      <body>
        ${element.innerHTML}
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
        id="printArea"
      >
        <h1 className="text-center font-weight-bold">
          Certificate of Completion &nbsp;
          <i className="bi bi-patch-check text-primary"></i>
        </h1>
        <p className="text-center mt-3 fs-4">
          This is to certify that
          <br />
          <br />
          <strong>
            {userData.name} <i class="bi bi-person-circle"></i>
            <br />
          </strong>
          <br />
          has completed the course
          <br />
          <br />
          <strong>{courseData && courseData.name && courseData?.name}</strong>
        </p>
        <p className="text-center mt-3 fs-5">Date: {date}</p>
        <p className="text-center mt-3">
          <br />
          <br />
          <p className="fs-5 fw-bold">
            Instructor: {courseData && courseData.instructor && courseData.instructor}
          </p>
          <p className="fs-5 text-primary">LitLab</p>
        </p>
      </div>

      <div className="button-wrapper text-center mb-5">
        <button onClick={downloadPrint} className="btn btn-primary btn-lg">
          Download Certificate
        </button>
      </div>
    </>
  );
};

export default Certificate;
