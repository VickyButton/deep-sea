import type { Plugin, PluginManager } from './pluginManager.types';

export class PluginManagerDefault implements PluginManager {
  private readonly plugins = new Set<Plugin>();

  public addPlugin(plugin: Plugin) {
    this.plugins.add(plugin);
  }

  public removePlugin(plugin: Plugin) {
    this.plugins.delete(plugin);
  }

  public startPlugins() {
    for (const plugin of this.plugins) {
      this.startPlugin(plugin);
    }
  }

  private startPlugin(plugin: Plugin) {
    plugin.start();
  }

  public stopPlugins() {
    for (const plugin of this.plugins) {
      this.stopPlugin(plugin);
    }
  }

  private stopPlugin(plugin: Plugin) {
    plugin.stop();
  }
}
