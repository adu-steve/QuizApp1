// src/Frontend.tsx
import React, { useState } from "react";
import { ReactComponent as HtmlIcon } from "../assets/icon-html.svg";
import { ReactComponent as CSSIcon } from "../assets/icon-css.svg";
import { ReactComponent as JSIcon } from "../assets/icon-js.svg";
import { ReactComponent as AccessIcon } from "../assets/icon-accessibility.svg";

import Quiz from "./Quiz";
import data from "../data.json";
import "./App.css";

interface QuizData {
  title: string;
  questions: { question: string; options: string[]; answer: string }[];
  icon: string;
}

const Frontend: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleQuizSelect = (quizIndex: number) => {
    setSelectedQuiz(data.quizzes[quizIndex]);
  };

  const handleReturn = () => {
    setSelectedQuiz(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const getIcon = (title: string) => {
    switch (title) {
      case "HTML":
        return <HtmlIcon />;
      case "CSS":
        return <CSSIcon />;
      case "JavaScript":
        return <JSIcon />;
      case "Accessibility":
        return <AccessIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        <span style={{ marginLeft: "10px" }}>
          Toggle {theme === "dark" ? "Light" : "Dark"} Theme
        </span>
      </div>

      {selectedQuiz ? (
        <Quiz quiz={selectedQuiz} theme={theme} onReturn={handleReturn} />
      ) : (
        <div className="main-content">
          <div className="title-container">
            <header className="header">
              <h1 className="title">
                Welcome to the
                <br />
                <span className="quiz-title">Frontend Quiz!</span>
              </h1>
            </header>
            <h3>Pick a subject to get started.</h3>
          </div>

          <div className="card-container">
            <div className="cards">
              {data.quizzes.map((quiz, index) => (
                <button
                  key={index}
                  className={`card ${theme}`}
                  onClick={() => handleQuizSelect(index)}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {getIcon(quiz.title)}
                  <span style={{ marginLeft: "10px" }}>{quiz.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Frontend;
