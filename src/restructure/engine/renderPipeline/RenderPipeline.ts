import type { Canvas } from '../../domain/canvas/canvas.types';

/** An ordered set of steps for rendering an image. */
export class RenderPipeline {
  private readonly steps: RenderStep[];

  constructor(steps: RenderStep[]) {
    this.steps = steps;
  }

  /**
   * Renders an image using the pipeline steps.
   * @param canvas The canvas to run the pipeline steps on.
   */
  public render(canvas: Canvas) {
    this.executeSteps(canvas);
  }

  private executeSteps(canvas: Canvas) {
    this.steps.forEach((step) => step(canvas));
  }
}

type RenderStep = (canvas: Canvas) => void;
