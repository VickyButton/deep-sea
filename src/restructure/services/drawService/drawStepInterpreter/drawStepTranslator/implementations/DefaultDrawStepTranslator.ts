import type { CanvasCommand } from '../../../../../domain/canvas/canvas.types';
import type { DrawStep, DrawStep_DrawArc, DrawStep_DrawLine, DrawStep_DrawRectangle, DrawStep_SetFillColor, DrawStep_SetStrokeColor, DrawStep_SetTransform } from '../../../../../domain/drawStep/drawStep.types';

/** Translates draw steps into canvas commands. */
export class DefaultDrawStepTranslator {
  /**
   * Translates a draw step into a canvas command.
   * @param step The draw step to translate.
   * @returns The corresponding canvas command.
   * @throws An error if no corresponding canvas command.
   */
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

  private beginPath(): CanvasCommand {
    return (canvas) => canvas.beginPath();
  }

  private closePath(): CanvasCommand {
    return (canvas) => canvas.closePath();
  }

  private drawArc(step: DrawStep_DrawArc): CanvasCommand {
    return (canvas) => canvas.drawArc(step.x, step.y, step.radius, step.startAngle, step.endAngle, step.counterClockwise);
  }

  private drawLine(step: DrawStep_DrawLine): CanvasCommand {
    return (canvas) => canvas.drawLine(step.fromX, step.fromY, step.toX, step.toY);
  }

  private drawRectangle(step: DrawStep_DrawRectangle): CanvasCommand {
    return (canvas) => canvas.drawRectangle(step.x, step.y, step.width, step.height);
  }

  private fill(): CanvasCommand {
    return (canvas) => canvas.fill();
  }

  private resetTransform(): CanvasCommand {
    return (canvas) => canvas.resetTransform();
  }

  private setFillColor(step: DrawStep_SetFillColor): CanvasCommand {
    return (canvas) => canvas.setFillColor(step.color);
  }

  private setStrokeColor(step: DrawStep_SetStrokeColor): CanvasCommand {
    return (canvas) => canvas.setStrokeColor(step.color);
  }

  private setTransform(step: DrawStep_SetTransform): CanvasCommand {
    return (canvas) => canvas.setTransform(step.a, step.b, step.c, step.d, step.e, step.f);
  }

  private stroke(): CanvasCommand {
    return (canvas) => canvas.stroke();
  }
}
