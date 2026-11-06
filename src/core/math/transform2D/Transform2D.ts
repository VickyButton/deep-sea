import { Vector2 } from '../vector2/Vector2';

/** A 2D transformation matrix that can be applied to a 2D vector. */
export class Transform2D {
  /** The three columns of the transformation matrix. */
  public readonly columns: [Vector2, Vector2, Vector2];

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

  /** The inverted transformation matrix. */
  public get inverted() {
    const transform = this.copy();
    transform.invert();

    return transform;
  }

  /** Inverts the transformation matrix. */
  public invert() {
    // Invert the basis of the matrix.
    this.invertBasis();

    // Flip signs of cells in the third column.
    this.columns[2].scale(-1);

    // Apply basis transform to the third column.
    this.columns[2] = this.applyBasisTo(this.columns[2]);
  }

  /** Inverts the basis of the transformation matrix. */
  public invertBasis() {
    const determinant = this.determinant;

    if (determinant === 0) {
      throw new Error('Cannot invert matrix with determinant of zero.');
    }

    // Swap cells "a" and "d".
    const aCopy = this.columns[0][0];
    const dCopy = this.columns[1][1];
    this.columns[0][0] = dCopy;
    this.columns[1][1] = aCopy;

    // Multiply cells in fist two columns by determinants.
    const inverseDeterminant = 1 / determinant;
    this.columns[0][0] *= inverseDeterminant;
    this.columns[0][1] *= -inverseDeterminant;
    this.columns[1][0] *= -inverseDeterminant;
    this.columns[1][1] *= inverseDeterminant;
  }

  /**
   * Applies the affine transform to a vector.
   * @param vector The vector to apply the affine transform to.
   * @returns The affine-transformed vector.
   */
  public applyTo(vector: Vector2) {
    return this.applyBasisTo(vector).add(this.columns[2]);
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
   * Creates a copy of this transformation matrix.
   * @returns A copy of this transformation matrix.
   */
  public copy() {
    const transform = new Transform2D();
    transform.columns[0] = this.columns[0].copy();
    transform.columns[1] = this.columns[1].copy();
    transform.columns[2] = this.columns[2].copy();

    return transform;
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

  private static readonly DEFAULT_ROTATION = 0;
  private static readonly DEFAULT_SCALE = new Vector2(1, 1);
  private static readonly DEFAULT_TRANSLATION = new Vector2(0, 0);
}
