import type { PluginManagerEvents } from './pluginManager.types';
import { Event } from '../../events/Event';

export const pluginManagerEvents: PluginManagerEvents = {
  AddPlugin: new Event(),
  RemovePlugin: new Event(),
  StartPlugins: new Event(),
  StopPlugins: new Event(),
};
