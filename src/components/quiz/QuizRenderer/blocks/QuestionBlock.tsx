import React from "react";
import { QuestionProperties } from "@/types/quiz";

interface QuestionBlockProps extends QuestionProperties {
  id: string;
}

export const QuestionBlock: React.FC<QuestionBlockProps> = ({
  id,
  question,
  type = "single",
  options = [],
  required = false,
}) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <label className="block text-lg font-medium text-gray-900 mb-4">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "single" && (
        <div className="space-y-3">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name={`question-${id}`}
                className="mr-3 h-4 w-4 text-blue-600"
                required={required}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {type === "multi" && (
        <div className="space-y-3">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-3 h-4 w-4 text-blue-600"
                required={required}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {type === "text" && (
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Type your answer here..."
          required={required}
        />
      )}
    </div>
  );
};