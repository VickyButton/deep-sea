import type { Canvas } from '../../providers/canvas.types';
import type { Transform2D_Options } from '../Transform2D';
import { Transform2D } from '../Transform2D';

/**
 * Abstract representation of a 2D shape that can be checked for collision.
 */
export abstract class Shape2D {
  /** The shape's transform matrix. */
  public transform: Transform2D;

  constructor(options?: Shape2D_Options) {
    this.transform = options?.transform ? new Transform2D(options.transform) : new Transform2D();
  }

  /** The axis-aligned bounding rectangle of the shape. */
  public abstract get boundingRectangle(): BoundingRectangle2D;

  /**
   * Checks whether this shape is colliding with another shape.
   * @param shape The shape to check for collision against.
   * @returns True if the two shapes are colliding, false if not.
   */
  public abstract isCollidingWith(shape: Shape2D): boolean;

  /**
   * Draws the shape onto a canvas.
   * @param canvas The canvas to draw the shape onto.
   */
  public abstract draw(canvas: Canvas): void;
}

export interface Shape2D_Options {
  transform?: Transform2D_Options;
}

interface BoundingRectangle2D {
  left: number;
  right: number;
  bottom: number;
  top: number;
}
