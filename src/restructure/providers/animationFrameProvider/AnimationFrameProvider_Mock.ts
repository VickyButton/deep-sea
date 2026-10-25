import type { AnimationFrameProvider } from './animationFrameProvider.types';
import { vi } from 'vitest';

/** The mock implementation of the AnimationFrameProvider interface. */
export class AnimationFrameProvider_Mock implements AnimationFrameProvider {
  public cancelAnimationFrameRequest = vi.fn();
  public requestAnimationFrame = vi.fn();
}
