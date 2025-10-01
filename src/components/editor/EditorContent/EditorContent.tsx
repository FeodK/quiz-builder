"use client";

import { Quiz } from "@/types/quiz";
import { BlockPalette } from "../BlockPalette/BlockPalette";
import { Canvas } from "../Canvas/Canvas";
import { PropertiesPanel } from "../PropertiesPanel/PropertiesPanel";

interface EditorContentProps {
  quiz: Quiz;
  selectedBlockId: string | null;
  onUpdateQuiz: (updater: (prev: Quiz) => Quiz) => void;
  onSelectBlock: (blockId: string | null) => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  quiz,
  selectedBlockId,
  onUpdateQuiz,
  onSelectBlock,
}) => {
  const selectedBlock =
    quiz.blocks.find((block) => block.id === selectedBlockId) || null;

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-64 bg-white border-r p-5">
        <BlockPalette />
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <Canvas
            quiz={quiz}
            onUpdateQuiz={onUpdateQuiz}
            selectedBlockId={selectedBlockId}
            onSelectBlock={onSelectBlock}
          />
        </div>
      </main>

      <aside className="w-80 bg-white border-l p-5">
        <PropertiesPanel
          block={selectedBlock}
          onUpdateBlock={(updatedBlock) => {
            onUpdateQuiz((prev) => ({
              ...prev,
              blocks: prev.blocks.map((block) =>
                block.id === updatedBlock.id ? updatedBlock : block
              ),
            }));
          }}
        />

        {quiz.blocks.length > 0 && (
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Canvas Stats
            </h4>
            <p className="text-xs text-gray-500">
              {quiz.blocks.length} block{quiz.blocks.length !== 1 ? "s" : ""}{" "}
              total
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
