"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizService } from "@/services/quizService";
import { LoadingState } from "@/components/ui/LoadingState/LoadingState";

export default function CreateQuizPage() {
  const router = useRouter();

  useEffect(() => {
    const createNewQuiz = () => {
      const newQuiz = QuizService.createQuiz("New Quiz");
      router.replace(`/quiz/edit/${newQuiz.id}`);
    };

    createNewQuiz();
  }, [router]);

  return <LoadingState message="Creating new quiz..." />;
}
