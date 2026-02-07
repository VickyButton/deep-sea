import { Vector2D } from '@core/structures/Vector2D';
import { describe, expect, it, vi } from 'vitest';
import { Camera2D } from './Camera2D';

vi.mock('game', () => ({
  getGame: () => ({
    graphics: {
      width: 1,
      height: 1,
    },
  }),
}));

describe('Camera2D', () => {
  it('should initialize with size from game configuration', () => {
    const camera = new Camera2D();

    expect(camera.size.equals(Vector2D.one)).toBe(true);
  });
});
