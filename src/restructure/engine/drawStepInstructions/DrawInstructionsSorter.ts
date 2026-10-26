import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';

/** Sorts draw instructions by ascending z-index. */
export class DrawInstructionsSorter {
  /**
   * Sorts a list of draw instructions by ascending z-index.
   * @param list The list of draw instructions to sort.
   * @returns The sorted list of draw instructions.
   */
  public sort(list: DrawInstructions[]) {
    return list.sort((a, b) => a.zIndex - b.zIndex);
  }
}
