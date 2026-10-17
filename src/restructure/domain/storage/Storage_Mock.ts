import type { Storage } from './storage.types';
import { vi } from 'vitest';

/** The mock implementation of the Storage interface. */
export class Storage_Mock<T> implements Storage<T> {
  private readonly items = new Map<string, T>();

  public get itemCount() {
    return 0;
  }

  public clear = vi.fn().mockImplementation(() => {
    this.items.clear();
  });
  public delete = vi.fn().mockImplementation((key: string) => {
    this.items.delete(key);
  });
  public get = vi.fn().mockImplementation((key: string) => {
    return this.items.get(key) ?? null;
  });
  public has = vi.fn().mockImplementation((key: string) => {
    return this.items.has(key);
  });
  public set = vi.fn().mockImplementation((key: string, item: T) => {
    this.items.set(key, item);
  });
}
