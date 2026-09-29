import type { Clock } from '../clock.types';

export class ClockSystem implements Clock {
  public get now() {
    return performance.now();
  }
}
