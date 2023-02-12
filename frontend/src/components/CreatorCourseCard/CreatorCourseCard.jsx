import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CreatorCourseCard = ({
  courseImage,
  courseName,
  price,
  courseVideo,
  instructorName,
  courseId,
}) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userEmail = decoded.email;
      console.log("data", { email: userEmail, courseName: courseName });

      fetch(`http://localhost:8000/courses/${courseName}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));

      console.log("course id", courseId);
      fetch(`http://localhost:8000/users/${userEmail}/courses/${courseId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <>
      <div className="w-25 mb-5 col-md-6">
        <div className="card-item border">
          <img
            src={`http://localhost:8000/images/${courseImage}`}
            className="card-img-top img-fluid card-image"
            alt="Course"
          />
          <div className="card-body">
            <h5 className="card-title">{courseName}</h5>

            <p className="card-text fs-5">
              <i className="bi bi-person"></i> {instructorName || "Mark"}
            </p>

            <p className="bg-light border rounded text-center mt-4 fw-bold fs-5">
              {price}$
            </p>
          </div>
          <div className="buttons-wrapper d-flex justify-content-around w-50 text-center mx-auto mb-3">
            <Link to={`/course/edit/${courseId}`}>
              {" "}
              <button className="btn btn-dark text-white">Edit</button>{" "}
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorCourseCard;
