import React from "react";
import { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import CreatorCourseCard from "../../components/CreatorCourseCard/CreatorCourseCard";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import empty from "../../assets/no-courses.gif";
import { Link, useLocation } from "react-router-dom";

const CreatorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const success = location.state ? location.state.success : false;
    setSuccess(success);

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userEmail = decoded.email;
    console.log(userEmail);
    const creatorVisitorCount =
      parseInt(localStorage.getItem("creatorVisitorCount")) || 0;
    localStorage.setItem("creatorVisitorCount", creatorVisitorCount + 1);
    setVisitorCount(creatorVisitorCount + 1);
    setLoading(true);
    fetch(`http://localhost:8000/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data recieved", data);
        setCourses(data.courses);
        setInstructorName(data.name);
        setLoading(false);
      });
    //get request to the user to find all courses for content creator
  }, [location.state]);

  return (
    <div className={loading ? "bottom" : ""}>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Courses</p>
      </div>
      <p className="text-success text-center fs-4">
        {success && "You have successfully added the course"}
      </p>
      {loading ? (
        <Oval
          height={80}
          width={80}
          color="#0d6efd"
          wrapperStyle={{ position: "absolute", left: "50%", top: "40%" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#0d6efd"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <div className="row">
          {courses !== undefined && courses.length !== 0 ? (
            courses.map((course) => (
              <CreatorCourseCard
                courseId={course.id}
                key={course.id}
                courseImage={
                  course && course.courseImageURL && course.courseImageURL
                }
                courseName={course.name}
                price={course.price}
                courseVideo={course.courseVideo}
                instructorName={instructorName}
              />
            ))
          ) : (
            <>
              <div className="text-center">
                <p className="fs-3">You don't have courses yet...</p>
                <img
                  src={empty}
                  alt="No courses"
                  className="ml-auto mb-5 empty"
                />
                <Link to="/upload" className="d-block">
                  <button className="btn btn-primary btn-lg">
                    Create new course
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;
