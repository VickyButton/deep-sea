import type { DrawInstructionsResolver } from './drawInstructionsResolver.types';
import { vi } from 'vitest';

/** The mock implementation of the DrawInstructionsResolver interface. */
export class DrawInstructionsResolver_Mock implements DrawInstructionsResolver {
  public resolve = vi.fn();
}
