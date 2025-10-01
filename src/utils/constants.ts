import { HeadingIcon, QuestionIcon, ButtonIcon, FooterIcon } from "@/icons";
import {
  HeadingProperties,
  QuestionProperties,
  ButtonProperties,
  FooterProperties,
} from "@/types/quiz";

export const STORAGE_KEYS = {
  QUIZZES: "quizbuilder.quizzes",
  INITIALIZED: "quizbuilder.initialized",
} as const;

export enum BlockType {
  Heading = "heading",
  Question = "question",
  Button = "button",
  Footer = "footer",
}

export const BLOCK_TYPES = [
  {
    type: BlockType.Heading,
    label: "Heading",
    icon: HeadingIcon,
    description: "Add section titles",
  },
  {
    type: BlockType.Question,
    label: "Question",
    icon: QuestionIcon,
    description: "Add questions with different types",
  },
  {
    type: BlockType.Button,
    label: "Button",
    icon: ButtonIcon,
    description: "Add navigation buttons",
  },
  {
    type: BlockType.Footer,
    label: "Footer",
    icon: FooterIcon,
    description: "Add footer content",
  },
] as const;

export const DEFAULT_PROPERTIES = {
  heading: { text: "New Heading", level: 2 } as HeadingProperties,
  question: {
    question: "New Question",
    type: "single",
    options: ["Option 1", "Option 2"],
    required: false,
  } as QuestionProperties,
  button: { text: "Next", action: "next" } as ButtonProperties,
  footer: { text: "Footer text" } as FooterProperties,
};
