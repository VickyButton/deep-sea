import type { SignalController } from './signalController.types';
import { vi } from 'vitest';

/** The mock implementation of the SignalController interface. */
export class SignalController_Mock implements SignalController {
  private _isListening = false;

  public get isListening() {
    return this._isListening;
  }

  public clear = vi.fn();
  public deregister = vi.fn();
  public register = vi.fn();
  public startListening = vi.fn().mockImplementation(() => {
    this._isListening = true;
  });
  public stopListening = vi.fn().mockImplementation(() => {
    this._isListening = false;
  });
};
