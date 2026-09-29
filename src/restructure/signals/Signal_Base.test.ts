
import { Signal_Base } from './Signal_Base';
import { describe, expect, it, vi } from 'vitest';

describe('Signal_Base', () => {
  it('should have no registered callbacks by default', () => {
    const signal = new Signal_Base();

    expect(signal.callbackCount).toBe(0);
  });

  it('should register a callback', () => {
    const signal = new Signal_Base();

    signal.listen(vi.fn());

    expect(signal.callbackCount).toBe(1);
  });

  it('should deregister a callback', () => {
    const signal = new Signal_Base();
    const callback = vi.fn();

    signal.listen(callback);
    signal.unlisten(callback);

    expect(signal.callbackCount).toBe(0);
  });

  it('should clear all registered callbacks', () => {
    const signal = new Signal_Base();
    const callback = vi.fn();

    signal.listen(callback);
    signal.clear();

    expect(signal.callbackCount).toBe(0);
  });

  it('should emit signal data to registered callbacks', () => {
    const signal = new Signal_Base<string>();
    const callback = vi.fn();
    const data = 'SIGNAL_DATA';

    signal.listen(callback);
    signal.emit(data);

    expect(callback).toHaveBeenCalledWith(data);
  });
});
