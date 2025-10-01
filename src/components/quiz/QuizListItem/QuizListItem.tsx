"use client";

import Link from "next/link";
import { Quiz } from "@/types/quiz";
import { cn } from "@/utils/helpers";
import { DeleteIcon, EditIcon, ViewIcon } from "@/icons";

interface QuizListItemProps {
  quiz: Quiz;
  onDeleteQuiz: (quizId: string) => void;
}

export const QuizListItem: React.FC<QuizListItemProps> = ({
  quiz,
  onDeleteQuiz,
}) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-slate-800">{quiz.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {new Date(quiz.updatedAt).toISOString().split("T")[0]}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm transition-all",
            quiz.published
              ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
              : "bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-800"
          )}
        >
          {quiz.published ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-2">
        <Link
          href={`/quiz/${quiz.id}`}
          className={cn(
            "text-emerald-600 hover:text-emerald-800 p-2 rounded-md transition-all hover:bg-emerald-50 inline-flex items-center justify-center"
          )}
        >
          <ViewIcon className="w-4 h-4" />
        </Link>

        <Link
          href={`/quiz/edit/${quiz.id}`}
          className={cn(
            "text-indigo-600 hover:text-indigo-800 p-2 rounded-md transition-all hover:bg-indigo-50 inline-flex items-center justify-center"
          )}
        >
          <EditIcon className="w-4 h-4" />
        </Link>
        
        <button
          onClick={() => onDeleteQuiz(quiz.id)}
          className={cn(
            "text-rose-600 hover:text-rose-800 p-2 rounded-md transition-all hover:bg-rose-50 inline-flex items-center justify-center"
          )}
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
