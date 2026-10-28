import { BeginPath } from './BeginPath';
import { describe, expect, it } from 'vitest';

describe('BeginPath', () => {
  it('should instantiate with correct values', () => {
    expect(new BeginPath()).toEqual({
      type: 'BEGIN_PATH',
    });
  });
});
