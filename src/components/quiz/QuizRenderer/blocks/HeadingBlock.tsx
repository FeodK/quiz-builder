import React, { JSX } from "react";
import { HeadingProperties } from "@/types/quiz";

export const HeadingBlock: React.FC<HeadingProperties> = ({ text, level = 2 }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className="text-2xl font-bold text-gray-900 mb-6 text-center">
      {text}
    </HeadingTag>
  );
};