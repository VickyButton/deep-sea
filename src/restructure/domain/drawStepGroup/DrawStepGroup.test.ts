import { DrawStepGroup } from './DrawStepGroup';
import { describe, expect, it } from 'vitest';

describe('DrawStepGroup', () => {
  it('should have no steps by default', () => {
    expect(new DrawStepGroup().steps).toEqual([]);
  });

  it('should add a step', () => {
    const group = new DrawStepGroup();
    const step = {
      type: 'BEGIN_PATH' as const,
    };

    group.add(step);

    expect(group.steps).toEqual([step]);
  });
});
