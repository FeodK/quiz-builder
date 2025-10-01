"use client";

import {
  QuizBlock,
  HeadingProperties,
  QuestionProperties,
  ButtonProperties,
  FooterProperties,
} from "@/types/quiz";
import { HeadingPropertiesPanel } from "./blocks/HeadingPropertiesPanel";
import { QuestionPropertiesPanel } from "./blocks/QuestionPropertiesPanel";
import { ButtonPropertiesPanel } from "./blocks/ButtonPropertiesPanel";
import { FooterPropertiesPanel } from "./blocks/FooterPropertiesPanel";

interface PropertiesPanelProps {
  block: QuizBlock | null;
  onUpdateBlock: (block: QuizBlock) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  block,
  onUpdateBlock,
}) => {
  if (!block) {
    return (
      <div className="text-center text-gray-500 py-8">
        <div className="text-4xl mb-2">⚙️</div>
        <p className="text-sm">Select a block to edit its properties</p>
      </div>
    );
  }

  const handleChange = (
    updates: Partial<
      | HeadingProperties
      | QuestionProperties
      | ButtonProperties
      | FooterProperties
    >
  ) => {
    onUpdateBlock({
      ...block,
      properties: { ...block.properties, ...updates },
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Block Properties
      </h3>
      <div className="space-y-6">
        {block.type === "heading" && (
          <HeadingPropertiesPanel
            properties={block.properties as HeadingProperties}
            onChange={handleChange}
          />
        )}
        {block.type === "question" && (
          <QuestionPropertiesPanel
            properties={block.properties as QuestionProperties}
            onChange={handleChange}
          />
        )}
        {block.type === "button" && (
          <ButtonPropertiesPanel
            properties={block.properties as ButtonProperties}
            onChange={handleChange}
          />
        )}
        {block.type === "footer" && (
          <FooterPropertiesPanel
            properties={block.properties as FooterProperties}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};
