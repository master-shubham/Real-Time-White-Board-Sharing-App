export type ElementType = {
  type: string;
  offsetX: number;
  offsetY: number;
  path?: [number, number][];
  width?: number;
  height?: number;
  stroke: string;
};

// Define a type for our available drawing tools
export type DrawingTool = "pencil" | "line" | "rect";