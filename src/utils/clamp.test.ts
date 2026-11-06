import { clamp } from './clamp';
import { describe, expect, it } from 'vitest';

describe('clamp', () => {
  it('clamps value up if below minimum', () => {
    const result = clamp(-1, 0, 1);

    expect(result).toBe(0);
  });

  it('clamps value down if above maximum', () => {
    const result = clamp(2, 0, 1);

    expect(result).toBe(1);
  });

  it('does not clamp value if within bounds', () => {
    const result = clamp(0.5, 0, 1);

    expect(result).toBe(0.5);
  });
});
