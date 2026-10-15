import { PluginManager_Main } from './PluginManager_Main';
import { describe, expect, it, vi } from 'vitest';

describe('PluginManager_Main', () => {
  it('should start plugins', () => {
    const manager = new PluginManager_Main();
    const plugin = new Plugin();

    manager.addPlugin(plugin);
    manager.startPlugins();

    expect(plugin.start).toHaveBeenCalled();
  });

  it('should stop plugins', () => {
    const manager = new PluginManager_Main();
    const plugin = new Plugin();

    manager.addPlugin(plugin);
    manager.stopPlugins();

    expect(plugin.stop).toHaveBeenCalled();
  });
});

const Plugin = vi.fn(class {
  setup = vi.fn();
  start = vi.fn();
  stop = vi.fn();
  teardown = vi.fn();
});
