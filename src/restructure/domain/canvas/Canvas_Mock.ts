import { vi } from 'vitest';

/** The mock implementation of the Canvas interface. */
export class Canvas_Mock {
  public width = 0;
  public height = 0;
  public beginPath = vi.fn();
  public closePath = vi.fn();
  public setTransform = vi.fn();
  public resetTransform = vi.fn();
  public createLine = vi.fn();
  public createArc = vi.fn();
  public createRectangle = vi.fn();
  public setStrokeColor = vi.fn();
  public stroke = vi.fn();
  public setFillColor = vi.fn();
  public fill = vi.fn();
  public clear = vi.fn();
}
