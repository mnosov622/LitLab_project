import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { Oval } from "react-loader-spinner";
import { Tabs, Tab } from "react-bootstrap";
import "./CourseView.scss";

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

              <p className="fs-5 text-center mt-3">
                Once you watch the course, you will be able to do a test &nbsp;
                <i className="bi bi-chevron-double-down"></i>
              </p>

              <Link
                to={`/test/${courseData?.id}`}
                className={`btn btn-primary btn-lg d-block mx-auto w-50`}
              >
                Complete test
              </Link>
            </div>
            <div className="col-md-6">
              <Tabs id="my-tabs" className="col-md-6">
                <Tab eventKey="content" title="Content">
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
                  </div>
                </Tab>
                <Tab eventKey="chat" title="Notes">
                  Notes
                </Tab>
                <Tab eventKey="notes" title="Chat">
                  Chat
                </Tab>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseView;
