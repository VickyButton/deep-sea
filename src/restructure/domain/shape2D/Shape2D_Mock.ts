import type { BoundingBox2D, Shape2D } from './shape2D.types';
import { Vector2D } from '../vector2D/Vector2D';
import { vi } from 'vitest';

/** The mock implementation of the Shape2D interface. */
export class Shape2D_Mock implements Shape2D {
  public boundingBox: BoundingBox2D = [
    new Vector2D(),
    new Vector2D(),
    new Vector2D(),
    new Vector2D(),
  ];
  public overlaps = vi.fn();
  public draw = vi.fn();
}
