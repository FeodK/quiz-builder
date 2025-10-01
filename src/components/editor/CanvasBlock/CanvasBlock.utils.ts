import {
  QuizBlock,
  HeadingProperties,
  QuestionProperties,
  ButtonProperties,
  FooterProperties,
} from "@/types/quiz";
import { BlockType } from "@/utils/constants";

export const getBlockPreview = (block: QuizBlock): string => {
  switch (block.type) {
    case BlockType.Heading:
      return (block.properties as HeadingProperties).text || "No text";
    case BlockType.Question:
      return (block.properties as QuestionProperties).question || "No question";
    case BlockType.Button:
      return (block.properties as ButtonProperties).text || "No text";
    case BlockType.Footer:
      return (block.properties as FooterProperties).text || "No text";
    default:
      return "Unknown block";
  }
};
