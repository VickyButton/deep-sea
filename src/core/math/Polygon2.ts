import type { Vector2 } from './Vector2';

/** A 2D polygon composed of vertices. */
export class Polygon2 {
  /** The vertices that form the polygon. */
  public vertices: Vector2[];

  /**
   * Creates a new Polygon2.
   * @param vertices The vertices that make up the polygon.
   */
  constructor(vertices: Vector2[]) {
    this.vertices = vertices;
  }

  /**
   * Checks if this polygon intersects another polygon.
   * @param other The other polygon to check for an intersection with.
   * @returns True if the polygons intersect, false if not.
   */
  public intersects(other: Polygon2) {
    // Check for intersections using this polygon as a basis for the projection axis.
    for (let i = 0; i < this.vertices.length; i++) {
      const axis = this.getAxis(this.vertices[i], this.vertices[(i + 1) % this.vertices.length]);
      const [minA, maxA] = this.findProjectionExtrema(axis);
      const [minB, maxB] = other.findProjectionExtrema(axis);

      if (minA > maxB || minB > maxA) {
        // Gap between the polygon projections.
        return false;
      }
    }

    // Check for intersections using the other polygon as a basis for the projection axis.
    for (let i = 0; i < other.vertices.length; i++) {
      const axis = this.getAxis(other.vertices[i], other.vertices[(i + 1) % other.vertices.length]);
      const [minA, maxA] = this.findProjectionExtrema(axis);
      const [minB, maxB] = other.findProjectionExtrema(axis);

      if (minA > maxB || minB > maxA) {
        // Gap between the polygon projections.
        return false;
      }
    }

    // No gap between any of the polygon projections.
    return true;
  }

  private getAxis(start: Vector2, end: Vector2) {
    return this.getLine(start, end).perpendicularCounterclockwise;
  }

  private getLine(start: Vector2, end: Vector2) {
    return end.subtract(start);
  }

  /**
   * Finds the min and max vertex projections for the polygon on a particular axis.
   * @param axis The axis to project the polygon's vertices onto.
   * @returns A tuple containing the polygon's min and max projections on the passed axis, respectively. 
   */
  public findProjectionExtrema(axis: Vector2): [number, number] {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    for (const vertex of this.vertices) {
      const projection = vertex.dot(axis);

      min = Math.min(min, projection);
      max = Math.max(max, projection);
    }

    return [min, max];
  }
}
