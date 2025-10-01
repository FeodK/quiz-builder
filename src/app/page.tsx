"use client";

import { useRouter } from "next/navigation";
import { QuizList } from "@/components/quiz/QuizList/QuizList";
import { useQuiz } from "@/hooks/useQuiz";
import { useToastContext } from "@/hooks/useToast";

export default function HomePage() {
  const { quizzes, createQuiz, deleteQuiz } = useQuiz();
  const router = useRouter();
  const { toast } = useToastContext();

  const handleCreateQuiz = () => {
    const newQuiz = createQuiz("New Quiz");
    router.push(`/quiz/edit/${newQuiz.id}`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmed) return;
    try {
      await deleteQuiz(quizId);
      toast({
        title: "Success",
        description: "Quiz deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to delete quiz",
        variant: "destructive",
      });
    }
  };

  return (
    <QuizList
      quizzes={quizzes}
      onCreateQuiz={handleCreateQuiz}
      onDeleteQuiz={handleDeleteQuiz}
    />
  );
}
