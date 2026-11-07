import { CanvasCommandTranslator } from '../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/CanvasCommandTranslator';
import { vi } from 'vitest';

/** A mock canvas command translator to use for testing. */
export class MockCanvasCommandTranslator extends CanvasCommandTranslator {
  public translate = vi.fn();
}
