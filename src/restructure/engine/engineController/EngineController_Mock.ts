import type { EngineController } from './engineController.types';
import { vi } from 'vitest';

/** The mock implementation of the EngineController interface. */
export class EngineController_Mock implements EngineController {
  private _isListening = false;

  public get isListening() {
    return this._isListening;
  }

  public setup = vi.fn();
  public startListening = vi.fn().mockImplementation(() => {
    this._isListening = true;
  });
  public stopListening = vi.fn().mockImplementation(() => {
    this._isListening = false;
  });
}
