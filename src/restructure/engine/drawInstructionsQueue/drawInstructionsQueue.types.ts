import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import type { Queue } from '../../domain/queue/queue.types';

/** The queue for draw instructions. */
export type DrawInstructionsQueue = Queue<DrawInstructions>;
