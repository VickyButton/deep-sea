import { Vector2D } from '../Vector2D';
import { CollisionResolver } from './CollisionResolver';

/**
 * Used for resolving a collision between two 2D polygons (each defined by a set of vertices) using Separating Axis Theorem.
 */
export class SeparatingAxisTheoremCollisionResolver2D extends CollisionResolver {
  private readonly verticesA: Vector2D[];
  private readonly verticesB: Vector2D[];

  constructor(verticesA: Vector2D[], verticesB: Vector2D[]) {
    super();

    this.verticesA = verticesA;
    this.verticesB = verticesB;
  }

  public resolveCollision() {
    return this.isNoGapBetweenVertexProjections();
  }

  private isNoGapBetweenVertexProjections() {
    // TODO: Refactor redundant loop code into separate method.
    for (let i = 0; i < this.verticesA.length; i++) {
      const start = this.verticesA[i];
      const end = this.verticesA[(i + 1) % this.verticesA.length];
      const side = this.getVectorBetweenTwoPoints(start, end);
      const axis = this.getPerpendicularVectorCounterclockwise(side);
      const [minA, maxA] = this.findMinMaxVertexProjectionsOnAxis(this.verticesA, axis);
      const [minB, maxB] = this.findMinMaxVertexProjectionsOnAxis(this.verticesB, axis);

      if (this.isGapBetweenVertexProjections(minA, maxA, minB, maxB)) {
        return false;
      }
    }

    for (let i = 0; i < this.verticesB.length; i++) {
      const start = this.verticesB[i];
      const end = this.verticesB[(i + 1) % this.verticesB.length];
      const side = this.getVectorBetweenTwoPoints(start, end);
      const axis = this.getPerpendicularVectorCounterclockwise(side);
      const [minA, maxA] = this.findMinMaxVertexProjectionsOnAxis(this.verticesA, axis);
      const [minB, maxB] = this.findMinMaxVertexProjectionsOnAxis(this.verticesB, axis);

      if (this.isGapBetweenVertexProjections(minA, maxA, minB, maxB)) {
        return false;
      }
    }

    return true;
  }

  private getVectorBetweenTwoPoints(start: Vector2D, end: Vector2D) {
    return end.subtract(start);
  }

  private getPerpendicularVectorCounterclockwise(vector: Vector2D) {
    return new Vector2D(-vector.y, vector.x);
  }

  private findMinMaxVertexProjectionsOnAxis(vertices: Vector2D[], axis: Vector2D) {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    for (const vertex of vertices) {
      const projection = this.projectVertexOntoAxis(vertex, axis);

      min = Math.min(min, projection);
      max = Math.max(max, projection);
    }

    return [min, max];
  }

  private projectVertexOntoAxis(vertex: Vector2D, axis: Vector2D) {
    return vertex.computeDotProduct(axis);
  }

  private isGapBetweenVertexProjections(minA: number, maxA: number, minB: number, maxB: number) {
    return minA > maxB || minB > maxA;
  }
}
