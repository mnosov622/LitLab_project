import React from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import CreatorCourseCard from "../../components/CreatorCourseCard/CreatorCourseCard";

const CreatorDashboard = () => {
  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Courses</p>
      </div>
      <CreatorCourseCard />
    </>
  );
};

export default CreatorDashboard;
