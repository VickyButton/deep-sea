import type { Vector2D } from '../Vector2D';

/** A set of vertices that form an axis-aligned bounding box of a 2D shape, in counterclockwise order. */
export type BoundingBox2D = [Vector2D, Vector2D, Vector2D, Vector2D];
