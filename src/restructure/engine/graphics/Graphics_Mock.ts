import type { Graphics } from './graphics.types';
import { vi } from 'vitest';

/** The mock implementation of the Graphics interface. */
export class Graphics_Mock implements Graphics {
  public cacheCommand = vi.fn();
  public clearQueue = vi.fn();
  public deleteCommand = vi.fn();
  public queueCommand = vi.fn();
  public render = vi.fn();
}
