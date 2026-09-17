import type { Shape2D_Options } from './Shape2D';
import { Vector2D } from '../Vector2D';
import { Shape2D } from './Shape2D';

/**
 * Representation of a 2D polygon defined by a set of vertices.
 */
export class PolygonShape2D extends Shape2D {
  private _vertices: Vector2D[];

  constructor(options?: PolygonShape2D_Options) {
    super(options);

    if (options?.vertices && !this.isValidVertices(options.vertices)) {
      throw this.createInvalidVerticesError();
    }

    this._vertices = options?.vertices ?? this.createDefaultPolygon();
  }

  private isValidVertices(polygon: Vector2D[]) {
    return polygon.length >= 3;
  }

  private createInvalidVerticesError() {
    return new Error('Invalid vertices: a polygon must have at least 3 vertices.');
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

  /**
   * The post-transformation vertices that form the polygon, in counterclockwise order.
   */
  public get vertices() {
    return this.computeVertices();
  }

  private computeVertices() {
    const transformationMatrix = this.transform.computeTransformationMatrix();

    return this._vertices.map((vertex) => transformationMatrix.multiplyVector2D(vertex));
  }

  public get boundingBox() {
    return this.computeBoundingBox();
  }

  private computeBoundingBox() {
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
  vertices?: Vector2D[];
}
