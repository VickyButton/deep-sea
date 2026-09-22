import type { BoundingBox2D } from './shapes.types';
import type { Canvas } from '../canvases/Canvas';
import type { Transform2D } from '../Transform2D';

/**
 * Abstract representation of a 2D shape that can be checked for collision.
 */
export abstract class Shape2D {
  /** The axis-aligned bounding box of the shape. */
  public abstract get boundingBox(): BoundingBox2D;

  /**
   * Checks whether this shape is colliding with another shape.
   * @param transform The 2D transformation matrix to apply to this shape.
   * @param shape The other shape to check for collision against.
   * @param shapeTransform The 2D transformation matrix to apply to the other shape.
   * @returns True if the two shapes are colliding, false if not.
   */
  public abstract isCollidingWith(transform: Transform2D, shape: Shape2D, shapeTransform: Transform2D): boolean;

  /**
   * Draws the shape onto a canvas.
   * @param canvas The canvas to draw the shape onto.
   */
  public abstract draw(canvas: Canvas): void;
}
