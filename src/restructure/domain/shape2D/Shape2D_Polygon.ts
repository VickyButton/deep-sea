import type { Shape2D } from './shape2D.types';
import type { DrawStep_DrawLine } from '../drawStep/drawStep.types';
import type { Transform2D } from '../transform2D/Transform2D';
import { Vector2D } from '../vector2D/Vector2D';
import { CollisionResolver2D_Polygon } from './collisionResolver2D/CollisionResolver2D_Polygon';

/** The polygon implementation of the Shape2D interface. */
export class Shape2D_Polygon implements Shape2D {
  private _vertices: Vector2D[];

  constructor(options?: PolygonShape2D_Options) {
    if (options?.vertices && !this.isValidVertices(options.vertices)) {
      throw this.createInvalidVerticesError();
    }

    this._vertices = options?.vertices ?? this.computeDefaultPolygonVertices();
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

  public get boundingBox() {
    return this.computeBoundingBox();
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

  public get drawSteps() {
    return this.computeDrawSteps();
  }

  private computeDrawSteps() {
    return this.computeDrawPolygonSteps();
  }

  private computeDrawPolygonSteps(): DrawStep_DrawLine[] {
    return this.computeLines().map(([from, to]) => ({
      type: 'DRAW_LINE',
      fromX: from.x,
      fromY: from.y,
      toX: to.x,
      toY: to.y,
    }));
  }

  private computeLines() {
    const lines: [Vector2D, Vector2D][] = [];
    const vertices = this.vertices;

    for (let i = 0; i < vertices.length; i++) {
      const from = vertices[i];
      const to = vertices[(i + 1) % vertices.length];

      lines.push([from, to]);
    }

    return lines;
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

  public overlaps(transform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    return new CollisionResolver2D_Polygon(this, transform, shape, shapeTransform).resolveCollision();
  }

  public static isPolygon(shape: Shape2D): shape is Shape2D_Polygon {
    return shape instanceof Shape2D_Polygon;
  }

  public static createRegularPolygon(numSides = 3) {
    return new Shape2D_Polygon({
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
