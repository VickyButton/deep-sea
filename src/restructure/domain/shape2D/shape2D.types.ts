import type { DrawStep } from '../drawStep/drawStep.types';
import type { Transform2D } from '../transform2D/Transform2D';
import type { Vector2D } from '../vector2D/Vector2D';

/** A 2D shape that can be transformed and drawn. */
export interface Shape2D {
  /** The axis-aligned bounding box of the shape. */
  get boundingBox(): BoundingBox2D;
  /** The draw steps for drawing the shape. */
  get drawSteps(): DrawStep[];
  /**
   * Checks whether this shape overlaps another shape.
   * @param transform The 2D transformation matrix to apply to this shape.
   * @param shape The other shape to check for an overlap against.
   * @param shapeTransform The 2D transformation matrix to apply to the other shape.
   * @returns True if the two shapes overlap, false if not.
   */
  overlaps(transform: Transform2D, shape: Shape2D, shapeTransform: Transform2D): boolean;
}

/** A set of vertices that form an axis-aligned bounding box of a 2D shape, in counterclockwise order. */
export type BoundingBox2D = [Vector2D, Vector2D, Vector2D, Vector2D];
