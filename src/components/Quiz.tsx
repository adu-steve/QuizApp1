// src/Quiz.tsx
import React, { useState, useEffect } from "react";
import "./Quiz.css"; // Import the external CSS file
import { ReactComponent as HtmlIcon } from "../assets/icon-html.svg";
import { ReactComponent as CSSIcon } from "../assets/icon-css.svg";
import { ReactComponent as JSIcon } from "../assets/icon-js.svg";
import { ReactComponent as AccessIcon } from "../assets/icon-accessibility.svg";
interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  quiz: {
    title: string;
    questions: Question[];
  };
  theme: "light" | "dark";
  onReturn: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, theme, onReturn }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [highlightedOption, setHighlightedOption] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setHighlightedOption((prev) =>
          prev < currentQuestion.options.length - 1 ? prev + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedOption((prev) =>
          prev > 0 ? prev - 1 : currentQuestion.options.length - 1
        );
      } else if (event.key === "Enter") {
        if (currentQuestion && currentQuestion.options[highlightedOption])
          handleAnswerSelect(currentQuestion.options[highlightedOption]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedOption, currentQuestion]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setErrorMessage("Please give an answer");
    } else {
      setShowResult(true);
      if (selectedAnswer === currentQuestion.answer) {
        setScore(score + 1);
      }
    }
  };

  const getIcon = (title: string) => {
    const iconColors = {
      HTML: "#FFF1E9",
      CSS: "#E0FDEF",
      JavaScript: "#EBF0FF",
      Accessibility: "#F6E7FF",
    };

    switch (title) {
      case "HTML":
        return (
          <div
            className="icon-box"
            style={{ backgroundColor: iconColors.HTML }}
          >
            <HtmlIcon />
          </div>
        );
      case "CSS":
        return (
          <div className="icon-box" style={{ backgroundColor: iconColors.CSS }}>
            <CSSIcon />
          </div>
        );
      case "JavaScript":
        return (
          <div
            className="icon-box"
            style={{ backgroundColor: iconColors.JavaScript }}
          >
            <JSIcon />
          </div>
        );
      case "Accessibility":
        return (
          <div
            className="icon-box"
            style={{ backgroundColor: iconColors.Accessibility }}
          >
            <AccessIcon />
          </div>
        );
      default:
        return null;
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setHighlightedOption(0);
    setShowResult(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setErrorMessage("");
  };

  return (
    <div className={`quiz-container ${theme}`}>
      <h2>
        {getIcon(quiz.title)}
        {quiz.title}
      </h2>
      {currentQuestion ? (
        <div className="question-container">
          <div className="questions">
            <div className="qtn-number">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
            <div className="question">{currentQuestion.question}</div>
          </div>
          <div className="optionsDiv">
            <div className="options-container">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isHighlighted = index === highlightedOption;
                const isCorrect =
                  showResult && option === currentQuestion.answer;
                const isWrong =
                  showResult && isSelected && option !== currentQuestion.answer;
                const optionLetter = String.fromCharCode(65 + index);
                return (
                  <div
                    key={index}
                    className={`option-button ${isSelected ? "selected" : ""} ${
                      isHighlighted ? "highlighted" : ""
                    } ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <span>{optionLetter}</span>. {option}
                  </div>
                );
              })}
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {showResult && selectedAnswer !== currentQuestion.answer && (
              <div className="correct-answer-text">
                Correct answer: {currentQuestion.answer}
              </div>
            )}
            {showResult ? (
              <div className="submit-button" onClick={handleNextQuestion}>
                Next Question
              </div>
            ) : (
              <div className="submit-button" onClick={handleSubmit}>
                Submit Answer
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-completed">
          <h3>You've completed the quiz!</h3>
          <p style={{ color: "#9d53c3" }}>
            Your score: {score} out of {quiz.questions.length}
          </p>
          <button className="return-button" onClick={onReturn}>
            Return to Quiz Options
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
