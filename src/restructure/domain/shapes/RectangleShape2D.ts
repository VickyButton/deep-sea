import type { Canvas } from '../canvases/Canvas';
import type { Transform2D } from '../Transform2D';
import { RectangleCollisionResolver2D } from './collisionResolvers/RectangleCollisionResolver2D';
import { Shape2D } from './Shape2D';
import { Vector2D } from '../Vector2D';

/**
 * Representation of a 2D rectangle.
 */
export class RectangleShape2D extends Shape2D {
  private _width: number;
  private _halfWidth: number;
  private isHalfWidthStale: boolean;
  private _height: number;
  private _halfHeight: number;
  private isHalfHeightStale: boolean;
  private _vertices: [Vector2D, Vector2D, Vector2D, Vector2D];
  private isVerticesStale: boolean;

  constructor(options?: RectangleShape2D_Options) {
    super();

    this._width = options?.width ?? 1;
    this._halfWidth = this.computeHalfWidth();
    this.isHalfWidthStale = false;
    this._height = options?.height ?? 1;
    this._halfHeight = this.computeHalfHeight();
    this.isHalfHeightStale = false;
    this._vertices = this.computeVertices();
    this.isVerticesStale = false;
  }

  private computeHalfWidth() {
    return 0.5 * this._width;
  }

  private computeHalfHeight() {
    return 0.5 * this._height;
  }

  private computeVertices(): [Vector2D, Vector2D, Vector2D, Vector2D] {
    return [
      this.computeTopRightVertex(),
      this.computeTopLeftVertex(),
      this.computeBottomLeftVertex(),
      this.computeBottomRightVertex(),
    ];
  }

  /** The width of the rectangle. */
  public get width() {
    return this._width;
  }

  public set width(width: number) {
    this._width = width;
    this.markHalfWidthAsStale();
    this.markVerticesAsStale();
  }

  private markHalfWidthAsStale() {
    this.isHalfWidthStale = true;
  }

  private markVerticesAsStale() {
    this.isVerticesStale = true;
  }

  /** The half-width of the rectangle. */
  public get halfWidth() {
    this.updateHalfWidthIfStale();

    return this._halfWidth;
  }

  private updateHalfWidthIfStale() {
    if (this.isHalfWidthStale) {
      this._halfWidth = this.computeHalfWidth();
      this.isHalfWidthStale = false;
    }
  }

  /** The height of the rectangle. */
  public get height() {
    return this._height;
  }

  public set height(height: number) {
    this._height = height;
    this.markHalfHeightAsStale();
    this.markVerticesAsStale();
  }

  private markHalfHeightAsStale() {
    this.isHalfHeightStale = true;
  }

  /** The half-height of the rectangle. */
  public get halfHeight() {
    this.updateHalfHeightIfStale();

    return this._halfHeight;
  }

  private updateHalfHeightIfStale() {
    if (this.isHalfHeightStale) {
      this._halfHeight = this.computeHalfHeight();
      this.isHalfHeightStale = false;
    }
  }

  /** The width and height of the rectangle. */
  public get size() {
    return new Vector2D(this._width, this._height);
  }

  /** The vertices of the rectangle, in counterclockwise order. */
  public get vertices() {
    this.updateVerticesIfStale();

    return this._vertices;
  }

  private updateVerticesIfStale() {
    if (this.isVerticesStale) {
      this._vertices = this.computeVertices();
      this.isVerticesStale = false;
    }
  }

  private computeTopRightVertex() {
    return new Vector2D(this.halfWidth, this.halfHeight);
  }

  private computeTopLeftVertex() {
    return new Vector2D(-this.halfWidth, this.halfHeight);
  }

  private computeBottomLeftVertex() {
    return new Vector2D(-this.halfWidth, -this.halfHeight);
  }

  private computeBottomRightVertex() {
    return new Vector2D(this.halfWidth, -this.halfHeight);
  }

  public get boundingBox() {
    return this.vertices;
  }

  protected computeBoundingBox() {
    return {
      left: -this.halfWidth,
      right: this.halfHeight,
      top: this.halfHeight,
      bottom: -this.halfHeight,
    };
  }

  public isCollidingWith(transform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    return new RectangleCollisionResolver2D(this, transform, shape, shapeTransform).resolveCollision();
  }

  public draw(canvas: Canvas) {
    this.drawRectangle(canvas);
  }

  private drawRectangle(canvas: Canvas) {
    const lines = this.getLines();

    for (const [from, to] of lines) {
      this.drawLine(canvas, from, to);
    }
  }

  private getLines() {
    const lines: [Vector2D, Vector2D][] = [];
    const vertices = this.vertices;

    for (let i = 0; i < vertices.length; i++) {
      const from = vertices[i];
      const to = vertices[(i + 1) % vertices.length];

      lines.push([from, to]);
    }

    return lines;
  }

  private drawLine(canvas: Canvas, from: Vector2D, to: Vector2D) {
    canvas.createLine(from.x, from.y, to.x, to.y);
  }

  public static isRectangle(shape: Shape2D): shape is RectangleShape2D {
    return shape instanceof RectangleShape2D;
  }
}

export interface RectangleShape2D_Options {
  width?: number;
  height?: number;
}
