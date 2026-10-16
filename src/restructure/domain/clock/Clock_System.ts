import type { Clock } from './clock.types';

/** The system implementation of the Clock interface. */
export class Clock_System implements Clock {
  public get now() {
    return performance.now();
  }
}
