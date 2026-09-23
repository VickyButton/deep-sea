import { PluginManagerDefault } from './PluginManagerDefault';
import { describe, expect, it, vi } from 'vitest';

describe('PluginManagerDefault', () => {
  it('should start plugins', () => {
    const manager = new PluginManagerDefault();
    const plugin = new Plugin();

    manager.addPlugin(plugin);
    manager.startPlugins();

    expect(plugin.start).toHaveBeenCalled();
  });

  it('should stop plugins', () => {
    const manager = new PluginManagerDefault();
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
