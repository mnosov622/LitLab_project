import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import jwtDecode from "jwt-decode";
import { Card, Button, Form } from "react-bootstrap";

const Question = ({
  question,
  options,
  index,
  onNext,
  onPrev,
  onSubmit,
  correctOption,
  handleCorrectAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption === correctOption) {
      handleCorrectAnswer();
    } else {
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedOption);
  };

  return (
    <div
      style={{
        width: "80%",
        maxWidth: "1000px",
        padding: "2rem",
        margin: "2rem auto",
        backgroundColor: "#f7f7f7",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      className="flex items-center"
    >
      <div style={{ textAlign: "center" }}>
        {/* <h2>{question}</h2>
        {options.map((option, index) => (
          <div key={index} style={{ margin: "auto", width: "100%" }}>
            <input
              type="radio"
              name={option}
              value={option}
              id={option}
              checked={selectedOption === option}
              onChange={() => handleOptionClick(option)}
              style={{ width: "1.5em", transform: "scale(1.5)" }}
            />
            <label htmlFor={option} style={{ fontSize: "20px" }}>
              {option}
            </label>
          </div>
        ))} */}
        {selectedOption && (
          <p>
            {selectedOption === correctOption ? (
              <>
                <p className="text-success">Correct!</p>
              </>
            ) : (
              <>
                <p className="text-danger">Incorrect, try again.</p>
              </>
            )}
          </p>
        )}
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{
            padding: "5px",
            paddingLeft: "15px",
            paddingRight: "15px",
            margin: "5px",
          }}
          onClick={onPrev}
        >
          Prev
        </button>
        <button
          className="btn btn-primary"
          style={{
            padding: "5px",
            paddingLeft: "15px",
            paddingRight: "15px",
            margin: "5px",
          }}
          onClick={onNext}
        >
          Next
        </button>
      </div>
      <div>
        <button
          className="btn btn-secondary"
          style={{
            padding: "5px",
            paddingLeft: "15px",
            paddingRight: "15px",
            margin: "5px",
          }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Test = () => {
  const [question, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const totalQuestions = question.length;
  const [running, setIsRunning] = useState(true);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { id } = useParams();
  const userEmail = decoded.email;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (selectedOption, correctOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption === correctOption) {
      handleCorrectAnswer();
    } else {
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const questions = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
  //   },
  //   {
  //     question: 'What is the largest planet in our solar system?',
  //     options: ['Jupiter', 'Saturn', 'Mars', 'Venus'],
  //   },
  //   // Add more questions here
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(question.length).fill(null));

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setSelectedOption(null);
    setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answer;
    setSelectedAnswers(newAnswers);
    if (currentIndex < question.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    // handle submission here
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
  };
  useEffect(() => {
    //If users answers all questions correctly, make a PUT request to set the value of Completed to true
    if (correctAnswers === totalQuestions) {
      const fetchData = async () => {
        const response = await fetch(
          `https://litlab-backend.vercel.app/users/${userEmail}/courses/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: userEmail,
              courseId: id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }
      };
      fetchData();
    }
  }, [totalQuestions, correctAnswers]);

  useEffect(() => {
    if (question.length === 0) {
      fetch(`https://litlab-backend.vercel.app/users/${userEmail}/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          courseId: id,
        }),
      });
    }
  }, []);
  setTimeout(() => {
    setIsRunning(false);
  }, 3000);

  useEffect(() => {
    setLoading(true);
    fetch(`https://litlab-backend.vercel.app/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.course.test);
        setLoading(false);
      });
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
          {question.length > 0 ? (
            <>
              <p
                className={`fs-1 text-center mb-5 d-flex justify-content-center align-items-center text-primary  ${
                  correctAnswers === totalQuestions && "d-none"
                }`}
              >
                Complete a test to get certificate &nbsp;&nbsp;
                <i className="bi bi-patch-check"></i>
              </p>
              <div className={`${correctAnswers === totalQuestions && "d-none"}`}>
                <div className="form-item question" key={question[currentIndex].question}>
                  <h2 className="mb-3">{question[currentIndex].question}</h2>
                  {question[currentIndex].options.map((option) => (
                    <>
                      <div className="mb-2 d-flex align-items-center">
                        <input
                          type="radio"
                          name={option}
                          value={option}
                          id={option}
                          checked={selectedOption === option}
                          onChange={() =>
                            handleOptionClick(option, question[currentIndex].correctAnswer)
                          }
                          style={{ width: "1.5em", transform: "scale(1.5)" }}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    </>
                  ))}
                  {selectedOption && (
                    <p>
                      {selectedOption === question[currentIndex].correctAnswer ? (
                        <>
                          <p className="text-success">Correct!</p>
                        </>
                      ) : (
                        <>
                          <p className="text-danger">Incorrect, try again.</p>
                        </>
                      )}
                    </p>
                  )}

                  {question[currentIndex].input}
                </div>

                <div className="text-center mt-5 mb-5">
                  <button
                    className="btn btn-secondary"
                    style={{ marginRight: "3%" }}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={
                      currentIndex === question.length - 1 ||
                      selectedOption !== question[currentIndex].correctAnswer
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="fs-1 text-center mb-5 d-flex justify-content-center align-items-center text-primary">
                Content Creator didn't create a test
              </p>
              <div className="text-center">
                <Link
                  to={`/certificate/${id}`}
                  role="button"
                  className="btn btn-primary btn-lg mb-3"
                >
                  Get Certificate
                </Link>
              </div>
            </>
          )}

          {correctAnswers === totalQuestions && (
            <>
              {/* {running && <Confetti run={3000} shape="circle" />} */}
              <div className="text-center mt-5 mb-5">
                <p className="text-success fs-2">You have answered all questions correctly!</p>
                <Link
                  to={`/certificate/${id}`}
                  role="button"
                  className="btn btn-lg btn-primary mb-3 mt-4 "
                >
                  Get Certificate
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
