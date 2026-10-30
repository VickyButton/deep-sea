/** Provides the current time. */
export interface TimeProvider {
  /** The current Unix timestamp in milliseconds. */
  get now(): number;
}
