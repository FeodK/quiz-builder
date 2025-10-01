"use client";

import React from "react";
import { Quiz, HeadingProperties, QuestionProperties, ButtonProperties, FooterProperties } from "@/types/quiz";
import { HeadingBlock } from "./blocks/HeadingBlock";
import { QuestionBlock } from "./blocks/QuestionBlock";
import { ButtonBlock } from "./blocks/ButtonBlock";
import { FooterBlock } from "./blocks/FooterBlock";
import { Button } from "@/components/ui/Button/Button";

interface QuizRendererProps {
  quiz: Quiz;
}

export const QuizRenderer: React.FC<QuizRendererProps> = ({ quiz }) => {
  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-6xl mb-4">❓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
        <p className="text-gray-600 mb-6">
          The quiz you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  if (!quiz.published) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Published</h1>
        <p className="text-gray-600 mb-6">
          This quiz has not been published yet. Please check back later.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {quiz.title}
        </h1>

        <div className="space-y-6">
          {quiz.blocks.map((block) => {
            switch (block.type) {
              case "heading":
                return <HeadingBlock key={block.id} {...(block.properties as HeadingProperties)} />;
              case "question":
                return <QuestionBlock key={block.id} id={block.id} {...(block.properties as QuestionProperties)} />;
              case "button":
                return <ButtonBlock key={block.id} {...(block.properties as ButtonProperties)} />;
              case "footer":
                return <FooterBlock key={block.id} {...(block.properties as FooterProperties)} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};