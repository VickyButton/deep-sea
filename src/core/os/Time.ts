/** The operating system time. */
export abstract class Time {
  /** The current Unix timestamp in milliseconds. */
  public abstract get now(): number;
}
