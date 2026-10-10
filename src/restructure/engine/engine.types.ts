/** Coordinates interactions between engine components. */
export interface Engine {
  /** Starts the engine. */
  start(): void;
  /** Stops the engine. */
  stop(): void;
}
