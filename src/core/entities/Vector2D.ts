export class Vector2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(addend: Vector2D) {
    this.x += addend.x;
    this.y += addend.y;
  }

  public subtract(subtrahend: Vector2D) {
    this.x -= subtrahend.x;
    this.y -= subtrahend.y;
  }

  public multiply(multiplicand: Vector2D) {
    this.x *= multiplicand.x;
    this.y *= multiplicand.y;
  }

  public divide(divisor: Vector2D) {
    this.x /= divisor.x;
    this.y /= divisor.y;
  }
}
