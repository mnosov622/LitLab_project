import React, { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import empty from "../../assets/no-courses.gif";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import Modal from "../../components/Modal/Modal";

const LearnerCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  async function handleRemoveCourse(course) {
    await fetch(`http://localhost:8000/users/${userId}/courses`, {
      method: "DELETE",
    }).then((res) => {});
    setSelectedCourse(null);
    setShowModal(false);
    window.location.reload();
  }

  function handleShowModal(course) {
    setSelectedCourse(course);
    setShowModal(true);
  }

  function handleCloseModal() {
    setSelectedCourse(null);
    setShowModal(false);
  }

  useEffect(() => {
    const visitorCount = parseInt(localStorage.getItem("learnerCount")) || 0;
    localStorage.setItem("learnerCount", visitorCount + 1);
    setLoader(true);
    fetch(`http://localhost:8000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setCourses(data.courses));
    setLoader(false);
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
                <button className="btn btn-primary btn-lg">Explore all courses</button>
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
        <div className="btn-container text-center mb-3">
          <button className="btn btn-danger" onClick={handleShowModal}>
            Remove all courses
          </button>
          {showModal && (
            <Modal
              title="Confirm Action"
              body={`Are you sure you want to remove all courses`}
              onConfirm={handleRemoveCourse}
              onCancel={handleCloseModal}
            />
          )}
        </div>
      </>
    );
  }
};

export default LearnerCourses;
