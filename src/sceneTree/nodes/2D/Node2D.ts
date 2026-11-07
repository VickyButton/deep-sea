import type { Node2DOptions } from './Node2D.types';
import { Vector2 } from '../../../core/math/Vector2';
import { CanvasNode } from '../main/CanvasNode';

/** A node which can be transformed in 2D space. */
export class Node2D extends CanvasNode {
  private _position: Vector2;
  private _rotation: number;
  private _scale: Vector2;

  /**
   * Creates a new Node2D instance.
   * @param options The options for the node.
   */
  constructor(options: Node2DOptions) {
    super(options);

    this._position = new Vector2(
      options.positionX ?? Node2D.POSITION_X_DEFAULT,
      options.positionY ?? Node2D.POSITION_Y_DEFAULT,
    );
    this._rotation = options.rotation ?? Node2D.ROTATION_DEFAULT;
    this._scale = new Vector2(
      options.scaleX ?? Node2D.SCALE_X_DEFAULT,
      options.scaleY ?? Node2D.SCALE_Y_DEFAULT,
    );
  }

  /** The node's local position (or translation). */
  public get position() {
    return this._position;
  }

  /**
   * Sets the node's local position.
   * @param position The position to set the node's local position to.
   */
  public set position(position: Vector2) {
    this._position = position;
  }

  /**
   * Translates the node a certain distance.
   * @param offset The offset to translate the node by.
   */
  public translate(offset: Vector2) {
    this.position = this.position.add(offset);
  }

  /** The node's local rotation, in radians. */
  public get rotation() {
    return this._rotation;
  }

  /**
   * Sets the node's local rotation.
   * @param radians The radians to set the node's local rotation to.
   */
  public set rotation(radians: number) {
    this._rotation = radians;
  }

  /**
   * Rotates the node.
   * @param radians The number of radians to rotate the node by.
   */
  public rotate(radians: number) {
    this.rotation = this.rotation + radians;
  }

  /** The node's local scale. */
  public get scale() {
    return this._scale;
  }

  /**
   * Sets the node's local scale.
   * @param scale The scale to set the node's local scale to.
   */
  public set scale(scale: Vector2) {
    this._scale = scale;
  }

  /**
   * Applies scale to the node by multiplying its current local scale.
   * @param ratio The ratio to scale the node by.
   */
  public applyScale(ratio: Vector2) {
    this.scale = new Vector2(this.scale.x * ratio.x, this.scale.y * ratio.y);
  }

  private static readonly POSITION_X_DEFAULT = 0;
  private static readonly POSITION_Y_DEFAULT = 0;
  private static readonly ROTATION_DEFAULT = 0;
  private static readonly SCALE_X_DEFAULT = 1;
  private static readonly SCALE_Y_DEFAULT = 1;
}
