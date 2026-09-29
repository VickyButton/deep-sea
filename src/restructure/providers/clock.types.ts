/**
 * Provides the current time.
 */
export interface Clock {
  /** The current Unix timestamp in milliseconds. */
  get now(): number;
}
