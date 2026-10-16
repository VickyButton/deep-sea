import type { Clock } from './clock.types';

/** The mock implementation of the Clock interface. */
export class Clock_Mock implements Clock {
  public now = 0;
}
