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

  //pagination
  const [coursesPage, setCoursesPage] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8000/pagination?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setCoursesPage(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      });

    fetch(`http://localhost:8000/pagination?page=1&limit=1000`)
      .then((response) => response.json())
      .then((data) => {
        const totalResults = data.results.length;
        setTotalPages(Math.ceil(totalResults / limit));
      });
  }, [page, limit]);

  const handleNextPage = () => {
    window.scrollTo(0, 0);
    setPage(nextPage.page);
    setLimit(nextPage.limit);
  };

  const handlePrevPage = () => {
    window.scrollTo(0, 0);
    setPage(prevPage.page);
    setLimit(prevPage.limit);
  };

  useEffect(() => {
    //checking if user has a token (logged in)
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      setLoading(true);
      fetch("https://backend-litlab.herokuapp.com/courses")
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
          setLoading(false);
        });

      if (userId) {
        fetch(`https://backend-litlab.herokuapp.com/users/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            setUserCourses(data.courses);
          });
      }
    } else {
      setLoading(true);
      fetch("https://backend-litlab.herokuapp.com/courses")
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
          setLoading(false);
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
          <div className="bg-light shadow text-center p-2 fs-2 mb-4">
            <p>
              All Courses - Page {page}/{totalPages}
            </p>
          </div>
          <div className="row">
            {coursesPage.map((course) => (
              <div className="col-md-4 mt-2">
                <CourseCard
                  key={course.id}
                  id={course.id}
                  name={course.name}
                  courseImage={course.courseImageURL}
                  image={course.courseImageURL}
                  price={course.price}
                  teacherName={course.instructor}
                  shortDescription={course.shortDescription}
                  pointsToLearn={course.pointsToLearn}
                  allCourses
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={handlePrevPage}
              disabled={!prevPage}
              className="btn btn-secondary"
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={!nextPage}
              className="btn btn-primary"
              style={{ marginLeft: "2%" }}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllCourses;
