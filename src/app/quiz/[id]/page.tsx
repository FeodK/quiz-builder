"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Quiz } from "@/types/quiz";
import { QuizRenderer } from "@/components/quiz/QuizRenderer/QuizRenderer";
import { QuizService } from "@/services/quizService";
import Link from "next/link";
import { LoadingState } from "@/components/ui/LoadingState/LoadingState";

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const foundQuiz = QuizService.getQuizById(quizId);
      setQuiz(foundQuiz || null);
      setLoading(false);
    }
  }, [quizId]);

  if (loading) {
    return <LoadingState message="Loading quiz..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Quizzes
        </Link>
        <QuizRenderer quiz={quiz!} />
      </div>
    </div>
  );
}
