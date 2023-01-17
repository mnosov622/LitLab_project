import React from "react";
import { Link } from "react-router-dom";
import teacher1 from "../../assets/teacher-1.jpg";
import styles from "./styles.module.scss";

const CourseCard = ({ name, image, price, teacherName }) => {
  return (
    <>
      <div class="card w-100 mb-5">
        <Link to="course/:id">
          <div className={styles.card}>
            <img
              src={image}
              class="card-img-top img-fluid"
              alt="Teacher for the course"
            ></img>
            <div class="card-body">
              <h5 class="card-title">{name}</h5>
              <p class="card-text fs-5">
                <i class="bi bi-person"></i> {teacherName}
              </p>
              <p className="bg-light border rounded text-center mt-4">
                {price}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CourseCard;
