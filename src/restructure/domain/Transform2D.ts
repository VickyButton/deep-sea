import { Vector2D } from './Vector2D';

/**
 * A 2D transform matrix.
 */
export class Transform2D {
  /** The transform position vector. */
  public position: Vector2D;
  /** The transform scalar vector. */
  public scale: Vector2D;
  /** The transform rotation in radians. */
  public rotation: number;

  constructor(options?: Transform2D_Options) {
    this.position = options?.position ? new Vector2D(options.position[0], options.position[1]) : new Vector2D();
    this.scale = options?.scale ? new Vector2D(options.scale[0], options.scale[1]) : new Vector2D(1, 1);
    this.rotation = options?.rotation ?? 0;
  }

  /**
   * Applies the transformation matrix to a vector.
   * @param vector The vector to apply the transformation matrix to.
   * @returns The resulting vector after being transformed.
   */
  public applyTransform(vector: Vector2D) {
    let result = vector;
    result = this.applyTranslation(result);
    result = this.applyRotation(result);
    result = this.applyScale(result);
    return result;
  }

  private applyTranslation(vector: Vector2D) {
    const x = vector.x + this.position.x;
    const y = vector.y + this.position.y;
    return new Vector2D(x, y);
  }

  private applyRotation(vector: Vector2D) {
    const rotationMatrix = this.calculateRotationMatrix();
    const x = vector.x * rotationMatrix[0][0] + vector.y * rotationMatrix[1][0];
    const y = vector.x * rotationMatrix[0][1] + vector.y * rotationMatrix[1][1];
    return new Vector2D(x, y);
  }

  private calculateRotationMatrix(): [Vector2D, Vector2D] {
    const cosine = Math.cos(this.rotation);
    const sine = Math.sin(this.rotation);

    return [
      new Vector2D(cosine, sine),
      new Vector2D(-sine, cosine),
    ];
  }

  private applyScale(vector: Vector2D) {
    const scaleMatrix = this.calculateScalingMatrix();
    const x = vector.x * scaleMatrix[0][0] + vector.y * scaleMatrix[1][0];
    const y = vector.x * scaleMatrix[0][1] + vector.y * scaleMatrix[1][1];
    return new Vector2D(x, y);
  }

  private calculateScalingMatrix(): [Vector2D, Vector2D] {
    return [
      new Vector2D(this.scale.x, 0),
      new Vector2D(0, this.scale.y),
    ];
  }
}

export interface Transform2D_Options {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
}
