import type { Canvas } from './canvas/Canvas';
import type { CanvasCommand } from './canvasCommandTranslator.types';
import { CanvasCommandTranslator } from './CanvasCommandTranslator';

/** The default canvas command translator. */
export class DefaultCanvasCommandTranslator extends CanvasCommandTranslator {
  public translate(command: CanvasCommand) {
    switch (command.type) {
      case 'BEGIN_PATH':
        return this.createBeginPathCallback();
      case 'CLOSE_PATH':
        return this.createClosePathCallback();
      case 'DRAW_ARC':
        return this.createDrawArcCallback(command.x, command.y, command.radius, command.startAngle, command.endAngle, command.counterClockwise);
      case 'DRAW_LINE':
        return this.createDrawLineCallback(command.fromX, command.fromY, command.toX, command.toY);
      case 'DRAW_RECTANGLE':
        return this.createDrawRectangleCallback(command.x, command.y, command.width, command.height);
      case 'FILL':
        return this.createFillCallback();
      case 'RESET_TRANSFORM':
        return this.createResetTransformCallback();
      case 'SET_FILL_COLOR':
        return this.createSetFillColorCallback(command.color);
      case 'SET_STROKE_COLOR':
        return this.createSetStrokeColorCallback(command.color);
      case 'SET_TRANSFORM':
        return this.createSetTransformCallback(command.a, command.b, command.c, command.d, command.e, command.f);
      case 'STROKE':
        return this.createStrokeCallback();
      default:
        throw new Error('Unable to translate canvas command.');
    }
  }

  private createBeginPathCallback() {
    return (canvas: Canvas) => canvas.beginPath();
  }

  private createClosePathCallback() {
    return (canvas: Canvas) => canvas.closePath();
  }

  private createDrawArcCallback(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise: boolean) {
    return (canvas: Canvas) => canvas.drawArc(x, y, radius, startAngle, endAngle, counterClockwise);
  }

  private createDrawLineCallback(fromX: number, fromY: number, toX: number, toY: number) {
    return (canvas: Canvas) => canvas.drawLine(fromX, fromY, toX, toY);
  }

  private createDrawRectangleCallback(x: number, y: number, width: number, height: number) {
    return (canvas: Canvas) => canvas.drawRectangle(x, y, width, height);
  }

  private createFillCallback() {
    return (canvas: Canvas) => canvas.fill();
  }

  private createResetTransformCallback() {
    return (canvas: Canvas) => canvas.resetTransform();
  }

  private createSetFillColorCallback(color: string) {
    return (canvas: Canvas) => canvas.setFillColor(color);
  }

  private createSetStrokeColorCallback(color: string) {
    return (canvas: Canvas) => canvas.setStrokeColor(color);
  }

  private createSetTransformCallback(a: number, b: number, c: number, d: number, e: number, f: number) {
    return (canvas: Canvas) => canvas.setTransform(a, b, c, d, e, f);
  }

  private createStrokeCallback() {
    return (canvas: Canvas) => canvas.stroke();
  }
}
