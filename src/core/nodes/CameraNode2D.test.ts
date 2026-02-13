import { Vector2D } from '@core/structures/Vector2D';
import { describe, expect, it, vi } from 'vitest';
import { CameraNode2D } from './CameraNode2D';

vi.mock('config', () => ({
  useConfig: () => ({
    graphics: {
      width: 1,
      height: 1,
    },
  }),
}));

describe('CameraNode2D', () => {
  it('should initialize with size from game configuration', () => {
    const camera = new CameraNode2D();

    expect(camera.size.equals(Vector2D.one)).toBe(true);
  });
});
