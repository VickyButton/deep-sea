import type { PluginManager } from './pluginManager.types';
import { vi } from 'vitest';

/** The mock implementation of the PluginManager interface. */
export class PluginManager_Mock implements PluginManager {
  public addPlugin = vi.fn();
  public removePlugin = vi.fn();
  public startPlugins = vi.fn();
  public stopPlugins = vi.fn();
}
