import React, { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import empty from "../../assets/no-courses.gif";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const LearnerCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    setLoader(true);
    if (userId) {
      fetch(`http://localhost:8000/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setCourses(data.courses));
      setLoader(false);
    }
  }, []);

  if (!courses || courses.length === 0) {
    return (
      <>
        <p className="mt-5">
          <div className="text-center mb-5">
            {loader && (
              <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            )}
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

  if (courses.length > 0) {
    return (
      <>
        <div className="bg-light shadow text-center p-2 fs-2 mb-4">
          <p>My Courses</p>
        </div>
        <div className="row">
          {loader && (
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          )}
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              linkToCourseView
              cardSmall
              name={course?.courseName}
              price={course?.price}
              courseImage={course?.courseImage}
              teacherName={course?.instructor}
              id={course?.id}
              courseCompleted={course.isCompleted}
              deleteBtn
            />
          ))}
        </div>
      </>
    );
  }
};

export default LearnerCourses;
