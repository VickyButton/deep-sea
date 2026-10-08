import type { Shape2D } from '../../domain/shapes';
import type { Signal } from '../../signals/signal.types';
import type { Node2D } from '../node2D/node2D.types';

/** A node that holds a 2D shape. */
export interface ShapeNode2D extends Node2D {
  /** Emitted after the node's shape has been changed. The new shape is passed to callbacks. */
  readonly shape_changed: Signal<Shape2D>;
  /** The node's 2D shape. */
  shape: Shape2D;
}
