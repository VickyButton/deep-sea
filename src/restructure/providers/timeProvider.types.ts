/**
 * Provides the current timestamp.
 */
export interface TimeProvider {
  /** The current Unix timestamp in milliseconds. */
  get now(): number;
}
