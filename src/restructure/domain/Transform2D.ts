import { Matrix3D } from './Matrix3D';
import { Vector2D } from './Vector2D';
import { Vector3D } from './Vector3D';

/**
 * A 2D transform matrix.
 * 
 * In a 2D transform, transformations are applied in the following order:
 * 1. Rotation
 * 2. Scaling
 * 3. Translation
 */
export class Transform2D {
  /** The transform rotation in radians. */
  public rotation: number;
  /** The transform scalar vector. */
  public scale: Vector2D;
  /** The transform translation vector. */
  public translation: Vector2D;

  constructor(options?: Transform2D_Options) {
    this.rotation = options?.rotation ?? 0;
    this.scale = options?.scale ?? new Vector2D(1, 1);
    this.translation = options?.translation ?? new Vector2D(0, 0);
  }

  /**
   * Computes a transformation matrix for the transform.
   * @returns The composite transformation matrix.
   */
  public computeTransformationMatrix() {
    // TODO: Cache matrix with a matrix getter.
    const rotationMatrix = this.computeRotationMatrix();
    const scalingMatrix = this.computeScalingMatrix();
    const translationMatrix = this.computeTranslationMatrix();

    // Rotation is applied first, then scaling, and finally translation.
    return rotationMatrix.multiplyMatrix(scalingMatrix).multiplyMatrix(translationMatrix);
  }

  private computeRotationMatrix() {
    const cosine = Math.cos(this.rotation);
    const sine = Math.sin(this.rotation);

    return new Matrix3D([
      new Vector3D(cosine, sine, 0),
      new Vector3D(-sine, cosine, 0),
      new Vector3D(0, 0, 1),
    ]);
  }

  private computeScalingMatrix() {
    return new Matrix3D([
      new Vector3D(this.scale.x, 0, 0),
      new Vector3D(0, this.scale.y, 0),
      new Vector3D(0, 0, 1),
    ]);
  }

  private computeTranslationMatrix() {
    return new Matrix3D([
      new Vector3D(1, 0, 0),
      new Vector3D(0, 1, 0),
      new Vector3D(this.translation.x, this.translation.y, 1),
    ]);
  }
}

export interface Transform2D_Options {
  rotation?: number;
  scale?: Vector2D;
  translation?: Vector2D;
}
