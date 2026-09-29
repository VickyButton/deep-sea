import { SignalBase } from './SignalBase';
import { describe, expect, it, vi } from 'vitest';

describe('SignalBase', () => {
  it('should have no registered callbacks by default', () => {
    const signal = new SignalBase();

    expect(signal.callbackCount).toBe(0);
  });

  it('should register a callback', () => {
    const signal = new SignalBase();

    signal.listen(vi.fn());

    expect(signal.callbackCount).toBe(1);
  });

  it('should deregister a callback', () => {
    const signal = new SignalBase();
    const callback = vi.fn();

    signal.listen(callback);
    signal.unlisten(callback);

    expect(signal.callbackCount).toBe(0);
  });

  it('should clear all registered callbacks', () => {
    const signal = new SignalBase();
    const callback = vi.fn();

    signal.listen(callback);
    signal.clear();

    expect(signal.callbackCount).toBe(0);
  });

  it('should emit signal data to registered callbacks', () => {
    const signal = new SignalBase<string>();
    const callback = vi.fn();
    const data = 'SIGNAL_DATA';

    signal.listen(callback);
    signal.emit(data);

    expect(callback).toHaveBeenCalledWith(data);
  });
});
