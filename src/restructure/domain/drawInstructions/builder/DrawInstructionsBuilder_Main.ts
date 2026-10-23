import type { DrawInstructionsBuilder } from './drawInstructionsBuilder.types';
import type { DrawStep } from '../../drawStep/drawStep.types';

/** The main implementation of the DrawInstructionsBuilder interface. */
export class DrawInstructionsBuilder_Main implements DrawInstructionsBuilder {
  private readonly steps: DrawStep[] = [];
  private zIndex = 0;

  public beginPath() {
    this.addStep({
      type: 'BEGIN_PATH',
    });
  }

  private addStep(step: DrawStep) {
    this.steps.push(step);
  }

  public build() {
    return {
      steps: this.steps,
      zIndex: this.zIndex,
    };
  }

  public closePath() {
    this.addStep({
      type: 'CLOSE_PATH',
    });
  }

  public drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean) {
    this.addStep({
      type: 'DRAW_ARC',
      x,
      y,
      radius,
      startAngle,
      endAngle,
      counterClockwise,
    });
  }

  public drawLine(fromX: number, fromY: number, toX: number, toY: number) {
    this.addStep({
      type: 'DRAW_LINE',
      fromX,
      fromY,
      toX,
      toY,
    });
  }

  public drawRectangle(x: number, y: number, width: number, height: number) {
    this.addStep({
      type: 'DRAW_RECTANGLE',
      x,
      y,
      width,
      height,
    });
  }

  public fill() {
    this.addStep({
      type: 'FILL',
    });
  }

  public resetTransform() {
    this.addStep({
      type: 'RESET_TRANSFORM',
    });
  }

  public setFillColor(color: string) {
    this.addStep({
      type: 'SET_FILL_COLOR',
      color,
    });
  }

  public setStrokeColor(color: string) {
    this.addStep({
      type: 'SET_STROKE_COLOR',
      color,
    });
  }

  public setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.addStep({
      type: 'SET_TRANSFORM',
      a,
      b,
      c,
      d,
      e,
      f,
    });
  }

  public setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }

  public stroke() {
    this.addStep({
      type: 'STROKE',
    });
  }
}
