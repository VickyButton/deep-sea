import type { Plugin } from '../../engine/pluginManager/pluginManager.types';
import { Event } from '../Event';

/** Events for the Plugin Manager component. */
export class PluginManagerEvents {
  /** Event for adding a plugin. */
  public readonly AddPlugin = new Event<Plugin>();
  /** Event for removing a plugin. */
  public readonly RemovePlugin = new Event<Plugin>();
  /** Event for starting the plugins. */
  public readonly StartPlugins = new Event<void>();
  /** Event for stopping the plugins. */
  public readonly StopPlugins = new Event<void>();
}
