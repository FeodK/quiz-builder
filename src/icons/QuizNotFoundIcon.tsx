import React from "react";

export const QuizNotFoundIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    stroke="currentColor"
  >
    <circle cx="32" cy="32" r="30" strokeWidth={2} />
    <text
      x="32"
      y="40"
      textAnchor="middle"
      fontSize="28"
      fontWeight="bold"
      fill="currentColor"
    >
      ?
    </text>
  </svg>
);
