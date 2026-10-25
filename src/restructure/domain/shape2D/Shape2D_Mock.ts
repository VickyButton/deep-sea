import type { BoundingBox2D, Shape2D } from './shape2D.types';
import { Vector2 } from '../vector2/Vector2';
import { vi } from 'vitest';

/** The mock implementation of the Shape2D interface. */
export class Shape2D_Mock implements Shape2D {
  public get boundingBox(): BoundingBox2D {
    return [
      new Vector2(),
      new Vector2(),
      new Vector2(),
      new Vector2(),
    ];
  };

  public get drawSteps() {
    return [];
  }

  public overlaps = vi.fn();
}
