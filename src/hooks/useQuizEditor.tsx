import { useState, useEffect, useCallback } from "react";
import { useToastContext } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Quiz } from "@/types/quiz";
import { QuizService } from "@/services/quizService";

export function useQuizEditor(quizId: string) {
  const router = useRouter();
  const { toast } = useToastContext();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadQuiz = () => {
      const foundQuiz = QuizService.getQuizById(quizId);
      if (!foundQuiz) {
        router.push("/");
        toast({
          title: "Error",
          description: "Quiz not found",
          variant: "destructive",
        });
        return;
      }
      setQuiz(foundQuiz);
    };
    loadQuiz();
  }, [quizId, router, toast]);

  const handleUpdateQuiz = useCallback((updater: (prev: Quiz) => Quiz) => {
    setQuiz((prev) => (prev ? updater(prev) : prev));
  }, []);

  const handleSave = useCallback(async () => {
    if (!quiz) return;
    setIsSaving(true);
    try {
      QuizService.updateQuiz(quiz);
      toast({
        title: "Success",
        description: "Quiz saved successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save quiz",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [quiz, toast]);

  const handlePublish = useCallback(async () => {
    if (!quiz) return;
    setIsSaving(true);
    try {
      QuizService.publishQuiz(quiz.id);
      toast({
        title: "Success",
        description: "Quiz published successfully",
        variant: "success",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish quiz",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [quiz, toast, router]);

  const handleTitleChange = useCallback(
    (title: string) => {
      handleUpdateQuiz((prev) => ({ ...prev, title }));
    },
    [handleUpdateQuiz]
  );

  return {
    quiz,
    selectedBlockId,
    setSelectedBlockId,
    isSaving,
    handleUpdateQuiz,
    handleSave,
    handlePublish,
    handleTitleChange,
  };
}
