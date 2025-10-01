"use client";

import { Quiz } from "@/types/quiz";
import { Button } from "@/components/ui/Button/Button";
import Link from "next/link";

interface EditorHeaderProps {
  quiz: Quiz;
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  quiz,
  title,
  onTitleChange,
  onSave,
  onPublish,
  isSaving,
}) => {
  return (
    <header className="bg-white shadow-sm border-b p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-2xl font-bold px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full max-w-md transition"
          placeholder="Enter quiz title..."
        />
        <div className="flex gap-3">
          <Button
            onClick={onSave}
            disabled={isSaving}
            variant="secondary"
            className="min-w-[100px]"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          {!quiz.published && (
            <Button
              onClick={onPublish}
              disabled={isSaving}
              variant="primary"
              className="min-w-[120px]"
            >
              {isSaving ? "Publishing..." : "Publish Quiz"}
            </Button>
          )}
          <Link
            href="/"
            className="bg-gray-200 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            {" "}
            Back to Quizzes{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};
