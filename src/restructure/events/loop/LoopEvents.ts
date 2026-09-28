import type { LoopCallback } from '../../engine/loop/loop.types';
import { Event } from '../Event';

/** Events for the Loop component. */
export class LoopEvents {
  /** Event for setting the loop callback. */
  public readonly SetLoopCallback = new Event<LoopCallback>();
  /** Event for setting the number of loops per second. */
  public readonly SetLoopsPerSecond = new Event<number>();
  /** Event for starting the loop. */
  public readonly Start = new Event<void>();
  /** Event for stopping the loop. */
  public readonly Stop = new Event<void>();
}
