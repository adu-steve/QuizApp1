import React from "react";
import "./Toggle.css";

interface ToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <button
      className={`toggle-container ${isLight ? "light" : "dark"}`}
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="toggle-svg-1"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="toggle-svg-2"
      >
        <path d="M21 12.79A9 9 0 0112.21 3a9 9 0 001 18 9 9 0 018-8.21z" />
      </svg>
    </button>
  );
};

export default Toggle;
