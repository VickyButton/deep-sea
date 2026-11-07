import type { Node2DOptions } from './Node2D.types';
import { Vector2 } from '../../../core/math/Vector2';
import { CanvasNode } from '../main/CanvasNode';

export class Node2D extends CanvasNode {
  private _position: Vector2;
  private _rotation: number;
  private _scale: Vector2;

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

  public get position() {
    return this._position;
  }

  public set position(position: Vector2) {
    this._position = position;
  }

  public get rotation() {
    return this._rotation;
  }

  public set rotation(radians: number) {
    this._rotation = radians;
  }

  public get scale() {
    return this._scale;
  }

  public set scale(scale: Vector2) {
    this._scale = scale;
  }

  public applyScale(ratio: Vector2) {
    this.scale = new Vector2(this.scale.x * ratio.x, this.scale.y * ratio.y);
  }

  public rotate(radians: number) {
    this.rotation = this.rotation + radians;
  }

  public translate(offset: Vector2) {
    this.position = this.position.add(offset);
  }

  private static readonly POSITION_X_DEFAULT = 0;
  private static readonly POSITION_Y_DEFAULT = 0;
  private static readonly ROTATION_DEFAULT = 0;
  private static readonly SCALE_X_DEFAULT = 1;
  private static readonly SCALE_Y_DEFAULT = 1;
}
