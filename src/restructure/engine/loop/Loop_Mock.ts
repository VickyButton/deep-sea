import type { Loop } from './loop.types';
import { vi } from 'vitest';

/** The mock implementation of the Loop interface. */
export class Loop_Mock implements Loop {
  public setLoopCallback = vi.fn();
  public setLoopsPerSecond = vi.fn();
  public start = vi.fn();
  public stop = vi.fn();
}
