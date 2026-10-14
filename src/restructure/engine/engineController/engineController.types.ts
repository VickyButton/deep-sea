/** The main controller used for listening for signals from engine components. */
export interface EngineController {
  /** A flag indicating if the controller is listening for signals. */
  get isListening(): boolean;
  /** Sets up the engine controller callbacks. */
  setup(): void;
  /** Starts listening for signals. */
  startListening(): void;
  /** Stops listening for signals. */
  stopListening(): void;
}
