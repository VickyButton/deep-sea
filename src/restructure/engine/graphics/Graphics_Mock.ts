import type { Graphics } from './graphics.types';
import { vi } from 'vitest';

/** The mock implementation of the Graphics interface. */
export class Graphics_Mock implements Graphics {
  public clearCanvas = vi.fn();
  public clearDrawCommandQueue = vi.fn();
  public deleteCachedDrawCommand = vi.fn();
  public processDrawCommandQueue = vi.fn();
  public queueDrawCommand = vi.fn();
}
