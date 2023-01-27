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

              <p className="card-text fs-5">
                <i className="bi bi-person"></i> {teacherName}
              </p>
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
