import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { Oval } from "react-loader-spinner";

const CourseView = () => {
  const { id } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef(null);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fakeVideo, setFakeVideo] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data.course);
        setLoading(false);
        console.log("data", courseData);
      });
  }, []);

  useEffect(() => {
    const videoSourceLink = courseData?.video?.startsWith("https");
    console.log("source true", videoSourceLink);
    if (videoSourceLink) {
      setFakeVideo(true);
    } else {
      setUploadedVideo(true);
    }
    //   ? courseData
    //   : `http://localhost:8000/images/${courseData.video}`;
    // setVideoSource(videoSource);
  }, [courseData]);

  const handleEnded = () => {
    setIsFinished(true);
    console.log("video is done");
  };

  useEffect(() => {
    window.addEventListener("message", (e) => {
      console.log("data", e.data);
      if (e.data === "videoEnded") {
        handleEnded();
        console.log("vide endede");
      }
    });
    return () => {
      window.removeEventListener("message", handleEnded);
    };
  }, []);

  return (
    <div className={loading && "bottom"}>
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
              {courseData?.name}
              &nbsp;&nbsp;<i className="bi bi-person-video3"></i>
            </p>
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              {fakeVideo ? (
                <iframe
                  ref={videoRef}
                  width="560"
                  height="315"
                  title="video"
                  src={courseData && courseData?.video}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                uploadedVideo &&
                courseData?.video && (
                  <video
                    src={`http://localhost:8000/videos/${courseData.video}`}
                    controls
                    width={"100%"}
                  />
                )
              )}

              {/* <video
            src={}
            controls
            width={"100%"}
            onEnded={handleEnded}
          ></video> */}

              <p className="fs-5 text-center mt-3">
                Once you watch the course, you will be able to do a test &nbsp;
                <i className="bi bi-chevron-double-down"></i>
              </p>

              {/* <Link
            to={`/test/${singleCourse.id}`}
            className={`btn btn-primary btn-lg ${
              !isFinished && "disabled"
            } d-block mx-auto w-50`}
          >
            Complete test
          </Link> */}
              <Link
                to={`/test/${courseData?.id}`}
                className={`btn btn-primary btn-lg d-block mx-auto w-50`}
              >
                Complete test
              </Link>
            </div>
            <div className="col-md-6">
              <p className="fs-1 text-center ">Course Content</p>
              {courseData?.courseContent &&
                courseData?.courseContent.map((content, index) => (
                  <p key={index} className="week">
                    <h3 className="text-primary">Week {index + 1}</h3>
                    <ul>
                      {content.week.map((week, i) => (
                        <li key={i} className="week-item">
                          {week}
                        </li>
                      ))}
                    </ul>
                  </p>
                ))}
              {/* <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Week 1: Introduction to React
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Understanding the components of Angular</li>
                    <li>Setting up an Angular project</li>
                    <li>Creating templates and services overflow.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Week 2: Node.js Fundamentals
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Understanding the basics of Node.js</li>
                    <li>Building a server-side application</li>
                    <li>CUsing npm to manage dependencies</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Week 3: MongoDB and Database Integration
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Understanding the basics of MongoDB</li>
                    <li>Integrating MongoDB with a Node.js application</li>
                    <li>Using npm to manage dependencies</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Week 4: Full Stack Development
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      Building a full-stack web application with Angular and
                      Node
                    </li>
                    <li>
                      Understanding the communication between the front-end and
                      back-end
                    </li>
                    <li>Implementing user authentication and authorization</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  Week 5: Advanced Topics
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul>
                    <li>Creating reusable components</li>
                    <li>Best practices for building web applications</li>
                    <li>Deploying a full-stack web application</li>
                    <li>Troubleshooting and debugging</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  Week 6: Project
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      Building a final project utilizing all the knowledge
                      learned throughout the course
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseView;
