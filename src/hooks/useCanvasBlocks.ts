"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { Quiz, QuizBlock } from "@/types/quiz";
import { DEFAULT_PROPERTIES } from "@/utils/constants";

export const useCanvasBlocks = (
  quiz: Quiz,
  onUpdateQuiz: (updater: (prev: Quiz) => Quiz) => void,
  onSelectBlock: (blockId: string | null) => void,
  selectedBlockId: string | null
) => {
  const [blocks, setBlocks] = useState<QuizBlock[]>(quiz.blocks);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

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
      const confirmed = window.confirm("Are you sure you want to delete this block?");
      if (!confirmed) return;
      setBlocks((prev) => prev.filter((b) => b.id !== blockId));
      if (selectedBlockId === blockId) onSelectBlock(null);
    },
    [selectedBlockId, onSelectBlock]
  );

const handleDropBlock = useCallback(
  (item: { type: QuizBlock["type"] }) => {
    const newBlock: QuizBlock = {
      id: uuidv4(),
      type: item.type,
      properties: DEFAULT_PROPERTIES[item.type],
    };
    const insertIndex = hoverIndex ?? blocks.length;
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks.splice(insertIndex, 0, newBlock);
      return newBlocks;
    });
    requestAnimationFrame(() => setHoverIndex(null));
  },
  [hoverIndex, blocks.length]
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
        setHoverIndex((prev) => (prev !== newHoverIndex ? newHoverIndex : prev));
      });
    },
    drop: handleDropBlock,
  });

  drop(dropRef);

  useEffect(() => {
    onUpdateQuiz((prev) => ({ ...prev, blocks }));
  }, [blocks, onUpdateQuiz]);

  return {
    blocks,
    hoverIndex,
    dropRef,
    setHoverIndex,
    handleMoveBlock,
    handleDeleteBlock,
  };
};
