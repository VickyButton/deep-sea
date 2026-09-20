import type { GraphicsCanvas } from '../providers/graphicsCanvas.types';

export interface GraphicsEngine {
  setCanvas(canvas: GraphicsCanvas | null): void;
  queueDrawCommand(command: DrawCommand): void;
  draw(): void;
}

export interface DrawCommand {
  draw: Draw;
  zIndex: number;
}
type Draw = (canvas: GraphicsCanvas) => void;
