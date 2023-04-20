import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const CreatorCourseCard = ({
  courseImage,
  courseName,
  price,
  courseVideo,
  instructorName,
  courseId,
}) => {
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userEmail = decoded.email;

    fetch(`https://litlab-backend.vercel.app/courses/${courseName}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((e) => {});

    fetch(`https://litlab-backend.vercel.app/users/${userEmail}/courses/${courseId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((e) => console.log(e));
    setShowModal(false);
  }

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <div className="w-25 mb-5 col-md-6 course-card">
        <div className="card-item border">
          <img
            src={`https://litlab-backend.vercel.app/images/${courseImage}`}
            className="card-img-top img-fluid card-image"
            alt="Course"
          />
          <div className="card-body">
            <h5 className="card-title">{courseName}</h5>

            <p className="card-text fs-5">
              <i className="bi bi-person"></i> {instructorName || "Mark"}
            </p>

            <p className="bg-light border rounded text-center mt-4 fw-bold fs-5">{price}$</p>
          </div>
          <div className="buttons-wrapper d-flex justify-content-around w-50 text-center mx-auto mb-3">
            <Link to={`/course/edit/${courseId}`}>
              {" "}
              <button className="btn btn-dark text-white">Edit</button>{" "}
            </Link>
            <button className="btn btn-danger" onClick={handleShowModal}>
              Delete
            </button>
            {showModal && (
              <Modal
                title="Confirm Action"
                body={`Are you sure you want to delete the course `}
                onConfirm={handleDelete}
                onCancel={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorCourseCard;
