import type { Vector2D } from '../Vector2D';
import { Shape2D } from './Shape2D';

/**
 * Abstract representation of a 2D polygon defined by a set of vertices.
 */
export abstract class PolygonShape2D extends Shape2D {
  /** The vertices that form the polygon, in clockwise order. */
  public abstract get vertices(): Vector2D[];

  public get boundingRectangle() {
    return this.computeBoundingRectangle();
  }

  protected computeBoundingRectangle() {
    const vertices = this.vertices;
    const xValues = vertices.map((vertex) => vertex.x);
    const yValues = vertices.map((vertex) => vertex.y);

    return {
      left: Math.min(...xValues),
      right: Math.max(...xValues),
      bottom: Math.min(...yValues),
      top: Math.max(...yValues),
    };
  }
}
