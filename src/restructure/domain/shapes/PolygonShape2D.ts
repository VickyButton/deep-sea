import type { Shape2D_Options } from './Shape2D';
import { Vector2D } from '../Vector2D';
import { Shape2D } from './Shape2D';

/**
 * Representation of a 2D polygon defined by a set of vertices.
 */
export class PolygonShape2D extends Shape2D {
  private _polygon: Vector2D[];

  constructor(options?: PolygonShape2D_Options) {
    super(options);

    this._polygon = options?.polygon ?? this.createDefaultPolygon();
    this.throwIfInvalidPolygon(this._polygon);
  }

  private createDefaultPolygon() {
    // Default polygon is a triangle.
    return this.createRegularPolygonWithNumSides(3);
  }

  private createRegularPolygonWithNumSides(numSides: number) {
    const stepAngle = this.computeStepAngle(numSides);
    const polygon: Vector2D[] = [];

    for (let i = 0; i < numSides; i++) {
      const angle = i * stepAngle;

      polygon.push(this.computePointAlongUnitCircle(angle));
    }

    return polygon;
  }

  private computeStepAngle(numSides: number) {
    return 2 * Math.PI / numSides;
  }

  private computePointAlongUnitCircle(angle: number) {
    const x = Math.cos(angle);
    const y = Math.sin(angle);

    return new Vector2D(x, y);
  }

  private throwIfInvalidPolygon(polygon: Vector2D[]) {
    if (!this.isValidPolygon(polygon)) {
      throw new Error('A polygon must have at least 3 vertices.');
    }
  }

  private isValidPolygon(polygon: Vector2D[]) {
    return polygon.length >= 3;
  }

  /** The vertices that form the polygon, in counterclockwise order. */
  public get polygon() {
    return this._polygon;
  }

  public set polygon(polygon: Vector2D[]) {
    this.throwIfInvalidPolygon(polygon);
    this._polygon = polygon;
  }

  /**
   * The post-transformation vertices that form the polygon, in counterclockwise order.
   */
  public get vertices() {
    return this.computeVertices();
  }

  private computeVertices() {
    const transformationMatrix = this.transform.computeTransformationMatrix();

    return this.polygon.map((vertex) => transformationMatrix.multiplyVector2D(vertex));
  }

  public get boundingRectangle() {
    return this.computeBoundingRectangle();
  }

  private computeBoundingRectangle() {
    const vertices = this.vertices;
    const xValues = vertices.map((vertex) => vertex.x);
    const yValues = vertices.map((vertex) => vertex.y);

    return {
      left: Math.min(...xValues),
      right: Math.max(...xValues),
      top: Math.max(...yValues),
      bottom: Math.min(...yValues),
    };
  }

  public isCollidingWith() {
    // TODO: Implement;
    return false;
  }

  public draw() {
    // TODO: Implement.
  }
}

export interface PolygonShape2D_Options extends Shape2D_Options {
  polygon?: Vector2D[];
}
