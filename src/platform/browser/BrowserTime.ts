import { Time } from '../../core/os/Time';

/** The browser implementation of the Time class. */
export class BrowserTime extends Time {
  public get now() {
    return performance.now();
  }
}
