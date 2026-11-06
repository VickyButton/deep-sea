import type { Node2DOptions } from './node2D.types';
import { Vector2 } from '../../../core/math/vector2/Vector2';
import { CanvasNode } from '../canvasNode/CanvasNode';

export class Node2D extends CanvasNode {
  private _positionX: number;
  private _positionY: number;
  private _rotation: number;
  private _scaleX: number;
  private _scaleY: number;

  constructor(options: Node2DOptions) {
    super(options);

    this._positionX = options.positionX;
    this._positionY = options.positionY;
    this._rotation = options.rotation;
    this._scaleX = options.scaleX;
    this._scaleY = options.scaleY;
  }

  public get position() {
    return new Vector2(this._positionX, this._positionY);
  }

  public set position(position: Vector2) {
    this._positionX = position.x;
    this._positionY = position.y;
  }

  public get rotation() {
    return this._rotation;
  }

  public set rotation(radians: number) {
    this._rotation = radians;
  }

  public get scale() {
    return new Vector2(this._scaleX, this._scaleY);
  }

  public set scale(scale: Vector2) {
    this._scaleX = scale.x;
    this._scaleY = scale.y;
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
}
