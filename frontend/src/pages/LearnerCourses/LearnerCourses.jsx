import React, { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
const LearnerCourses = () => {
  useEffect(() => {
    console.log("Component init");
  });

  const boughtItem = localStorage.getItem("Item_to_buy");
  const item = JSON.parse(boughtItem);

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2">
        <p>My Courses</p>
      </div>
      <CourseCard name={item.name} price={item.price} />
    </>
  );
};

export default LearnerCourses;
