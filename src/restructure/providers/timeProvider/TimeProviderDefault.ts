import type { TimeProvider } from '../timeProvider.types';

export class TimeProviderDefault implements TimeProvider {
  public get now() {
    return Date.now();
  }
}
