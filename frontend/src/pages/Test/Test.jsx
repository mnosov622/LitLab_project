import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="mt-5 border-bottom pb-3">
      <h3>{question}</h3>
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

  const [correctAnswers, setCorrectAnswers] = useState(null);
  const totalQuestions = question.length;

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
  };

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.course.test);
      });
  }, []);
  return (
    <div>
      <p className="fs-1 text-center mb-5 d-flex justify-content-center align-items-center text-primary">
        Complete a test to get certificate &nbsp;&nbsp;
        <i class="bi bi-patch-check"></i>
      </p>
      {}
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
        <p className="text-success">
          You have answered all questions correctly!
        </p>
      )}
    </div>
  );
};

export default Test;
