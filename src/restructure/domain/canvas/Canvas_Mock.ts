import type { Canvas } from './canvas.types';
import { vi } from 'vitest';

/** The mock implementation of the Canvas interface. */
export class Canvas_Mock implements Canvas {
  public height = 0;
  public width = 0;
  public beginPath = vi.fn();
  public clear = vi.fn();
  public closePath = vi.fn();
  public drawArc = vi.fn();
  public drawLine = vi.fn();
  public drawRectangle = vi.fn();
  public fill = vi.fn();
  public resetTransform = vi.fn();
  public setFillColor = vi.fn();
  public setStrokeColor = vi.fn();
  public setTransform = vi.fn();
  public stroke = vi.fn();
  public toImageBitmap = vi.fn();
}
