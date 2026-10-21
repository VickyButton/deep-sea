import type { DrawInstructionsBuilder } from './drawInstructions.types';
import type { DrawStep } from '../drawStep/drawStep.types';

/** The main implementation of the DrawInstructionsBuilder interface. */
export class DrawInstructionsBuilder_Main implements DrawInstructionsBuilder {
  private activeBuild: DrawInstructionsBuild | null = null;

  public addStep(step: DrawStep) {
    if (!this.activeBuild) {
      throw new Error('No active build to add a step to.');
    }

    this.addStepToBuild(this.activeBuild, step);
  }

  private addStepToBuild(build: DrawInstructionsBuild, step: DrawStep) {
    build.addStep(step);
  }

  public finishBuild() {
    if (!this.activeBuild) {
      throw new Error('No active build to finish.');
    }

    const instructions = this.generateInstructionsFromBuild(this.activeBuild);

    this.clearBuild();

    return instructions;
  }

  private generateInstructionsFromBuild(build: DrawInstructionsBuild) {
    return build.generate();
  }

  private clearBuild() {
    this.activeBuild = null;
  }

  public setZIndex(zIndex: number) {
    if (!this.activeBuild) {
      throw new Error('No active build to set z-index on.');
    }

    this.setBuildZIndex(this.activeBuild, zIndex);
  }

  private setBuildZIndex(build: DrawInstructionsBuild, zIndex: number) {
    build.setZIndex(zIndex);
  }

  public startBuild() {
    if (this.activeBuild) {
      throw new Error('Cannot start build while another build is already active.');
    }

    this.activeBuild = new DrawInstructionsBuild();
  }
}

/** Context for building instructions. */
class DrawInstructionsBuild {
  private readonly steps: DrawStep[] = [];
  private zIndex = 0;

  /**
   * Appends a step to the instructions.
   * @param step The step to append to the instructions.
   */
  public addStep(step: DrawStep) {
    this.steps.push(step);
  }

  /**
   * Generates the instructions.
   * @returns The generated instructions object.
   */
  public generate() {
    return {
      zIndex: this.zIndex,
      steps: this.steps,
    };
  }

  /**
   * Sets the z-index for the instructions.
   * @param zIndex The z-index to set on the instructions.
   */
  public setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }
}
