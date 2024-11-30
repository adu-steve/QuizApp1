// src/Quiz.tsx
import React, { useState, useEffect } from "react";
import "./Quiz.css"; // Import the external CSS file

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

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setHighlightedOption(0);
    setShowResult(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setErrorMessage("");
  };

  return (
    <div className={`quiz-container ${theme}`}>
      <h2>{quiz.title}</h2>
      {currentQuestion ? (
        <div className="question-container">
          <div className="question-number">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
          <h3>{currentQuestion.question}</h3>
          <div className="options-container">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isHighlighted = index === highlightedOption;
              const isCorrect = showResult && option === currentQuestion.answer;
              const isWrong =
                showResult && isSelected && option !== currentQuestion.answer;

              return (
                <button
                  key={index}
                  className={`option-button ${isSelected ? "selected" : ""} ${
                    isHighlighted ? "highlighted" : ""
                  } ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {showResult && selectedAnswer !== currentQuestion.answer && (
            <div className="correct-answer-text">
              Correct answer: {currentQuestion.answer}
            </div>
          )}
          {showResult ? (
            <button className="submit-button" onClick={handleNextQuestion}>
              Next Question
            </button>
          ) : (
            <button className="submit-button" onClick={handleSubmit}>
              Submit Answer
            </button>
          )}
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
