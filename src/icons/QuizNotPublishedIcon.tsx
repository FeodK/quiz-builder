import React from "react";

export const QuizNotPublishedIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    stroke="currentColor"
  >
    <circle cx="32" cy="32" r="30" strokeWidth={2} />
    <line x1="20" y1="20" x2="44" y2="44" strokeWidth={3} stroke="currentColor" strokeLinecap="round"/>
    <line x1="44" y1="20" x2="20" y2="44" strokeWidth={3} stroke="currentColor" strokeLinecap="round"/>
  </svg>
);
