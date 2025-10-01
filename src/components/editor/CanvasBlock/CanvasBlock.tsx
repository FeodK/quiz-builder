'use client';

import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { QuizBlock, HeadingProperties, QuestionProperties, ButtonProperties, FooterProperties } from '@/types/quiz';
import { cn } from '@/utils/helpers';

interface CanvasBlockProps {
  block: QuizBlock;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onUpdate: (updates: Partial<QuizBlock>) => void;
  onDelete: () => void;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({
  block,
  index,
  isSelected,
  onSelect,
  onMove,
  onDelete
}) => {
  const blockRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvas-block',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [index]);

  const [, drop] = useDrop<{ index: number }, void, unknown>({
    accept: 'canvas-block',
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

      let newIndex = hoverIndex;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex < hoverIndex && hoverClientY >= hoverMiddleY) newIndex = hoverIndex;
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) newIndex = hoverIndex;
      if (dragIndex > hoverIndex && hoverClientY >= hoverMiddleY) return;

      onMove(dragIndex, newIndex);
      item.index = newIndex;
    },
  });

  drag(drop(blockRef));

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'heading': return '📝';
      case 'question': return '❓';
      case 'button': return '🔘';
      case 'footer': return '📄';
      default: return '📦';
    }
  };

  const getBlockPreview = () => {
    switch (block.type) {
      case 'heading': {
        const props = block.properties as HeadingProperties;
        return `Heading: ${props.text || 'No text'}`;
      }
      case 'question': {
        const props = block.properties as QuestionProperties;
        return `Q: ${props.question || 'No question'}`;
      }
      case 'button': {
        const props = block.properties as ButtonProperties;
        return `Button: ${props.text || 'No text'}`;
      }
      case 'footer': {
        const props = block.properties as FooterProperties;
        return `Footer: ${props.text || 'No text'}`;
      }
      default:
        return 'Unknown block';
    }
  };

  return (
    <div
      ref={blockRef}
      className={cn(
        'p-4 border-2 rounded-lg cursor-move transition-all bg-white',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300',
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-2">{getBlockIcon(block.type)}</span>
          <span className="text-sm font-medium text-gray-700 capitalize">{block.type}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
          aria-label="Delete block"
        >
          Delete
        </button>
      </div>

      <div className="text-sm text-gray-600">{getBlockPreview()}</div>
    </div>
  );
};
