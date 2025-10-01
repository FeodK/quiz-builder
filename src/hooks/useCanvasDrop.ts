import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import {
  QuizBlock,
  HeadingProperties,
  QuestionProperties,
  ButtonProperties,
  FooterProperties,
} from "@/types/quiz";

type BlockProperties =
  | HeadingProperties
  | QuestionProperties
  | ButtonProperties
  | FooterProperties;

interface UseCanvasDropProps {
  blocksLength: number;
  getDefaultProperties: (type: QuizBlock["type"]) => BlockProperties;
  onDropBlock: (block: QuizBlock, insertIndex: number) => void;
}

export const useCanvasDrop = ({
  blocksLength,
  getDefaultProperties,
  onDropBlock,
}: UseCanvasDropProps) => {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

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
        id: crypto.randomUUID(),
        type: item.type,
        properties: getDefaultProperties(item.type),
      };
      const insertIndex = hoverIndex !== null ? hoverIndex : blocksLength;
      onDropBlock(newBlock, insertIndex);
      setHoverIndex(null);
    },
  });

  return { dropRef, drop, hoverIndex, setHoverIndex };
};
