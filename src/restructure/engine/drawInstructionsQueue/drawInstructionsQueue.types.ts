import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import { Queue } from '../../domain/queue/Queue';

/** The queue for draw instructions. */
export const DrawInstructionsQueue = Queue<DrawInstructions>;
