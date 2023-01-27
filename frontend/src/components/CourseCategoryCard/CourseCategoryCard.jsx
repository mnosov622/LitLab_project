import React from "react";
import styles from "./styles.module.scss";

const CourseCategoryCard = ({ name, courseCount }) => {
  return (
    <>
      <div className={styles.category}>
        <div className="card" style={{ width: "320px", height: "100px" }}>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {/* Dynamic amount of courses to be added later */}
            <p className="card-text text-secondary">{courseCount} courses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCategoryCard;
