import { PluginManager_Base } from './PluginManager_Base';
import { describe, expect, it, vi } from 'vitest';

describe('PluginManager_Base', () => {
  it('should start plugins', () => {
    const manager = new PluginManager_Base();
    const plugin = new Plugin();

    manager.addPlugin(plugin);
    manager.startPlugins();

    expect(plugin.start).toHaveBeenCalled();
  });

  it('should stop plugins', () => {
    const manager = new PluginManager_Base();
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
