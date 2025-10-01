"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import {
  Quiz,
  QuizBlock,
  HeadingProperties,
  QuestionProperties,
  ButtonProperties,
  FooterProperties,
} from "@/types/quiz";
import { v4 as uuidv4 } from "uuid";
import { CanvasBlock } from "../CanvasBlock/CanvasBlock";

interface CanvasProps {
  quiz: Quiz;
  onUpdateQuiz: (updater: (prev: Quiz) => Quiz) => void;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
}

type BlockProperties =
  | HeadingProperties
  | QuestionProperties
  | ButtonProperties
  | FooterProperties;

export const Canvas: React.FC<CanvasProps> = ({
  quiz,
  onUpdateQuiz,
  selectedBlockId,
  onSelectBlock,
}) => {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [blocks, setBlocks] = useState<QuizBlock[]>(quiz.blocks);

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

  const handleUpdateBlock = useCallback(
    (blockId: string, updates: Partial<QuizBlock>) => {
      setBlocks((prev) =>
        prev.map((b) => (b.id === blockId ? { ...b, ...updates } : b))
      );
    },
    []
  );

  const handleMoveBlock = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const [moved] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, moved);
      return newBlocks;
    });
  }, []);

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this block?"
      );
      if (!confirmed) return;
      setBlocks((prev) => prev.filter((b) => b.id !== blockId));
      if (selectedBlockId === blockId) onSelectBlock(null);
    },
    [selectedBlockId, onSelectBlock]
  );

  const [, drop] = useDrop<{ type: QuizBlock["type"] }, void, unknown>({
    accept: "block",
    hover(_, monitor) {
      if (!dropRef.current) return;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const childrenRects = Array.from(dropRef.current!.children)
          .filter((c) => c instanceof HTMLElement)
          .map((c) => (c as HTMLElement).getBoundingClientRect());

        let newHoverIndex = childrenRects.length;
        for (let i = 0; i < childrenRects.length; i++) {
          const rect = childrenRects[i];
          if (clientOffset.y < rect.top + rect.height / 2) {
            newHoverIndex = i;
            break;
          }
        }
        if (hoverIndex !== newHoverIndex) setHoverIndex(newHoverIndex);
      });
    },
    drop(item) {
      const newBlock: QuizBlock = {
        id: uuidv4(),
        type: item.type,
        properties: getDefaultProperties(item.type),
      };
      const insertIndex = hoverIndex !== null ? hoverIndex : blocks.length;

      setBlocks((prev) => {
        const newBlocks = [...prev];
        newBlocks.splice(insertIndex, 0, newBlock);
        return newBlocks;
      });

      setHoverIndex(null);
    },
  });

  drop(dropRef);

  useEffect(() => {
    onUpdateQuiz((prev) => ({ ...prev, blocks }));
  }, [blocks, onUpdateQuiz]);

  return (
    <div
      ref={dropRef}
      className="min-h-[500px] bg-white rounded-lg border border-gray-200 p-6 space-y-4 relative"
      onClick={(e) => e.target === e.currentTarget && onSelectBlock(null)}
    >
      {blocks.length === 0 && (
        <div className="text-center text-gray-500 py-16">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium mb-2">Your canvas is empty</h3>
          <p>Drag blocks from the sidebar to start building your quiz</p>
        </div>
      )}

      {blocks.map((block, index) => (
        <div
          key={block.id}
          className="relative transition-transform duration-200 ease-in-out"
        >
          {hoverIndex === index && (
            <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded transition-all duration-150 ease-in-out z-10" />
          )}
          <CanvasBlock
            block={block}
            index={index}
            isSelected={selectedBlockId === block.id}
            onSelect={() => onSelectBlock(block.id)}
            onMove={handleMoveBlock}
            onUpdate={(updates) => handleUpdateBlock(block.id, updates)}
            onDelete={() => handleDeleteBlock(block.id)}
          />
        </div>
      ))}

      {hoverIndex === blocks.length && (
        <div className="relative transition-all duration-150 ease-in-out">
          <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-500 rounded transition-all duration-150 ease-in-out z-10" />
        </div>
      )}
    </div>
  );
};
