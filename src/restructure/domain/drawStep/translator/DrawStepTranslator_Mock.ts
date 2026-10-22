import type { DrawStepTranslator } from './drawStepTranslator.types';
import { vi } from 'vitest';

/** The mock implementation of the DrawStepTranslator interface. */
export class DrawStepTranslator_Mock implements DrawStepTranslator {
  public translate = vi.fn();
}
