import type { PluginManagerEvents } from './pluginManager.types';
import { PluginManagerEventController } from './PluginManagerEventController';
import { Event } from '../../events/Event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('PluginManagerEventController', () => {
  beforeAll(() => controller.startListening());
  afterEach(() => vi.clearAllMocks());
  afterAll(() => controller.stopListening());

  it('should map AddPlugin event', () => {
    const data = new Plugin();

    events.AddPlugin.emit(data);

    expect(manager.addPlugin).toHaveBeenCalledWith(data);
  });

  it('should map RemovePlugin event', () => {
    const data = new Plugin();

    events.RemovePlugin.emit(data);

    expect(manager.removePlugin).toHaveBeenCalledWith(data);
  });

  it('should map StartPlugins event', () => {
    events.StartPlugins.emit();

    expect(manager.startPlugins).toHaveBeenCalled();
  });

  it('should map StopPlugins event', () => {
    events.StopPlugins.emit();

    expect(manager.stopPlugins).toHaveBeenCalled();
  });

});

const manager = {
  addPlugin: vi.fn(),
  removePlugin: vi.fn(),
  startPlugins: vi.fn(),
  stopPlugins: vi.fn(),
};
const events: PluginManagerEvents = {
  AddPlugin: new Event(),
  RemovePlugin: new Event(),
  StartPlugins: new Event(),
  StopPlugins: new Event(),
};
const controller = new PluginManagerEventController(manager, events);

const Plugin = vi.fn(class {
  start = vi.fn();
  stop = vi.fn();
});
