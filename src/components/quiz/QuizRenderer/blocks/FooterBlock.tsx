import React from "react";
import { FooterProperties } from "@/types/quiz";

export const FooterBlock: React.FC<FooterProperties> = ({ text }) => {
  return (
    <footer className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-200">
      {text}
    </footer>
  );
};