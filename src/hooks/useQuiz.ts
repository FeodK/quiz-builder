import { useState, useCallback, useEffect } from "react";
import { Quiz } from "@/types/quiz";
import { QuizService } from "@/services/quizService";

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const refreshQuizzes = useCallback(() => {
    if (typeof window !== "undefined") {
      setQuizzes(QuizService.getAllQuizzes());
    }
  }, []);

  useEffect(() => {
    refreshQuizzes();
  }, [refreshQuizzes]);

  const createQuiz = useCallback(
    (title: string) => {
      const newQuiz = QuizService.createQuiz(title);
      refreshQuizzes();
      return newQuiz;
    },
    [refreshQuizzes]
  );

  const updateQuiz = useCallback(
    (quiz: Quiz) => {
      QuizService.updateQuiz(quiz);
      refreshQuizzes();
    },
    [refreshQuizzes]
  );

  const publishQuiz = useCallback(
    (quizId: string) => {
      QuizService.publishQuiz(quizId);
      refreshQuizzes();
    },
    [refreshQuizzes]
  );

  const deleteQuiz = useCallback(
    (quizId: string) => {
      QuizService.deleteQuiz(quizId);
      refreshQuizzes();
    },
    [refreshQuizzes]
  );

  return {
    quizzes,
    createQuiz,
    updateQuiz,
    publishQuiz,
    deleteQuiz,
    refreshQuizzes,
  };
};
