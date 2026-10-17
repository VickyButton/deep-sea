import type { Canvas } from './canvas.types';
import type { Matrix3D } from '../matrix3D/Matrix3D';

/** The 2D implementation of the Canvas interface. */
export class Canvas_2D implements Canvas {
  private readonly canvas: OffscreenCanvas;
  private readonly ctx: OffscreenCanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = new OffscreenCanvas(width, height);

    const ctx = this.canvas.getContext('2d');

    if (!ctx) {
      throw new Error('2D rendering is not supported.');
    }

    this.ctx = ctx;
  }

  public get height() {
    return this.canvas.height;
  }

  public set height(height: number) {
    this.canvas.height = height;
  }

  public get width() {
    return this.canvas.width;
  }

  public set width(width: number) {
    this.canvas.width = width;
  }

  public beginPath() {
    this.ctx.beginPath();
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public closePath() {
    this.ctx.closePath();
  }

  public drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise = false) {
    this.ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  }

  public drawLine(fromX: number, fromY: number, toX: number, toY: number) {
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
  }

  public drawRectangle(x: number, y: number, width: number, height: number) {
    this.ctx.rect(x, y, width, height);
  }

  public fill() {
    this.ctx.fill();
  }

  public resetTransform() {
    this.ctx.resetTransform();
  }

  public setFillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  public setStrokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  public setTransform(matrix: Matrix3D) {
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    const e = matrix[2][0];
    const f = matrix[2][1];

    this.ctx.setTransform(a, b, c, d, e, f);
  }

  public stroke() {
    this.ctx.stroke();
  }

  public toImageBitmap() {
    return this.canvas.transferToImageBitmap();
  }
}
