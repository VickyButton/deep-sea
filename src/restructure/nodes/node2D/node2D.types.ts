import type { Signal } from '../../domain/signal/Signal';
import type { Transform2D } from '../../domain/transform2D/Transform2D';
import type { Vector2 } from '../../domain/vector2/Vector2';
import type { CanvasNode } from '../canvasNode/canvasNode.types';

/** A 2D node that has position, rotation, and scale. */
export interface Node2D extends CanvasNode {
  /** Emitted after the node's position has been changed. The new position is passed to callbacks. */
  readonly position_changed: Signal<Vector2>;
  /** Emitted after the node's rotation has been changed. The new rotation is passed to callbacks. */
  readonly rotation_changed: Signal<number>;
  /** Emitted after the node's scale has been changed. The new scale is passed to callbacks. */
  readonly scale_changed: Signal<Vector2>;
  /** Emitted after the node's transform has been changed. The new transform is passed to callbacks. */
  readonly transform_changed: Signal<Transform2D>;
  /** The node's position. */
  position: Vector2;
  /** The node's rotation. */
  rotation: number;
  /** The node's scale. */
  scale: Vector2;
  /** The node's transform. */
  transform: Transform2D;
  /** The node's global position. */
  get globalPosition(): Vector2;
  /** The node's global rotation. */
  get globalRotation(): number;
  /** The node's global scale. */
  get globalScale(): Vector2;
  /** The node's global transform. */
  get globalTransform(): Transform2D;
  /**
   * Rotates the node.
   * @param radians The angle, in radians, to rotate the node by.
   */
  rotateBy(radians: number): void;
  /**
   * Scales the node.
   * @param ratio The ratio to multiply the node's scale by.
   */
  scaleBy(ratio: Vector2): void;
  /**
   * Translates the node.
   * @param offset The offset to translate the node by.
   */
  translateBy(offset: Vector2): void;
}
