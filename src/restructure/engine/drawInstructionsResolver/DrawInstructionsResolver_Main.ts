import type { DrawInstructionsResolver } from './drawInstructionsResolver.types';
import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';

/** The main implementation of the DrawInstructionsResolver interface. */
export class DrawInstructionsResolver_Main implements DrawInstructionsResolver {
  public resolve(list: DrawInstructions[]) {
    return this.flattenSteps(this.sortByZIndex(list));
  }

  private sortByZIndex(list: DrawInstructions[]) {
    return list.sort((a, b) => a.zIndex - b.zIndex);
  }

  private flattenSteps(list: DrawInstructions[]) {
    return list.flatMap((instructions) => instructions.steps);
  }
}
