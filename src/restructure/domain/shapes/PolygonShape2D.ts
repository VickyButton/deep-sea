import type { Vector2D } from '../Vector2D';
import { Shape2D } from './Shape2D';

export abstract class PolygonShape2D extends Shape2D {
  /** The vertices that form the polygon, in clockwise order. */
  public abstract get vertices(): Vector2D[];
}
