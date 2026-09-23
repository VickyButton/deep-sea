import type { Event } from '../../events';

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

/** Plugin Manager events. */
export interface PluginManagerEvents {
  /** Event for adding a plugin. */
  AddPlugin: Event<Plugin>;
  /** Event for removing a plugin. */
  RemovePlugin: Event<Plugin>;
  /** Event for starting the plugins. */
  StartPlugins: Event<void>;
  /** Event for stopping the plugins. */
  StopPlugins: Event<void>;
}

/** An engine plugin. */
export interface Plugin {
  /** Callback to execute on engine start. */
  start(): void;
  /** Callback to execute on engine stop. */
  stop(): void;
}
