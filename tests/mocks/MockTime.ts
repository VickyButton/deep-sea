import { Time } from '../../src/core/os/Time';

/** The mock implementation of the Time class. */
export class MockTime extends Time {
  public now = 0;
}
