"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Quiz } from "@/types/quiz";
import { QuizService } from "@/services/quizService";
import { EditorHeader } from "@/components/editor/EditorHeader/EditorHeader";
import { EditorContent } from "@/components/editor/EditorContent/EditorContent";
import { useToastContext } from "@/hooks/useToast";
import { LoadingState } from "@/components/ui/LoadingState/LoadingState";
import { DndWrapper } from "@/components/DndWrapper/DndWrapper";

export default function QuizEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToastContext();
  const quizId = params.id as string;

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

  if (!quiz) {
    return <LoadingState message="Loading quiz editor..." />;
  }

  return (
    <DndWrapper>
      <div className="h-screen flex flex-col bg-gray-50">
        <EditorHeader
          quiz={quiz}
          title={quiz.title}
          onTitleChange={handleTitleChange}
          onSave={handleSave}
          onPublish={handlePublish}
          isSaving={isSaving}
        />

        <EditorContent
          quiz={quiz}
          selectedBlockId={selectedBlockId}
          onUpdateQuiz={handleUpdateQuiz}
          onSelectBlock={setSelectedBlockId}
        />
      </div>
    </DndWrapper>
  );
}
