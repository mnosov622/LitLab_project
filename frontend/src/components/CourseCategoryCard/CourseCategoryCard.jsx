import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const CourseCategoryCard = ({ name, courseCount }) => {
  return (
    <>
      <Link to="/signup">
        <div className={styles.category}>
          <div className="category-card">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              {/* Dynamic amount of courses to be added later */}
              <p className="card-text text-secondary">{courseCount} courses</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCategoryCard;
