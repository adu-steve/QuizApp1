// src/Frontend.tsx
import React, { useState } from "react";
import { ReactComponent as HtmlIcon } from "../assets/icon-html.svg";
import { ReactComponent as CSSIcon } from "../assets/icon-css.svg";
import { ReactComponent as JSIcon } from "../assets/icon-js.svg";
import { ReactComponent as AccessIcon } from "../assets/icon-accessibility.svg";
import { ReactComponent as MoonDarkIcon } from "../assets/icon-moon-dark.svg";
import { ReactComponent as MoonLightIcon } from "../assets/icon-moon-light.svg";
import { ReactComponent as SunLightIcon } from "../assets/icon-sun-light.svg";
import { ReactComponent as SunDarkIcon } from "../assets/icon-sun-dark.svg";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  return (
    <div className={`app-container ${theme}`}>
      <div className="theme-Div">
        <div className="theme-icon">
          {theme === "dark" ? <SunLightIcon /> : <SunDarkIcon />}
        </div>
        <label className="switch">
          <input
            type="checkbox"
            className="toggle-btn"
            onClick={toggleTheme}
          ></input>
          <span className="slider round"></span>
        </label>
        <div className="theme-icon">
          {theme === "dark" ? <MoonLightIcon /> : <MoonDarkIcon />}
        </div>
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
                <div
                  key={index}
                  className={`card ${theme}`}
                  onClick={() => handleQuizSelect(index)}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  <div className="card-icon">{getIcon(quiz.title)}</div>
                  <span style={{ marginLeft: "10px" }}>{quiz.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Frontend;
