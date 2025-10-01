"use client";

import { Quiz } from "@/types/quiz";
import { QuizListItem } from "../QuizListItem/QuizListItem";
import { EmptyListIcon } from "@/icons";

interface QuizListProps {
  quizzes: Quiz[];
  onCreateQuiz: () => void;
  onDeleteQuiz: (quizId: string) => void;
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  onCreateQuiz,
  onDeleteQuiz,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Quiz Builder
        </h1>
        <button
          onClick={onCreateQuiz}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all font-medium"
        >
          Create Quiz
        </button>
      </div>

      <div className="bg-white/70 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden border border-slate-100">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Quiz Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((quiz) => (
              <QuizListItem
                key={quiz.id}
                quiz={quiz}
                onDeleteQuiz={onDeleteQuiz}
              />
            ))}
          </tbody>
        </table>

        {quizzes.length === 0 && (
          <div className="text-center py-16">
            <EmptyListIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No quizzes yet
            </h3>
            <p className="text-slate-500 mb-6">
              Create your first quiz to get started
            </p>
            <button
              onClick={onCreateQuiz}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all font-medium"
            >
              Create Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
