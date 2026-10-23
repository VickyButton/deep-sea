import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import type { DrawStep } from '../../domain/drawStep/drawStep.types';

/** Resolves a list of draw instructions into ordered draw steps. */
export interface DrawInstructionsResolver {
  /**
   * Resolves a list of draw instructions into ordered draw steps.
   * @param list The list of draw instructions to resolve.
   */
  resolve(list: DrawInstructions[]): DrawStep[];
}
