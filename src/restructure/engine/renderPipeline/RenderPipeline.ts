import type { Canvas } from '../../domain/canvas/canvas.types';

/** An ordered set of steps for rendering an image. */
export class RenderPipeline {
  private readonly steps: RenderStep[] = [];

  /**
   * Adds a step to the pipeline.
   * @param step The step to add to the pipeline.
   */
  public addStep(step: RenderStep) {
    this.steps.push(step);
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
