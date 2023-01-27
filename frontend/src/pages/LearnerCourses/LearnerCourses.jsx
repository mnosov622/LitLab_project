import React, { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import empty from "../../assets/no-courses.gif";
import { Link } from "react-router-dom";

const LearnerCourses = () => {
  useEffect(() => {
    console.log("Component init");
  });

  const boughtItem = localStorage.getItem("Item_to_buy");
  const item = JSON.parse(boughtItem);

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Courses</p>
      </div>
      {!item ? (
        <p>
          <div className="text-center mb-5">
            <p className="fs-3">There are no courses yet...</p>
            <img src={empty} alt="No courses" className="ml-auto mb-5" />
            <div className="wrapper">
              <Link to="/all-courses">
                <button className="btn btn-primary btn-lg">
                  Explore all courses
                </button>
              </Link>
            </div>
          </div>{" "}
        </p>
      ) : (
        <CourseCard
          cardSmall
          name={item?.name}
          price={item?.price}
          image={item?.courseImage}
          teacherName={item?.instructor}
          id={item?.id}
        />
      )}
    </>
  );
};

export default LearnerCourses;
