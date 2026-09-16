import type { PolygonShape2D } from '../shapes/PolygonShape2D';
import { Vector2D } from '../Vector2D';
import { CollisionResolver2D } from './CollisionResolver2D';

export class PolygonPairCollisionResolver2D extends CollisionResolver2D<PolygonShape2D, PolygonShape2D> {
  public resolveCollision() {
    return this.resolveCollisionUsingSeparatingAxisTheorem();
  }

  private resolveCollisionUsingSeparatingAxisTheorem() {
    const verticesA = this.shapeA.vertices;
    const verticesB = this.shapeB.vertices;

    // TODO: Refactor redundant loop code into separate method.
    for (let i = 0; i < verticesA.length; i++) {
      const start = verticesA[i];
      const end = verticesA[(i + 1) % verticesA.length];
      const side = this.getVectorBetweenTwoPoints(start, end);
      const axis = this.getPerpendicularVectorCounterclockwise(side);
      const [minA, maxA] = this.findMinMaxProjectionsOnAxis(verticesA, axis);
      const [minB, maxB] = this.findMinMaxProjectionsOnAxis(verticesB, axis);

      if (this.isGapBetweenVertexProjections(minA, maxA, minB, maxB)) {
        return false;
      }
    }

    for (let i = 0; i < verticesB.length; i++) {
      const start = verticesB[i];
      const end = verticesB[(i + 1) % verticesB.length];
      const side = this.getVectorBetweenTwoPoints(start, end);
      const axis = this.getPerpendicularVectorCounterclockwise(side);
      const [minA, maxA] = this.findMinMaxProjectionsOnAxis(verticesA, axis);
      const [minB, maxB] = this.findMinMaxProjectionsOnAxis(verticesB, axis);

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

  private findMinMaxProjectionsOnAxis(vertices: Vector2D[], axis: Vector2D) {
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
