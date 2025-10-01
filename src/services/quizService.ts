import { Quiz } from "@/types/quiz";
import { StorageService } from "./storage";
import { v4 as uuidv4 } from "uuid";

export class QuizService {
  static seedInitialQuizzes(): void {
    if (StorageService.isInitialized()) return;

    const initialQuizzes: Quiz[] = [
      {
        id: "sample-math-quiz",
        title: "Sample Math Quiz",
        blocks: [
          {
            id: "math-heading-1",
            type: "heading",
            properties: { text: "Welcome to Math Quiz", level: 1 },
          },
          {
            id: "math-question-1",
            type: "question",
            properties: {
              question: "What is 2 + 2?",
              type: "single",
              options: ["3", "4", "5"],
              required: true,
            },
          },
          {
            id: "math-button-1",
            type: "button",
            properties: { text: "Next Question", action: "next" },
          },
        ],
        published: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
      {
        id: "programming-quiz",
        title: "Programming Knowledge Test",
        blocks: [
          {
            id: "prog-heading-1",
            type: "heading",
            properties: { text: "Programming Quiz", level: 2 },
          },
          {
            id: "prog-question-1",
            type: "question",
            properties: {
              question: "Which language runs in a web browser?",
              type: "single",
              options: ["Java", "C", "JavaScript", "Python"],
              required: true,
            },
          },
        ],
        published: false,
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02"),
      },
    ];

    StorageService.saveQuizzes(initialQuizzes);
    StorageService.markAsInitialized();
  }

  static getAllQuizzes(): Quiz[] {
    let quizzes = StorageService.getQuizzes();

    const isInvalid =
      !Array.isArray(quizzes) || quizzes.some((q) => !this.validateQuiz(q));

    if (!quizzes.length || isInvalid) {
      console.warn("No valid quizzes found. Loading default quizzes...");
      this.seedInitialQuizzes();
      quizzes = StorageService.getQuizzes();
    }

    return quizzes.map((q) => ({
      ...q,
      blocks: Array.isArray(q.blocks) ? q.blocks : [],
      createdAt: new Date(q.createdAt),
      updatedAt: new Date(q.updatedAt),
    }));
  }

  static getQuizById(id: string): Quiz | undefined {
    return this.getAllQuizzes().find((q) => q.id === id);
  }

  static createQuiz(title?: string): Quiz {
    const newQuiz: Quiz = {
      id: uuidv4(),
      title: title?.trim() || "New Quiz",
      blocks: [],
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const quizzes = this.getAllQuizzes();
    quizzes.push(newQuiz);
    StorageService.saveQuizzes(quizzes);
    return newQuiz;
  }

  static updateQuiz(updated: Quiz): void {
    const quizzes = this.getAllQuizzes();
    const idx = quizzes.findIndex((q) => q.id === updated.id);
    if (idx === -1) throw new Error("Quiz not found");

    quizzes[idx] = { ...updated, updatedAt: new Date() };
    StorageService.saveQuizzes(quizzes);
  }

  static deleteQuiz(quizId: string): void {
    const quizzes = this.getAllQuizzes().filter((q) => q.id !== quizId);
    StorageService.saveQuizzes(quizzes);
  }

  static publishQuiz(quizId: string): void {
    const quizzes = this.getAllQuizzes();
    const idx = quizzes.findIndex((q) => q.id === quizId);
    if (idx === -1) throw new Error("Quiz not found");

    quizzes[idx] = { ...quizzes[idx], published: true, updatedAt: new Date() };
    StorageService.saveQuizzes(quizzes);
  }

  static validateQuiz(quiz: Quiz): boolean {
    return (
      !!quiz.id &&
      !!quiz.title &&
      Array.isArray(quiz.blocks) &&
      quiz.blocks.every(
        (b) => !!b.id && !!b.type && typeof b.properties === "object"
      )
    );
  }
}
