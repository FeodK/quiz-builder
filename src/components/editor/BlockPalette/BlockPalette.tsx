'use client';

import { useRef } from 'react';
import { useDrag } from 'react-dnd';

const BLOCK_TYPES = [
  { type: 'heading', label: 'Heading', icon: '📝' },
  { type: 'question', label: 'Question', icon: '❓' },
  { type: 'button', label: 'Button', icon: '🔘' },
  { type: 'footer', label: 'Footer', icon: '📄' }
] as const;

interface DraggableBlockProps {
  type: string;
  label: string;
  icon: string;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ type, label, icon }) => {
  const blockRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  drag(blockRef);

  return (
    <div
      ref={blockRef}
      className={`flex items-center p-3 mb-2 bg-white rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span className="text-xl mr-3">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

export const BlockPalette: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Building Blocks</h3>
      <div className="space-y-2">
        {BLOCK_TYPES.map((block) => (
          <DraggableBlock
            key={block.type}
            type={block.type}
            label={block.label}
            icon={block.icon}
          />
        ))}
      </div>
    </div>
  );
};