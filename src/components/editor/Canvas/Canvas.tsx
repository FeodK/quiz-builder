"use client";
import { CanvasBlock } from "../CanvasBlock/CanvasBlock";
import { EmptyCanvas } from "../EmptyCanvas/EmptyCanvas";
import { Quiz } from "@/types/quiz";
import { useCanvasBlocks } from "@/hooks/useCanvasBlocks";

interface CanvasProps {
  quiz: Quiz;
  onUpdateQuiz: (updater: (prev: Quiz) => Quiz) => void;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  quiz,
  onUpdateQuiz,
  selectedBlockId,
  onSelectBlock,
}) => {
  const { blocks, hoverIndex, dropRef, handleMoveBlock, handleDeleteBlock } =
    useCanvasBlocks(quiz, onUpdateQuiz, onSelectBlock, selectedBlockId);

  return (
    <div
      ref={dropRef}
      className="min-h-[500px] bg-white rounded-lg border border-gray-200 p-6 space-y-4 relative"
      onClick={(e) => e.target === e.currentTarget && onSelectBlock(null)}
    >
      {blocks.length === 0 && <EmptyCanvas />}

      {blocks.map((block, index) => (
        <div
          key={block.id}
          className="relative transition-transform duration-200 ease-in-out"
        >
          {hoverIndex === index && (
            <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded z-10" />
          )}
          <CanvasBlock
            block={block}
            index={index}
            isSelected={selectedBlockId === block.id}
            onSelect={() => onSelectBlock(block.id)}
            onMove={handleMoveBlock}
            onDelete={() => handleDeleteBlock(block.id)}
          />
        </div>
      ))}

      {hoverIndex !== null && hoverIndex === blocks.length && (
        <div className="relative">
          <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded z-10" />
        </div>
      )}
    </div>
  );
};
