import type { Transform2D } from '../Transform2D';
import type { BoundingBox2D } from './shapes.types';
import type { GraphicsCanvas } from '../canvases/GraphicsCanvas';
import { Vector2D } from '../Vector2D';
import { PolygonCollisionResolver2D } from './collisionResolvers/PolygonCollisionResolver2D';
import { Shape2D } from './Shape2D';

/**
 * Representation of a 2D polygon defined by a set of vertices.
 */
export class PolygonShape2D extends Shape2D {
  private _vertices: Vector2D[];
  private _boundingBox: BoundingBox2D;
  private isBoundingBoxStale: boolean;

  constructor(options?: PolygonShape2D_Options) {
    super();

    if (options?.vertices && !this.isValidVertices(options.vertices)) {
      throw this.createInvalidVerticesError();
    }

    this._vertices = options?.vertices ?? this.computeDefaultPolygonVertices();
    this._boundingBox = this.computeBoundingBox();
    this.isBoundingBoxStale = false;
  }

  private isValidVertices(vertices: Vector2D[]) {
    return vertices.length >= 3;
  }

  private createInvalidVerticesError() {
    return new Error('Invalid vertices: a polygon must have at least 3 vertices.');
  }

  private computeDefaultPolygonVertices() {
    // Default polygon is a triangle.
    return computeRegularPolygonVertices(3);
  }

  private computeBoundingBox(): [Vector2D, Vector2D, Vector2D, Vector2D] {
    const vertices = this.vertices;
    const xValues = vertices.map((vertex) => vertex.x);
    const xMax = Math.max(...xValues);
    const xMin = Math.min(...xValues);
    const yValues = vertices.map((vertex) => vertex.y);
    const yMax = Math.max(...yValues);
    const yMin = Math.min(...yValues);

    return [
      new Vector2D(xMax, yMax),
      new Vector2D(xMin, yMax),
      new Vector2D(xMin, yMin),
      new Vector2D(xMax, yMin),
    ];
  }

  /** The set of vertices that form the polygon, in counterclockwise order. */
  public get vertices() {
    return structuredClone(this._vertices);
  }

  public set vertices(vertices: Vector2D[]) {
    if (!this.isValidVertices(vertices)) {
      throw this.createInvalidVerticesError();
    }

    this._vertices = vertices;
  }

  public get boundingBox() {
    this.updateBoundingBoxIfStale();

    return this._boundingBox;
  }

  private updateBoundingBoxIfStale() {
    if (this.isBoundingBoxStale) {
      this._boundingBox = this.computeBoundingBox();
      this.isBoundingBoxStale = false;
    }
  }

  public isCollidingWith(transform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    return new PolygonCollisionResolver2D(this, transform, shape, shapeTransform).resolveCollision();
  }

  public draw(canvas: GraphicsCanvas) {
    this.drawPolygon(canvas);
  }

  private drawPolygon(canvas: GraphicsCanvas) {
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

  private drawLine(canvas: GraphicsCanvas, from: Vector2D, to: Vector2D) {
    canvas.createLine(from.x, from.y, to.x, to.y);
  }

  public static isPolygon(shape: Shape2D): shape is PolygonShape2D {
    return shape instanceof PolygonShape2D;
  }

  public static createRegularPolygon(numSides = 3) {
    return new PolygonShape2D({
      vertices: computeRegularPolygonVertices(numSides),
    });
  }
}

export interface PolygonShape2D_Options {
  vertices?: Vector2D[];
}

function computeRegularPolygonVertices(numSides: number) {
  const stepAngle = computeStepAngle(numSides);
  const polygon: Vector2D[] = [];

  for (let i = 0; i < numSides; i++) {
    const angle = i * stepAngle;

    polygon.push(computePointAlongUnitCircle(angle));
  }

  return polygon;
}

function computeStepAngle(numSides: number) {
  return 2 * Math.PI / numSides;
}

function computePointAlongUnitCircle(angle: number) {
  const x = Math.cos(angle);
  const y = Math.sin(angle);

  return new Vector2D(x, y);
}
