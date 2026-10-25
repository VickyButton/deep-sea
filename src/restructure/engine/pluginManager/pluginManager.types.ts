/** An engine plugin. */
export interface Plugin {
  /** Callback to execute on engine start. */
  start(): void;
  /** Callback to execute on engine stop. */
  stop(): void;
}
