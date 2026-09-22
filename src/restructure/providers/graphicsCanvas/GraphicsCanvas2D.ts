import type { Matrix3D } from '../../domain/Matrix3D';
import type { GraphicsCanvas } from '../graphicsCanvas.types';

export class GraphicsCanvas2D implements GraphicsCanvas {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public get width() {
    return this.ctx.canvas.width;
  }

  public set width(width: number) {
    this.ctx.canvas.width = width;
  }

  public get height() {
    return this.ctx.canvas.height;
  }

  public set height(height: number) {
    this.ctx.canvas.height = height;
  }

  public beginPath() {
    this.ctx.beginPath();
  }

  public closePath() {
    this.ctx.closePath();
  }

  public transform(matrix: Matrix3D) {
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    const e = matrix[2][0];
    const f = matrix[2][1];

    this.ctx.setTransform(a, b, c, d, e, f);
  }

  public createLine(fromX: number, fromY: number, toX: number, toY: number) {
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
  }

  public createArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise = false) {
    this.ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  }

  public createRectangle(x: number, y: number, width: number, height: number) {
    this.ctx.rect(x, y, width, height);
  }

  public setStrokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  public stroke() {
    this.ctx.stroke();
  }

  public setFillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  public fill() {
    this.ctx.fill();
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
