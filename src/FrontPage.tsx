import React, { useState } from "react";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import Quiz from "./components/Quiz";
import data from "./data.json";

// Define the type for the theme
interface Theme {
  background: string;
  color: string;
  cardBackground: string;
  cardHover: string;
  buttonBackground: string;
  buttonHover: string;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  title: string;
  questions: Question[];
}

const lightTheme: Theme = {
  background: "#f9f9f9",
  color: "#333",
  cardBackground: "#fff",
  cardHover: "#e0e0e0",
  buttonBackground: "#007bff",
  buttonHover: "#0056b3",
};

const darkTheme: Theme = {
  background: "#27296d",
  color: "#f9f9f9",
  cardBackground: "#444",
  cardHover: "#555",
  buttonBackground: "#007bff",
  buttonHover: "#0056b3",
};

// Define the types for the props
interface AppProps {
  theme: DefaultTheme;
}

const AppContainer = styled.div<AppProps>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  transition: all 0.3s;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
`;

const QuizTitle = styled.span`
  color: #9d53c3};
  font-weight: bold;
`;

const CardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

const Card = styled.button<AppProps>`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.color};
  padding: 20px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  flex: 1;

  &:hover {
    background-color: #9d53c3};
  }
`;

const ThemeToggle = styled.div<AppProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9d53c3;
  color: white;
  padding: 5px 10px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
  align-self: center;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface QuizData {
  title: string;
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

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <AppContainer theme={theme === "dark" ? darkTheme : lightTheme}>
        <ThemeToggle
          theme={theme === "dark" ? darkTheme : lightTheme}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
          <span style={{ marginLeft: "10px" }}>
            Toggle {theme === "dark" ? "Light" : "Dark"} Theme
          </span>
        </ThemeToggle>
        {selectedQuiz ? (
          <Quiz quiz={selectedQuiz} theme={theme} onReturn={handleReturn} />
        ) : (
          <MainContent>
            <TitleContainer>
              <Header>
                <Title>
                  Welcome to the <QuizTitle>Frontend Quiz!</QuizTitle>
                </Title>
              </Header>
            </TitleContainer>
            <CardContainer>
              <h3>Pick a subject to get started.</h3>
              <Cards>
                {data.quizzes.map((quiz, index) => (
                  <Card
                    key={index}
                    onClick={() => handleQuizSelect(index)}
                    theme={theme === "dark" ? darkTheme : lightTheme}
                  >
                    {quiz.title}
                  </Card>
                ))}
              </Cards>
            </CardContainer>
          </MainContent>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default Frontend;
