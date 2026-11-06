import { ResetTransform } from './ResetTransform';
import { describe, expect, it } from 'vitest';

describe('ResetTransform', () => {
  it('should instantiate with correct values', () => {
    expect(new ResetTransform()).toEqual({
      type: 'RESET_TRANSFORM',
    });
  });
});
