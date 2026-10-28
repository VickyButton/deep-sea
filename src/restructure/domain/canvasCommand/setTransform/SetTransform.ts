/** The canvas command for setting the transform. */
export class SetTransform {
  public readonly type = 'SET_TRANSFORM';
  /** The cell in the first row and first column of the matrix. */
  public readonly a: number;
  /** The cell in the second row and first column of the matrix. */
  public readonly b: number;
  /** The cell in the first row and second column of the matrix. */
  public readonly c: number;
  /** The cell in the second row and second column of the matrix. */
  public readonly d: number;
  /** The cell in the first row and third column of the matrix. */
  public readonly e: number;
  /** The cell in the second row and third column of the matrix. */
  public readonly f: number;

  constructor(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
}
