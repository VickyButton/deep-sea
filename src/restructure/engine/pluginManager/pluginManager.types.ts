/** Manages engine plugins. */
export interface PluginManager {
  /**
   * Adds an engine plugin.
   * @param plugin The plugin to add.
   */
  addPlugin(plugin: Plugin): void;
  /**
   * Removes an engine plugin.
   * @param plugin The plugin to remove.
   */
  removePlugin(plugin: Plugin): void;
  /** Starts the engine plugins. */
  startPlugins(): void;
  /** Stops the engine plugins. */
  stopPlugins(): void;
}

/** An engine plugin. */
export interface Plugin {
  /** Callback to execute on engine start. */
  start(): void;
  /** Callback to execute on engine stop. */
  stop(): void;
}
