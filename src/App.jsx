import React, { useState } from "react";
import "./App.css";

const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborghinis",
    ],
    answer: "Hypertext Markup Language",
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995",
  },
  {
    question: "How do we set the default width of the font in CSS ?",
    options:["font-stretch","font-weight","text-transform","font-variant"],
    answer: "font-stretch",
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const totalScore = quizData.length;

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;
    setAnswers(updatedAnswers);

    // Update score only if the selected option is correct and not already answered
    if (selectedOption === quizData[currentQuestion].answer && !answers[currentQuestion]) {
      setScore(score + 1);
    }

    // Move to the next question
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleSubmit = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;
    setAnswers(updatedAnswers);

    if (selectedOption === quizData[currentQuestion].answer && !answers[currentQuestion]) {
      setScore(score + 1);
    }

    setShowScore(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswers(Array(quizData.length).fill(null));
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <h1 className="quiz-title">QUIZ APP</h1>
        {showScore ? (
          <div className="score-section">
            <p>Your Score: {score}</p>
            <p>Total Score: {totalScore}</p>
            <button onClick={handleRetry} className="retry-btn">
              Try Again
            </button>
          </div>
        ) : (
          <div>
            <div className="question-section">
              <p className="question-text">
                {currentQuestion + 1}. {quizData[currentQuestion].question}
              </p>
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className={`option-btn ${
                    selectedOption === option ? "selected" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="navigation-buttons">
              <button
                onClick={handlePrevious}
                className="prev-btn"
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              {currentQuestion + 1 === quizData.length ? (
                <button
                  onClick={handleSubmit}
                  className="submit-btn"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="next-btn"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
