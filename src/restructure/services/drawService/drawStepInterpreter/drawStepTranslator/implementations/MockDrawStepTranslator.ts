import { vi } from 'vitest';

/** A mock draw step translator to use for testing. */
export class MockDrawStepTranslator {
  public translate = vi.fn();
}
