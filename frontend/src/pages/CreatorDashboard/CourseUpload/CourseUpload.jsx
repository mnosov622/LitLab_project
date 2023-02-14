import jwtDecode from "jwt-decode";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import "./CourseUpload.scss";
import { creatorCourse } from "../../../store/actions";
import { createdCourse } from "../../../store/reducers/creatorCourse";

const CourseUpload = () => {
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const nameRef = useRef();
  const priceRef = useRef();
  const shortDescr = useRef();
  const longDescr = useRef();
  const dispatch = useDispatch();
  const createdCourse = useSelector((state) => state.createdCourse);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [selectedQuestionsAmount, setSelectedQuestionsAmount] = useState(null);

  const [weeks, setWeeks] = useState([
    { week: ["", "", ""] },
    { week: ["", "", ""] },
    { week: ["", "", ""] },
  ]);

  const [pointsToLearn, setPointsToLearn] = useState([
    { point: "" },
    { point: "" },
    { point: "" },
  ]);

  const [summary, setSummary] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("files", video);
    formData.append("files", image);
    formData.append("email", decoded.email);
    formData.append("courseName", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("shortDescription", shortDescr.current.value);
    formData.append("longDescription", longDescr.current.value);

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    console.log("response recieved", data);
    if (res.status === 200) {
      navigate("/", { state: { success: true } });
    }

    const courseData = {
      video: data.video,
      courseImageURL: data.image.originalname,
      instructorEmail: decoded.email,
      name: nameRef.current.value,
      price: priceRef.current.value,
      shortDescription: shortDescr.current.value,
      longDescription: longDescr.current.value,
      email: decoded.email,
      instructor: decoded.name,
      courseContent: weeks.map((week) => ({ week: week.week })),
      pointsToLearn: pointsToLearn.map((point) => ({ point: point.point })),
      pointsSummary: summary,
    };
    setLoading(false);

    console.log("data from client", courseData);
    dispatch(creatorCourse(courseData));
    const response = await fetch("http://localhost:8000/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    const courses = await response.json();
    console.log("course", courses.course);
    console.log("created course", createdCourse);
  };

  const onChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleChange = (index, event) => {
    const values = [...weeks];
    values[index].week[event.target.name] = event.target.value;
    setWeeks(values);
  };

  const handlePointChange = (index, value) => {
    const newPointsToLearn = [...pointsToLearn];
    newPointsToLearn[index].point = value;
    setPointsToLearn(newPointsToLearn);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleDropdownChange = (e) => {
    setSelectedQuestionsAmount(e.target.value);
    for (let i = 0; i < selectedQuestionsAmount; i++) {}
  };
  const handleNumQuestionsChange = (event) => {
    const num = parseInt(event.target.value);
    setNumQuestions(num);
    setQuestions(
      Array.from({ length: num }, () => ({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      }))
    );
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = event.target.value;
    setQuestions(newQuestions);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>Upload your course</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="upload-item">
            <h3 className="fs-2 text-primary">Upload a course video</h3>
            <div class="input-container d-flex  justify-content-center align-items-center">
              <p className="fs-4">
                <i className="bi bi-upload fs-1"></i>
              </p>
              <input
                type="file"
                onChange={onChange}
                required
                id="video"
                className="input-file"
              />
            </div>
          </div>
          <div className="upload-item">
            <h3 className="fs-2 text-primary">Upload a course image</h3>
            <div class="input-container d-flex  justify-content-center align-items-center">
              <p className="fs-4">
                <i className="bi bi-upload fs-1"></i>
              </p>
              <input
                type="file"
                onChange={handleImageChange}
                required
                id="photo"
                className="input-file"
              />
            </div>
          </div>
          <h3 className="mt-3 text-primary">Specify what people will learn:</h3>
          {pointsToLearn.map((point, index) => (
            <div key={index}>
              <h4 className="mt-3">Point {index + 1}</h4>
              <input
                type="text"
                id={`point-${index}`}
                value={point.point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                className="form-control w-50"
              />
            </div>
          ))}
          <h4 className="mt-3">Summary of points</h4>
          <textarea
            type="text"
            placeholder="Summary"
            className="form-control w-50"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-primary">General Information</h2>
          <div className="form-floating mb-3">
            <input
              required
              ref={nameRef}
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              autoFocus
            />
            <label for="floatingName">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              ref={priceRef}
              type="text"
              className="form-control"
              id="floatingPrice"
              placeholder="Price"
              required
            />
            <label for="floatingPrice">Price</label>
          </div>

          <div className="form-floating mb-3">
            <input
              ref={shortDescr}
              type="text"
              className="form-control"
              id="floatingDescription"
              placeholder="Description"
              required
            />
            <label for="floatingDescription">Short Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              ref={longDescr}
              type="text"
              className="form-control"
              id="floatingDescription"
              placeholder="Description"
              required
            />
            <label for="floatingDescription">Long Description</label>
          </div>
          <h2 className="text-primary">Course Content</h2>
          {weeks.map((week, index) => (
            <div key={index}>
              <h4>Week {index + 1}</h4>
              <input
                type="text"
                name="0"
                value={week.week[0]}
                onChange={(event) => handleChange(index, event)}
                placeholder="Lesson 1"
                className="form-control mb-3"
              />
              <input
                type="text"
                name="1"
                value={week.week[1]}
                onChange={(event) => handleChange(index, event)}
                placeholder="Lesson 2"
                className="form-control mb-3"
              />
              <input
                type="text"
                name="2"
                value={week.week[2]}
                onChange={(event) => handleChange(index, event)}
                placeholder="Lesson 3"
                className="form-control mb-3"
              />
            </div>
          ))}
          {showModal && (
            <div className="modal">
              <div ref={modalRef} className="modal-content">
                <span
                  className="close position-absolute right-0"
                  style={{ right: "20px", top: "5px" }}
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </span>
                <h2 className="text-center">Create a test</h2>
                <div>
                  <label htmlFor="num-questions">Number of questions:</label>
                  <select
                    id="num-questions"
                    value={numQuestions}
                    onChange={handleNumQuestionsChange}
                    className="form-control w-25"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  {numQuestions > 0 && (
                    <div>
                      <h2>Questions:</h2>
                      {Array.from(
                        { length: numQuestions },
                        (_, questionIndex) => (
                          <div key={questionIndex}>
                            <label
                              htmlFor={`question-${questionIndex}`}
                              className="fw-bold fs-5"
                            >
                              Question {questionIndex + 1}:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id={`question-${questionIndex}`}
                              value={questions[questionIndex].question}
                              onChange={(event) =>
                                handleQuestionChange(event, questionIndex)
                              }
                            />

                            <h5>Options:</h5>
                            {questions[questionIndex].options.map(
                              (option, optionIndex) => (
                                <div key={optionIndex}>
                                  <label
                                    htmlFor={`question-${questionIndex}-option-${optionIndex}`}
                                  >
                                    Option {optionIndex + 1}:
                                  </label>
                                  <input
                                    type="text"
                                    id={`question-${questionIndex}-option-${optionIndex}`}
                                    value={option}
                                    className="form-control"
                                    onChange={(event) =>
                                      handleOptionChange(
                                        event,
                                        questionIndex,
                                        optionIndex
                                      )
                                    }
                                  />
                                </div>
                              )
                            )}

                            <label
                              htmlFor={`question-${questionIndex}-correct-answer`}
                            >
                              Correct answer:
                            </label>
                            <input
                              type="text"
                              id={`question-${questionIndex}-correct-answer`}
                              value={questions[questionIndex].correctAnswer}
                              className="form-control"
                              onChange={(event) =>
                                handleCorrectAnswerChange(event, questionIndex)
                              }
                            />
                          </div>
                        )
                      )}
                      <div className="text-center">
                        <button className="btn btn-primary mt-3">
                          Create a test
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            className="btn btn-success btn-lg"
            onClick={() => setShowModal(true)}
          >
            Create a test
          </button>
        </div>
        <Button
          className="btn btn-lg btn-primary mb-3 w-25 mx-auto mt-3"
          variant="primary"
          type="submit"
        >
          {loading ? (
            <Bars
              height="30"
              width="55"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <span> Create A Course</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CourseUpload;
