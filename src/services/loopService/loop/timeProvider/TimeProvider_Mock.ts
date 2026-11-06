import type { TimeProvider } from './timeProvider.types';

/** The mock implementation of the TimeProvider interface. */
export class TimeProvider_Mock implements TimeProvider {
  public now = 0;
}
