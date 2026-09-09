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
    this.scale = options?.scale ? new Vector2D(options.scale[0], options.scale[1]) : new Vector2D(1, 1);
    this.translation = options?.translation ? new Vector2D(options.translation[0], options.translation[1]) : new Vector2D();
  }

  /**
   * Applies the transformation matrix to a vector.
   * @param vector The vector to apply the transformation matrix to.
   * @returns The resulting vector after being transformed.
   */
  public apply(vector: Vector2D) {
    const transformationMatrix = this.calculateTransformationMatrix();
    const vector3D = new Vector3D(vector.x, vector.y, 1);

    return transformationMatrix.multiplyVector(vector3D).to2D();
  }

  private calculateTransformationMatrix() {
    const rotationMatrix = this.calculateRotationMatrix();
    const scalingMatrix = this.calculateScalingMatrix();
    const translationMatrix = this.calculateTranslationMatrix();

    return rotationMatrix.multiplyMatrix(scalingMatrix).multiplyMatrix(translationMatrix);
  }

  private calculateRotationMatrix() {
    const cosine = Math.cos(this.rotation);
    const sine = Math.sin(this.rotation);

    return new Matrix3D([
      new Vector3D(cosine, sine, 0),
      new Vector3D(-sine, cosine, 0),
      new Vector3D(0, 0, 1),
    ]);
  }

  private calculateScalingMatrix() {
    return new Matrix3D([
      new Vector3D(this.scale.x, 0, 0),
      new Vector3D(0, this.scale.y, 0),
      new Vector3D(0, 0, 1),
    ]);
  }

  private calculateTranslationMatrix() {
    return new Matrix3D([
      new Vector3D(1, 0, 0),
      new Vector3D(0, 1, 0),
      new Vector3D(this.translation.x, this.translation.y, 1),
    ]);
  }
}

export interface Transform2D_Options {
  rotation?: number;
  scale?: [number, number];
  translation?: [number, number];
}
