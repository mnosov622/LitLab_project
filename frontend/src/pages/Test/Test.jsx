import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import jwtDecode from "jwt-decode";

const Question = ({
  question,
  options,
  correctOption,
  handleCorrectAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption === correctOption) {
      console.log("correct");
      handleCorrectAnswer();
    } else {
      console.log("bad");
    }
  };

  return (
    <div className="mt-5 pb-3">
      <h3 className="border-bottom">{question}</h3>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name={option}
            id={option}
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionClick(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
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

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
  };
  useEffect(() => {
    //If users answers all questions correctly, make a PUT request to set the value of Completed to true
    if (correctAnswers === totalQuestions) {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:8000/users/${userEmail}/courses/${id}`,
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

        console.log(response);
        if (!response.ok) {
          console.log("error");
          throw new Error(response.statusText);
        }
      };
      fetchData();
    }
  }, [totalQuestions, correctAnswers]);

  setTimeout(() => {
    setIsRunning(false);
  }, 3000);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.course.test);
        setLoading(false);
        console.log(data);
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
          <p className="fs-1 text-center mb-5 d-flex justify-content-center align-items-center text-primary">
            Complete a test to get certificate &nbsp;&nbsp;
            <i className="bi bi-patch-check"></i>
          </p>
          {question.map((question, index) => (
            <>
              <Question
                key={index}
                question={question.question}
                options={question.options}
                correctOption={question.correctAnswer}
                handleCorrectAnswer={handleCorrectAnswer}
              />
            </>
          ))}
          {correctAnswers === totalQuestions && (
            <>
              {/* {running && <Confetti run={3000} shape="circle" />} */}

              <p className="text-success">
                You have answered all questions correctly!
              </p>
              <Link
                to={`/certificate/${id}`}
                role="button"
                className="btn btn-primary mb-3"
              >
                Get Certificate
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
