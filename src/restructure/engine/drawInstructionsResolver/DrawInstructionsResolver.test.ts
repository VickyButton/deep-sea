import { DrawInstructionsResolver } from './DrawInstructionsResolver';
import { describe, expect, it } from 'vitest';

describe('DrawInstructionsResolver', () => {
  it('should resolve draw instructions list into ordered list of draw steps', () => {
    const resolver = new DrawInstructionsResolver();
    const fillStep = {
      type: 'FILL' as const,
    };
    const strokeStep = {
      type: 'STROKE' as const,
    };

    expect(resolver.resolve([
      {
        zIndex: 1,
        steps: [fillStep],
      },
      {
        zIndex: 0,
        steps: [strokeStep],
      },
    ])).toEqual([
      strokeStep,
      fillStep,
    ]);
  });
});
