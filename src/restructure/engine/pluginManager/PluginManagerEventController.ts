import type { PluginManager, PluginManagerEvents } from './pluginManager.types';
import { EventController } from '../../domain/EventController';

/** Maps Plugin Manager events to their corresponding methods. */
export class PluginManagerEventController extends EventController {
  constructor(manager: PluginManager, events: PluginManagerEvents) {
    super();

    this.assignListeners(manager, events);
  }

  private assignListeners(manager: PluginManager, events: PluginManagerEvents) {
    this.on(events.AddPlugin, manager.addPlugin.bind(manager));
    this.on(events.RemovePlugin, manager.removePlugin.bind(manager));
    this.on(events.StartPlugins, manager.startPlugins.bind(manager));
    this.on(events.StopPlugins, manager.stopPlugins.bind(manager));
  }
}
