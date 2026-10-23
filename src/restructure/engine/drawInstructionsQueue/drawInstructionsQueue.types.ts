import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import type { Queue } from '../../domain/queue/queue.types';

export type DrawInstructionsQueue = Queue<DrawInstructions>;
