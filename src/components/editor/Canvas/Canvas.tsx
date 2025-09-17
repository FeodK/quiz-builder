'use client';

import { useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { Quiz, QuizBlock, HeadingProperties, QuestionProperties, ButtonProperties, FooterProperties } from "@/types/quiz";
import { CanvasBlock } from "../CanvasBlock/CanvasBlock";
import { v4 as uuidv4 } from "uuid";

interface CanvasProps {
  quiz: Quiz;
  onUpdateQuiz: (updater: (prev: Quiz) => Quiz) => void;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
}

type BlockProperties = HeadingProperties | QuestionProperties | ButtonProperties | FooterProperties;

export const Canvas: React.FC<CanvasProps> = ({
  quiz,
  onUpdateQuiz,
  selectedBlockId,
  onSelectBlock,
}) => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const getDefaultProperties = useCallback(
    (type: QuizBlock["type"]): BlockProperties => {
      switch (type) {
        case "heading":
          return { text: "New Heading", level: 2 };
        case "question":
          return {
            question: "New Question",
            type: "single",
            options: ["Option 1", "Option 2"],
            required: false,
          };
        case "button":
          return { text: "Next", action: "next" };
        case "footer":
          return { text: "Footer text" };
      }
    },
    []
  );

  const [, drop] = useDrop(() => ({
    accept: "block",
    drop: (item: { type: QuizBlock["type"] }) => {
      const newBlock: QuizBlock = {
        id: uuidv4(),
        type: item.type,
        properties: getDefaultProperties(item.type),
      };
      onUpdateQuiz((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    },
  }));

  drop(dropRef);

  const handleMoveBlock = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      onUpdateQuiz((prev) => {
        const newBlocks = [...prev.blocks];
        const [movedBlock] = newBlocks.splice(fromIndex, 1);
        newBlocks.splice(toIndex, 0, movedBlock);
        return { ...prev, blocks: newBlocks };
      });
    },
    [onUpdateQuiz]
  );

  const handleUpdateBlock = useCallback(
    (blockId: string, updates: Partial<QuizBlock>) => {
      onUpdateQuiz((prev) => ({
        ...prev,
        blocks: prev.blocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block
        ),
      }));
    },
    [onUpdateQuiz]
  );

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      onUpdateQuiz((prev) => ({
        ...prev,
        blocks: prev.blocks.filter((block) => block.id !== blockId),
      }));
      if (selectedBlockId === blockId) onSelectBlock(null);
    },
    [onUpdateQuiz, selectedBlockId, onSelectBlock]
  );

  return (
    <div
      ref={dropRef}
      className="min-h-[500px] bg-white rounded-lg border border-gray-200 p-6 space-y-4"
      onClick={(e) => e.target === e.currentTarget && onSelectBlock(null)}
    >
      {quiz.blocks.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium mb-2">Your canvas is empty</h3>
          <p>Drag blocks from the sidebar to start building your quiz</p>
        </div>
      ) : (
        quiz.blocks.map((block, index) => (
          <CanvasBlock
            key={block.id}
            block={block}
            index={index}
            isSelected={selectedBlockId === block.id}
            onSelect={() => onSelectBlock(block.id)}
            onMove={handleMoveBlock} 
            onUpdate={(updates) => handleUpdateBlock(block.id, updates)}
            onDelete={() => handleDeleteBlock(block.id)}
          />
        ))
      )}
    </div>
  );
};