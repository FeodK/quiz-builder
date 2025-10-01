import { XYCoord, DropTargetMonitor, DragSourceMonitor } from "react-dnd";

interface DragItem {
  type: string;
}

interface DropComponent {
  props: { index: number };
}

export const canDropBlock = (): boolean => {
  return true;
};

export const getDropResult = (
  item: DragItem,
  _monitor: DropTargetMonitor,
  component: DropComponent
) => {
  return {
    dropped: true,
    index: component.props.index,
    blockType: item.type,
  };
};

export const isDraggingBlock = (monitor: DragSourceMonitor): boolean => {
  return monitor.isDragging();
};

export const getDragLayerStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) => {
  if (!initialOffset || !currentOffset) {
    return { display: "none" };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    opacity: 0.8,
    zIndex: 1000,
  };
};
