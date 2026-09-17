import type { TimeProvider } from '../timeProvider.types';

export class TimeProviderSystem implements TimeProvider {
  public get now() {
    return Date.now();
  }
}
