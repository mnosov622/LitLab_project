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
import testImage from "../../../assets/test.png";

const CourseUpload = () => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [instructorImage, setInstructorImage] = useState("");
  const [bio, setBio] = useState("");
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

  useEffect(() => {
    fetch(`https://backend-litlab.herokuapp.com/users/${decoded.id}`)
      .then((res) => res.json())
      .then((data) => {
        setInstructorImage(data.profileImage);
        setBio(data.bio);
      });
  }, []);
  const [summary, setSummary] = useState("");

  const [pointErrorMsg, setPointErrorMsg] = useState("");

  const handlePointChange = (index, value) => {
    if (value.length > 40) {
      setPointErrorMsg("Each point should have 40 characters or less.");
    } else {
      setPointErrorMsg("");
    }
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

  const handleNumQuestionsChange = (event) => {
    const num = parseInt(event.target.value);
    setNumQuestions(num);
    setQuestions(
      Array.from({ length: num }, () => ({
        question: "",
        options: ["", "", ""],
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

  const createTest = () => {
    setShowModal(false);
    console.log("Q", questions);
  };

  // Define state variables for the input values and validation errors
  const [courseNameError, setCourseNameError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [shortDesError, setShortDesError] = useState(null);
  const [longDesError, setLongDesError] = useState(null);

  function handleCourseName() {
    const name = nameRef.current.value.trim();
    if (!name) {
      setCourseNameError("Please enter a course name");
    } else if (/\d/.test(name)) {
      setCourseNameError("Course name cannot contain numbers");
    } else {
      setCourseNameError(null);
    }
  }

  function handlePrice() {
    const price = priceRef.current.value.trim();
    if (!price) {
      setPriceError("Please enter a price");
    } else if (!/^\d+$/.test(price)) {
      setPriceError("Price must be a valid number");
    } else {
      setPriceError(null);
    }
  }

  function handleShortDes() {
    const shortDes = shortDescr.current.value.trim();
    if (!shortDes) {
      setShortDesError("Please enter short description");
    } else {
      setShortDesError(null);
    }
  }

  function handleLongDes() {
    const longDes = longDescr.current.value.trim();
    if (!longDes) {
      setLongDesError("Please enter long description");
    } else {
      setLongDesError(null);
    }
  }

  //validating uploaded video file
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function videoChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
    validateVideo(file);
  }

  function validateVideo(file) {
    const allowedTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/mov",
    ];
    const maxFileSize = 100 * 1024 * 1024; // 100 MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Invalid file type. Please upload an MP4, MPEG, MOV, or QuickTime video."
      );
      setSelectedFile(null);
      return;
    }

    if (file.size > maxFileSize) {
      setErrorMessage(
        "File size exceeds 100 MB. Please upload a smaller video."
      );
      setSelectedFile(null);
      return;
    }

    if (!/\.mp4$|\.mpeg$|\.mov$|\.quicktime$/i.test(file.name)) {
      setErrorMessage(
        "Invalid file type. Please upload an MP4, MPEG, MOV, or QuickTime video."
      );
      setSelectedFile(null);
      return;
    }

    setErrorMessage("");
    setSelectedFile(file);
  }

  //validating uploaded image file
  const [imageFile, setImageFile] = useState(null);
  const [imageErrorMsg, setImageErrorMsg] = useState("");

  function imageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setImageErrorMsg("Please select a file to upload.");
      setImageFile(null);
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/tif",
      "image/tiff",
    ];
    const maxFileSize = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      setImageErrorMsg(
        "Invalid file type. Please upload a PNG, JPEG, TIF OR TIFF image."
      );
      setImageFile(null);
      return;
    }

    if (file.size > maxFileSize) {
      setImageErrorMsg(
        "File size exceeds 10 MB. Please upload a smaller image."
      );
      setImageFile(null);
      return;
    }

    if (!/\.(png|jpe?g|tif|tiff)$/i.test(file.name)) {
      setImageErrorMsg(
        "Invalid file type. Please upload a PNG, JPEG, TIF OR TIFF image."
      );
      setImageFile(null);
      return;
    }

    setImageErrorMsg("");
    setImageFile(file);
  }

  //const [showError, setShowError] = useState(false);

  const handleChange = (index, event) => {
    const values = [...weeks];
    values[index].week[event.target.name] = event.target.value;
    setWeeks(values);
  };

  /*const handleSubmit = (event) => {
    event.preventDefault();
    setShowError(false);

    // check if course content is not empty
    for (let i = 0; i < weeks.length; i++) {
      for (let j = 0; j < weeks[i].week.length; j++) {
        if (weeks[i].week[j] === "") {
          setShowError(true);
          return;
        }
      }
    }

    // if course content is not empty, continue with form submission
    setLoading(true);
    // submit form
  }*/

  const [currentGroup, setCurrentGroup] = useState(0);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
    setVideoPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "input",
      video,
      image,
      inputValues.name,
      inputValues.price,
      inputValues.shortDescription,
      inputValues.longDescription
    );
    console.log("submit");

    const courseContentJSON = JSON.stringify(
      weeks.map((week) => ({ week: week.week }))
    );
    const pointsToLearnJSON = JSON.stringify(
      pointsToLearn.map((point) => ({ point: point.point }))
    );
    const questionsJSON = JSON.stringify(questions);
    setLoading(true);
    const formData = new FormData();
    formData.append("files", video);
    formData.append("files", image);
    formData.append("email", decoded.email);
    formData.append("courseName", inputValues.name);
    formData.append("price", inputValues.price);
    formData.append("shortDescription", inputValues.shortDescription);
    formData.append("longDescription", inputValues.longDescription);
    formData.append("pointsToLearn", pointsToLearnJSON);
    formData.append("pointsSummary", summary);
    formData.append("courseContent", courseContentJSON);
    formData.append("test", questionsJSON);
    formData.append("enrollments", 0);

    const res = await fetch("https://backend-litlab.herokuapp.com/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    console.log("response recieved", data);

    console.log("profile iamge before sendibg", instructorImage);

    const courseData = {
      video: data.video,
      instructorImageURL: instructorImage,
      courseImageURL: data.image.originalname,
      instructorEmail: decoded.email,
      name: inputValues.name,
      price: inputValues.price,
      shortDescription: inputValues.shortDescription,
      longDescription: inputValues.longDescription,
      email: decoded.email,
      instructor: decoded.name,
      courseContent: weeks.map((week) => ({ week: week.week })),
      pointsToLearn: pointsToLearn.map((point) => ({ point: point.point })),
      pointsSummary: summary,
      test: questions,
      enrollments: 0,
      instructorBio: bio,
    };
    setLoading(false);

    console.log("data from client", courseData);
    const response = await fetch(
      "https://backend-litlab.herokuapp.com/courses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      }
    );
    const courses = await response.json();
    console.log("response recived", courses);

    if (response.status === 200) {
      navigate("/", { state: { success: true } });
    }

    console.log("course", courses.course);
    console.log("created course", createdCourse);
  };

  const groups = [
    {
      heading: "General Information",
      items: [
        {
          label: "Name",
          input: (
            <input
              type="text"
              name="name"
              className="form-control"
              value={inputValues.name || ""}
              onChange={handleInputChange}
            />
          ),
        },
        {
          label: "Price",
          input: (
            <input
              type="number"
              name="price"
              className="form-control"
              value={inputValues.price || ""}
              onChange={handleInputChange}
            />
          ),
        },
        {
          label: "Short Description",
          input: (
            <textarea
              name="shortDescription"
              className="form-control"
              value={inputValues.shortDescription || ""}
              onChange={handleInputChange}
            />
          ),
        },
        {
          label: "Long Description",
          input: (
            <textarea
              name="longDescription"
              className="form-control"
              value={inputValues.longDescription || ""}
              onChange={handleInputChange}
            />
          ),
        },
      ],
    },
    {
      heading: "Upload Course Video",
      items: [
        {
          input: (
            <div>
              <div className="input-container d-flex justify-content-center align-items-center file-input mx-auto">
                <p className="fs-4">
                  <i className="bi bi-upload fs-1"></i>
                </p>
                <input
                  type="file"
                  onChange={handleVideoChange}
                  required
                  id="video"
                  className="input-file"
                />
              </div>

              {videoPreview && (
                <div className="mb-5 text-center">
                  <p className="text-primary mt-5 fs-1 file-input-text">
                    Preview video
                  </p>
                  <video controls className="video-preview">
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {videoPreview && (
                <div className="text-center">
                  <button
                    className="btn btn-danger text-center"
                    onClick={(event) => {
                      setVideo(null);
                      setVideoPreview(null);
                    }}
                  >
                    Remove video
                  </button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },
    {
      heading: "Upload Course Image",
      items: [
        {
          input: (
            <div>
              <div className="input-container d-flex justify-content-center align-items-center file-input mx-auto">
                <p className="fs-4">
                  <i className="bi bi-upload fs-1"></i>
                </p>
                <input
                  type="file"
                  onChange={handleImageChange}
                  required
                  id="image"
                  className="input-file"
                />
              </div>
              {imagePreview && (
                <div className="mb-5 text-center">
                  <p className="text-primary mt-5 fs-1">Preview image</p>
                  <img
                    src={imagePreview}
                    className="image-preview"
                    alt="preview"
                  />
                </div>
              )}

              {imagePreview && (
                <div className="text-center">
                  <button
                    className="btn btn-danger text-center"
                    onClick={(event) => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>
          ),
        },
      ],
    },

    {
      heading: "Course Content",
      items: [
        {
          label: "",
          input: (
            <div>
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
            </div>
          ),
        },
      ],
    },
    {
      heading: "Points to Learn",
      items: [
        {
          label: "",
          input: (
            <div className="mx-auto">
              {pointsToLearn.map((point, index) => (
                <div key={index} className="mx-auto text-left">
                  <h4 className="mt-3">Point {index + 1}</h4>
                  <input
                    type="text"
                    id={`point-${index}`}
                    value={point.point}
                    onChange={(e) => handlePointChange(index, e.target.value)}
                    className="form-control w-100 points-input form-item"
                  />
                  {pointErrorMsg && (
                    <div className="text-danger">{pointErrorMsg}</div>
                  )}
                </div>
              ))}
              <h4 className="mt-3">Summary of points</h4>
              <textarea
                type="text"
                placeholder="Summary"
                className="form-control w-100 points-input"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          ),
        },
      ],
    },
    {
      heading: "Final step - create a course for learners",
      items: [
        {
          label: "",
          input: (
            <div ref={modalRef} className="modal-content">
              <span
                className="close position-absolute right-0"
                style={{ right: "20px", top: "5px" }}
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <h2 className="text-center">
                Create a test <img src={testImage} alt="test" width={"8%"} />
              </h2>
              <div>
                <label htmlFor="num-questions">Number of questions:</label>
                <select
                  id="num-questions"
                  value={numQuestions}
                  onChange={handleNumQuestionsChange}
                  className="form-control w-25"
                >
                  <option value=""></option>
                  <option value="1" selected>
                    1
                  </option>
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
                            className="fw-bold fs-4 mt-2 mb-2"
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

                          <h5 className="mt-3 mb-2 fs-4">Options:</h5>
                          {questions[questionIndex].options.map(
                            (option, optionIndex) => (
                              <div key={optionIndex} className="mb-2 ">
                                <label
                                  htmlFor={`question-${questionIndex}-option-${optionIndex}`}
                                  className="mt-2 mb-2"
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
                            className="mt-2 mb-2"
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
                  </div>
                )}
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  const currentGroupItems = groups[currentGroup].items;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    // handle form submission logic
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="text-center fs-2 text-primary">
          {groups[currentGroup].heading}
        </h2>
        {currentGroupItems.map((item) => (
          <div className="form-item" key={item.label}>
            <label className="d-block ">{item.label}</label>
            {item.input}
          </div>
        ))}
        <div className="text-center mt-5">
          <button
            disabled={currentGroup === 0}
            onClick={() => setCurrentGroup(currentGroup - 1)}
            className="btn btn-secondary"
            type="button"
          >
            Previous
          </button>
          {currentGroup !== groups.length - 1 && (
            <button
              disabled={currentGroup === groups.length - 1}
              className="btn btn-primary"
              onClick={() => setCurrentGroup(currentGroup + 1)}
              style={{ marginLeft: "3%" }}
              type="button"
            >
              Next
            </button>
          )}

          {currentGroup === groups.length - 1 && (
            <Button
              className="btn btn-primary"
              style={{ marginLeft: "5%" }}
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
          )}
        </div>
      </form>

      {/* <form onSubmit={onSubmit}>
        <div className="bg-light shadow text-center p-2 fs-2 mb-4">
          <p>Upload your course</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="upload-item">
              <h3 className="fs-2 text-primary file-input-text">
                Upload a course video
              </h3>
              <div class="input-container d-flex  justify-content-center align-items-center file-input">
                <p className="fs-4">
                  <i className="bi bi-upload fs-1"></i>
                </p>
                <input
                  type="file"
                  onChange={handleVideoChange}
                  required
                  id="video"
                  className="input-file"
                />
              </div>
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}

              {videoPreview && (
                <div className="mb-5">
                  <p className="text-primary mt-5 fs-1 file-input-text">
                    Preview video
                  </p>
                  <video controls className="video-preview">
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
            <div className="upload-item">
              <h3 className="fs-2 text-primary file-input-text">
                Upload a course image
              </h3>
              <div class="input-container d-flex  justify-content-center align-items-center file-input">
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
              {imageErrorMsg && (
                <div className="text-danger mt-2">{imageErrorMsg}</div>
              )}

              {imagePreview && (
                <div className="mb-5">
                  <p className="text-primary mt-5 fs-1">Preview image</p>
                  <img
                    src={imagePreview}
                    className="image-preview"
                    alt="preview"
                  />
                </div>
              )}
            </div>
            <h3 className="mt-3 text-primary">
              Specify what people will learn:
            </h3>
            {pointsToLearn.map((point, index) => (
              <div key={index}>
                <h4 className="mt-3">Point {index + 1}</h4>
                <input
                  type="text"
                  id={`point-${index}`}
                  value={point.point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  className="form-control w-50 points-input"
                />
                {pointErrorMsg && (
                  <div className="text-danger">{pointErrorMsg}</div>
                )}
              </div>
            ))}
            <h4 className="mt-3">Summary of points</h4>
            <textarea
              type="text"
              placeholder="Summary"
              className="form-control w-50 points-input"
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
                onKeyUp={handleCourseName}
                autoFocus
              />
              <label for="floatingName">Name</label>
              {courseNameError && (
                <div className="text-danger mt-2">{courseNameError}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                ref={priceRef}
                type="text"
                className="form-control"
                id="floatingPrice"
                placeholder="Price"
                onKeyUp={handlePrice}
                required
              />
              <label for="floatingPrice">Price</label>
              {priceError && (
                <div className="text-danger mt-2">{priceError}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                ref={shortDescr}
                type="text"
                className="form-control"
                id="floatingDescription"
                placeholder="Description"
                onKeyUp={handleShortDes}
                required
              />
              <label for="floatingDescription">Short Description</label>
              {shortDesError && (
                <div className="text-danger mt-2">{shortDesError}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                ref={longDescr}
                type="text"
                className="form-control"
                id="floatingDescription"
                placeholder="Description"
                onKeyUp={handleLongDes}
                required
              />
              <label for="floatingDescription">Long Description</label>
              {longDesError && (
                <div className="text-danger mt-2">{longDesError}</div>
              )}
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
            <button
              className="btn btn-success btn-lg"
              onClick={(e) => {
                setShowModal(true);
                e.preventDefault();
              }}
            >
              Create a test
            </button>
          </div>
          <Button
            className="btn btn-lg btn-primary mb-3 w-25 mx-auto mt-3 d-flex justify-content-center mt-5"
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
      </form> */}
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
            <h2 className="text-center">
              Create a test <img src={testImage} alt="test" width={"8%"} />
            </h2>
            <div>
              <label htmlFor="num-questions">Number of questions:</label>
              <select
                id="num-questions"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                className="form-control w-25"
              >
                <option value=""></option>
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              {numQuestions > 0 && (
                <div>
                  <h2>Questions:</h2>
                  {Array.from({ length: numQuestions }, (_, questionIndex) => (
                    <div key={questionIndex}>
                      <label
                        htmlFor={`question-${questionIndex}`}
                        className="fw-bold fs-4 mt-2 mb-2"
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

                      <h5 className="mt-3 mb-2 fs-4">Options:</h5>
                      {questions[questionIndex].options.map(
                        (option, optionIndex) => (
                          <div key={optionIndex} className="mb-2 ">
                            <label
                              htmlFor={`question-${questionIndex}-option-${optionIndex}`}
                              className="mt-2 mb-2"
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
                        className="mt-2 mb-2"
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
                  ))}
                  <div className="text-center">
                    <button
                      className="btn btn-primary mt-3 btn-lg"
                      onClick={() => setShowModal(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseUpload;
