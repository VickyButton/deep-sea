import { Vector2 } from '../vector2/Vector2';

/** A 2D transformation that can be applied to a 2D vector. */
export class Transform2D {
  private readonly columns: [Vector2, Vector2, Vector2];

  constructor(rotation = Transform2D.DEFAULT_ROTATION, scale = Transform2D.DEFAULT_SCALE, translation = Transform2D.DEFAULT_TRANSLATION) {
    this.columns = this.computeMatrix(rotation, scale, translation);
  }

  private computeMatrix(rotation: number, scale: Vector2, translation: Vector2): [Vector2, Vector2, Vector2] {
    const cosine = Math.cos(rotation);
    const sine = Math.sin(rotation);

    return [
      new Vector2(cosine * scale.x, sine * scale.x),
      new Vector2(-sine * scale.y, cosine * scale.y),
      new Vector2(translation.x, translation.y),
    ];
  }

  /** The determinant of the matrix. */
  public get determinant() {
    return this.columns[0][0] * this.columns[1][1] - this.columns[0][1] * this.columns[1][0];
  }

  /**
   * Applies the affine transform to a vector.
   * @param vector The vector to apply the affine transform to.
   * @returns The affine-transformed vector.
   */
  public applyTo(vector: Vector2) {
    return new Vector2(
      vector.dot(new Vector2(this.columns[0][0], this.columns[1][0])),
      vector.dot(new Vector2(this.columns[0][1], this.columns[1][1])),
    ).add(this.columns[2]);
  }

  /**
   * Applies the basis transform to a vector.
   * @param vector The vector to apply the basis transform to.
   * @returns The basis-transformed vector.
   */
  public applyBasisTo(vector: Vector2) {
    return new Vector2(
      vector.dot(new Vector2(this.columns[0][0], this.columns[1][0])),
      vector.dot(new Vector2(this.columns[0][1], this.columns[1][1])),
    );
  }

  /**
   * Creates a new Transform2D from a rotation.
   * @param rotation The rotation to create the new transform with.
   */
  public static fromRotation(rotation: number) {
    return new Transform2D(rotation, Transform2D.DEFAULT_SCALE, Transform2D.DEFAULT_TRANSLATION);
  }

  /**
   * Creates a new Transform2D from a scale.
   * @param rotation The scale to create the new transform with.
   */
  public static fromScale(scale: Vector2) {
    return new Transform2D(Transform2D.DEFAULT_ROTATION, scale, Transform2D.DEFAULT_TRANSLATION);
  }

  /**
   * Creates a new Transform2D from a translation.
   * @param rotation The translation to create the new transform with.
   */
  public static fromTranslation(translation: Vector2) {
    return new Transform2D(Transform2D.DEFAULT_ROTATION, Transform2D.DEFAULT_SCALE, translation);
  }

  private static get DEFAULT_ROTATION() {
    return 0;
  }

  private static get DEFAULT_SCALE() {
    return new Vector2(1, 1);
  }

  private static get DEFAULT_TRANSLATION() {
    return new Vector2(0, 0);
  }
}
