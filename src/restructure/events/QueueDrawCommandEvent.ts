import type { DrawCommand } from '../engine/graphicsEngine.types';
import { Event } from './Event';

/** An event for queueing a draw command to the graphics engine. */
export const QueueDrawCommandEvent = new Event<DrawCommand>(Symbol('queue-draw-command'));
