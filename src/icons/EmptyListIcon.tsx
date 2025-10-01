import React from "react";

export const EmptyListIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
  >
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="4"
      stroke="#9CA3AF"
      strokeWidth="2"
      fill="#F9FAFB"
    />
    <line
      x1="16"
      y1="20"
      x2="48"
      y2="20"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="32"
      x2="48"
      y2="32"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="44"
      x2="48"
      y2="44"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="20" r="2" fill="#9CA3AF" />
    <circle cx="12" cy="32" r="2" fill="#9CA3AF" />
    <circle cx="12" cy="44" r="2" fill="#9CA3AF" />
  </svg>
);
