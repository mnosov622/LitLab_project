import React from "react";
import { Link } from "react-router-dom";
import teacher1 from "../../assets/teacher-1.jpg";
// import styles from "./styles.module.scss";
import "./CourseCard.scss";

const CourseCard = ({
  name,
  image,
  price,
  teacherName,
  id,
  cardSmall,
  courseImage,
  rating,
}) => {
  return (
    <>
      <div className={cardSmall ? "w-25 mb-5 col-md-6" : "w-100 mb-5"}>
        <Link to={`/course/${id}`}>
          <div className="card-item">
            {courseImage ? (
              <img
                src={courseImage}
                className="card-img-top img-fluid card-image"
                alt="Course"
              />
            ) : (
              <img
                src={image}
                className="card-img-top img-fluid card-image"
                alt="Teacher for the course"
              />
            )}

            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              {rating ? (
                <p className="d-flex align-items-end">
                  Rating:
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.825 22L8.15 14.4L2 10H9.6L12 2L14.4 10H22L15.85 14.4L18.175 22L12 17.3L5.825 22Z"
                      fill="#FFD233"
                    />
                  </svg>
                  <span>{rating}</span>
                </p>
              ) : (
                <p className="card-text fs-5">
                  <i className="bi bi-person"></i> {teacherName}
                </p>
              )}

              <p className="bg-light border rounded text-center mt-4 fw-bold fs-5">
                {price}$
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CourseCard;
