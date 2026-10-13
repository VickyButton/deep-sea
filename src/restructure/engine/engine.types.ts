/** Coordinates interactions between engine components. */
export interface Engine {
  /** Whether or not the engine is listening for signals. */
  get isActive(): boolean;
  /** Starts the engine. */
  start(): void;
  /** Stops the engine. */
  stop(): void;
}
