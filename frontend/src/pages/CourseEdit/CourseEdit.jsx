import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CourseEdit = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [singleCourse, setSingleCourse] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState(0);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { courseId } = useParams();
  console.log("id is", courseId);
  console.log(decoded.email);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/creator-courses/${decoded.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.courses);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("data", userData);
    const singleCourse = userData.find(
      (course) => course.id === Number(courseId)
    );
    setSingleCourse(singleCourse);
    console.log("single course", singleCourse);
    singleCourse && setShortDescription(singleCourse?.shortDescription);
    singleCourse && setLongDescription(singleCourse?.longDescription);
    singleCourse && setCourseName(singleCourse?.name);
    singleCourse && setPrice(singleCourse?.price);
  }, [userData, courseId]);

  return (
    <div className={loading ? "bottom" : ""}>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>
          Edit course{" "}
          <span className="text-primary">
            {" "}
            {singleCourse && singleCourse?.name}
          </span>
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
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="courseName" className="d-block fs-4">
                  Course Name
                </label>
                <input
                  id="courseName"
                  className="form-control w-50"
                  type="text"
                  value={(singleCourse && courseName) || ""}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="shortDescription" className="d-block fs-4">
                  Short Description
                </label>
                <textarea
                  id="shortDescription"
                  className="form-control w-50"
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
                  className="form-control w-50"
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
                  className="form-control w-50"
                  type="number"
                  value={(singleCourse && price) || ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6">
              {/* TODO: Issue with the image */}

              <p className="fs-4">Course Image</p>
              {singleCourse && (
                <img
                  src={`http://localhost:8000/images/${singleCourse.courseImage}`}
                  width={"30%"}
                  alt="Course"
                />
              )}

              <p className="fs-4">Video</p>

              {singleCourse && (
                <video
                  controls
                  src={`http://localhost:8000/videos/${singleCourse.video}`}
                  width={"50%"}
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
