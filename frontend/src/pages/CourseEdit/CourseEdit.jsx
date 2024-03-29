import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Bars, Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CourseEdit = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [singleCourse, setSingleCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [singleCourseName, setSingleCourseName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [courseData, setCourseData] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { courseId } = useParams();
  const { id } = useParams();
  const nameRef = useRef();

  useEffect(() => {
    const singleCourse = userData.find((course) => course.id === Number(courseId));
    setSingleCourse(singleCourse);
    singleCourse && setShortDescription(singleCourse?.shortDescription);
    singleCourse && setLongDescription(singleCourse?.longDescription);
    singleCourse && setCourseName(singleCourse?.name);
    singleCourse && setPrice(singleCourse?.price);
  }, [userData, courseId, singleCourseName]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://litlab-backend-v2.vercel.app/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.courses);
        setLoading(false);
      });

    fetch(`https://litlab-backend-v2.vercel.app/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);

        const course = data.find((d) => d.name === singleCourse?.name);
        setSingleCourseName(course?.name);
        setSingleCourseName(nameRef.current.value);
      });
  }, []);

  const handleWeekChange = (weekIndex, itemIndex, e) => {
    if (singleCourse?.courseContent) {
      setCourseData(singleCourse.courseContent);
    }
    const newCourseData = [...courseData];
    if (newCourseData[weekIndex] && newCourseData[weekIndex].week) {
      newCourseData[weekIndex].week[itemIndex] = e.target.value;
      setCourseData(newCourseData);
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const updatedCourse = {
      name: courseName,
      shortDescription: shortDescription,
      longDescription: longDescription,
      price: price,
    };
    fetch(`https://litlab-backend-v2.vercel.app/creator-courses/${decoded.id}/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedCourse: updatedCourse,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        navigate("/");
      });

    fetch(`https://litlab-backend-v2.vercel.app/creator/${singleCourse.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: courseName,
        shortDescription: shortDescription,
        longDescription: longDescription,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://litlab-backend-v2.vercel.app/users/${decoded.id}`)
          .then((response) => response.json())
          .then((data) => {
            setCourses(data.courses);
          });
      });
  };
  return (
    <div className={loading ? "bottom" : ""}>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>
          Edit course <span className="text-primary"> {singleCourse && singleCourse?.name}</span>
        </p>
      </div>

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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="courseName" className="d-block fs-4">
                  Course Name
                </label>
                <input
                  id="courseName"
                  className="form-control w-50 points-input"
                  type="text"
                  value={(singleCourse && courseName) || ""}
                  onChange={(e) => setCourseName(e.target.value)}
                  ref={nameRef}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="shortDescription" className="d-block fs-4">
                  Short Description
                </label>
                <textarea
                  id="shortDescription"
                  className="form-control w-50 points-input"
                  type="text"
                  value={(singleCourse && shortDescription) || ""}
                  onChange={(e) => setShortDescription(e.target.value)}
                  cols="30"
                  rows="5"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="longDescription" className="d-block fs-4">
                  Long Description
                </label>
                <textarea
                  id="longDescription"
                  className="form-control w-50 points-input"
                  type="text"
                  value={(singleCourse && longDescription) || ""}
                  onChange={(e) => setLongDescription(e.target.value)}
                  cols="30"
                  rows="5"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="longDescription" className="d-block fs-4">
                  Price
                </label>
                <input
                  id="longDescription"
                  className="form-control w-50 points-input"
                  type="number"
                  value={(singleCourse && price) || ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6">
              <p className="fs-4">Course Image</p>
              {singleCourse && singleCourse.courseImageURL && (
                <img
                  src={`https://litlab-backend-v2.vercel.app/images/${singleCourse.courseImageURL}`}
                  width={"30%"}
                  alt="Course"
                  className="points-input"
                />
              )}

              <p className="fs-4">Video</p>

              {singleCourse && (
                <video
                  controls
                  src={`https://litlab-backend-v2.vercel.app/videos/${singleCourse.video}`}
                  width={"50%"}
                  className="points-input"
                ></video>
              )}
            </div>
          </div>
          <div className="button-wrapper text-center mt-5">
            <button type="submit" className="btn btn-primary btn-lg">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CourseEdit;
