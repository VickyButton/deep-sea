import type { TimeProvider } from './timeProvider.types';

/** The performance implementation of the TimeProvider interface. */
export class TimeProvider_Performance implements TimeProvider {
  public get now() {
    return performance.now();
  }
}
