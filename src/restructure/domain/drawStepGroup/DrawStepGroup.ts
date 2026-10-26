import type { DrawStep } from '../drawStep/drawStep.types';

/** A group of draw steps. */
export class DrawStepGroup {
  private _steps: DrawStep[] = [];

  public get steps() {
    return [...this._steps];
  }

  /**
   * Adds a draw step to the group.
   * @param step The step to add to the group.
   */
  public add(step: DrawStep) {
    this._steps.push(step);
  }
}
