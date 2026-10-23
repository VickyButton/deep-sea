import type { DrawEngine } from './drawEngine.types';
import { vi } from 'vitest';

/** The mock implementation of the DrawEngine interface. */
export class DrawEngine_Mock implements DrawEngine {
  public draw = vi.fn();
}
