import type { Plugin } from './pluginManager.types';

/** Manages engine plugins. */
export class PluginManager {
  private readonly plugins = new Set<Plugin>();

  /**
   * Adds an engine plugin.
   * @param plugin The plugin to add.
   */
  public addPlugin(plugin: Plugin) {
    this.plugins.add(plugin);
  }

  /**
   * Removes an engine plugin.
   * @param plugin The plugin to remove.
   */
  public removePlugin(plugin: Plugin) {
    this.plugins.delete(plugin);
  }

  /** Starts the engine plugins. */
  public startPlugins() {
    for (const plugin of this.plugins) {
      this.startPlugin(plugin);
    }
  }

  private startPlugin(plugin: Plugin) {
    plugin.start();
  }

  /** Stops the engine plugins. */
  public stopPlugins() {
    for (const plugin of this.plugins) {
      this.stopPlugin(plugin);
    }
  }

  private stopPlugin(plugin: Plugin) {
    plugin.stop();
  }
}
