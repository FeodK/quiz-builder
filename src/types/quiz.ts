export interface QuizBlock {
  id: string;
  type: "heading" | "question" | "button" | "footer";
  properties: HeadingProperties | QuestionProperties | ButtonProperties | FooterProperties;
}

export interface Quiz {
  id: string;
  title: string;
  blocks: QuizBlock[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionProperties {
  question: string;
  type: 'single' | 'multi' | 'text';
  options?: string[];
  required?: boolean;
}

export interface HeadingProperties {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ButtonProperties {
  text: string;
  action: 'next' | 'submit';
}

export interface FooterProperties {
  text: string;
}