import type { Canvas } from '../../canvas/canvas.types';
import type { DrawStep, DrawStep_DrawArc, DrawStep_DrawLine, DrawStep_DrawRectangle, DrawStep_SetFillColor, DrawStep_SetStrokeColor, DrawStep_SetTransform } from '../drawStep.types';
import type { DrawStepTranslator } from './drawStepTranslator.types';

/** The main implementation of the DrawStepTranslator interface. */
export class DrawStepTranslator_Main implements DrawStepTranslator {
  public translate(step: DrawStep) {
    switch (step.type) {
      case 'BEGIN_PATH':
        return this.beginPath();
      case 'CLOSE_PATH':
        return this.closePath();
      case 'DRAW_ARC':
        return this.drawArc(step);
      case 'DRAW_LINE':
        return this.drawLine(step);
      case 'DRAW_RECTANGLE':
        return this.drawRectangle(step);
      case 'FILL':
        return this.fill();
      case 'RESET_TRANSFORM':
        return this.resetTransform();
      case 'SET_FILL_COLOR':
        return this.setFillColor(step);
      case 'SET_STROKE_COLOR':
        return this.setStrokeColor(step);
      case 'SET_TRANSFORM':
        return this.setTransform(step);
      case 'STROKE':
        return this.stroke();
      default:
        throw new Error('Unable to translate draw step.');
    }
  }

  private beginPath() {
    return (canvas: Canvas) => canvas.beginPath();
  }

  private closePath() {
    return (canvas: Canvas) => canvas.closePath();
  }

  private drawArc(step: DrawStep_DrawArc) {
    return (canvas: Canvas) => canvas.drawArc(step.x, step.y, step.radius, step.startAngle, step.endAngle, step.counterClockwise);
  }

  private drawLine(step: DrawStep_DrawLine) {
    return (canvas: Canvas) => canvas.drawLine(step.fromX, step.fromY, step.toX, step.toY);
  }

  private drawRectangle(step: DrawStep_DrawRectangle) {
    return (canvas: Canvas) => canvas.drawRectangle(step.x, step.y, step.width, step.height);
  }

  private fill() {
    return (canvas: Canvas) => canvas.fill();
  }

  private resetTransform() {
    return (canvas: Canvas) => canvas.resetTransform();
  }

  private setFillColor(step: DrawStep_SetFillColor) {
    return (canvas: Canvas) => canvas.setFillColor(step.color);
  }

  private setStrokeColor(step: DrawStep_SetStrokeColor) {
    return (canvas: Canvas) => canvas.setStrokeColor(step.color);
  }

  private setTransform(step: DrawStep_SetTransform) {
    return (canvas: Canvas) => canvas.setTransform(step.a, step.b, step.c, step.d, step.e, step.f);
  }

  private stroke() {
    return (canvas: Canvas) => canvas.stroke();
  }
}
