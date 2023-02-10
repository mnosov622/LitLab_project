import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/CourseCards/CourseCard";
import { Allcourses } from "../../store/actions";
import { loggedInAsLearner } from "../../store/reducers/loginAsLearner";
import "./AllCourses.scss";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    setLoading(true);
    fetch("http://localhost:8000/courses")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setCourses(data);
        setLoading(false);
      });

    if (userId) {
      fetch(`http://localhost:8000/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserCourses(data.courses);
          console.log("user courses", data.courses);
        });
    }
  }, []);

  return (
    <div className={loading ? "bottom" : ""}>
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
        <>
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-4 mt-2">
                <CourseCard
                  key={course.id}
                  id={course.id}
                  name={course.name}
                  courseImage={course.courseImage}
                  image={course.courseImageURL}
                  price={course.price}
                  teacherName={course.instructor}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllCourses;
