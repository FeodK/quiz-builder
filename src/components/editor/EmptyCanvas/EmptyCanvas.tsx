import { FC } from "react";
import { EmptyListIcon } from "@/icons";

interface EmptyCanvasProps {
  className?: string;
}

export const EmptyCanvas: FC<EmptyCanvasProps> = ({ className }) => (
  <div className={`text-center text-gray-500 py-16 ${className || ""}`}>
    <EmptyListIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
    <h3 className="text-lg font-medium mb-2">Your canvas is empty</h3>
    <p>Drag blocks from the sidebar to start building your quiz</p>
  </div>
);
