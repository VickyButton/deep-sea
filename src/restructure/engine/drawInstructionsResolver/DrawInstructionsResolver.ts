import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';

/** Resolves a list of draw instructions into ordered draw steps. */
export class DrawInstructionsResolver {
  /**
   * Resolves a list of draw instructions into ordered draw steps.
   * @param list The list of draw instructions to resolve.
   */
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
