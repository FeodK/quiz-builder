"use client";

import { DndWrapper } from "@/components/DndWrapper/DndWrapper";
import { EditorHeader } from "@/components/editor/EditorHeader/EditorHeader";
import { EditorContent } from "@/components/editor/EditorContent/EditorContent";
import { LoadingState } from "@/components/ui/LoadingState/LoadingState";
import { useQuizEditor } from "@/hooks/useQuizEditor";
import { useParams } from "next/navigation";

export default function QuizEditorPage() {
  const params = useParams();
  const quizId = params.id as string;

  const {
    quiz,
    selectedBlockId,
    setSelectedBlockId,
    isSaving,
    handleUpdateQuiz,
    handleSave,
    handlePublish,
    handleTitleChange,
  } = useQuizEditor(quizId);

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