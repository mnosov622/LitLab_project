import React from "react";
import styles from "./styles.module.scss";

const CourseCategoryCard = ({ name, courseCount }) => {
  return (
    <>
      <div className={styles.category}>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{name}</h5>
            {/* Dynamic amount of courses to be added later */}
            <p class="card-text text-secondary">{courseCount} courses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCategoryCard;
