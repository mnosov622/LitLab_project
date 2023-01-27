import React, { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import empty from "../../assets/no-courses.gif";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LearnerCourses = () => {
  const boughtItem = localStorage.getItem("Item_to_buy");
  const items = JSON.parse(boughtItem);

  if (localStorage.getItem("Item_to_buy") === null) {
    return (
      <>
        <p className="mt-5">
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
      </>
    );
  }

  if (items.length === undefined) {
    return (
      <>
        <div className="bg-light shadow text-center p-2 fs-2 mb-4">
          <p>My Courses</p>
        </div>
        <div className="">
          <CourseCard
            cardSmall
            name={items?.name}
            price={items?.price}
            image={items?.courseImage}
            teacherName={items?.instructor}
            id={items?.id}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Courses</p>
      </div>
      {!items ? (
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
        <>
          <div className="row">
            {items.map((item) => (
              <CourseCard
                cardSmall
                name={item?.name}
                price={item?.price}
                image={item?.courseImage}
                teacherName={item?.instructor}
                id={item?.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default LearnerCourses;
