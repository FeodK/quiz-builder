"use client";

import { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { QuizBlock } from "@/types/quiz";
import { cn } from "@/utils/helpers";
import { BLOCK_TYPES } from "@/utils/constants";
import { DeleteIcon } from "@/icons";
import { getBlockPreview } from "./CanvasBlock.utils";

interface CanvasBlockProps {
  block: QuizBlock;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onDelete: () => void;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({
  block,
  index,
  isSelected,
  onSelect,
  onMove,
  onDelete,
}) => {
  const blockRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "canvas-block",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );

  const [, drop] = useDrop<{ index: number }, void, unknown>({
    accept: "canvas-block",
    hover(item, monitor: DropTargetMonitor) {
      if (!blockRef.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverRect = blockRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(blockRef));

  const blockMeta = Object.fromEntries(BLOCK_TYPES.map((b) => [b.type, b]))[
    block.type
  ];

  const previewText = getBlockPreview(block);

  return (
    <div
      ref={blockRef}
      className={cn(
        "p-4 border-2 rounded-lg cursor-move transition-all bg-white",
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {blockMeta?.icon && (
            <span className="text-xl mr-2">
              <blockMeta.icon className="w-5 h-5" />
            </span>
          )}
          <span className="text-sm font-medium text-gray-700 capitalize">
            {blockMeta?.label || block.type}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
          aria-label="Delete block"
        >
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="text-sm text-gray-600">{previewText}</div>
    </div>
  );
};
