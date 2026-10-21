import type { Storage } from './storage.types';
import { vi } from 'vitest';

/** The mock implementation of the Storage interface. */
export class Storage_Mock<T> implements Storage<T> {
  private readonly _items = new Map<string, T>();

  public get itemCount() {
    return 0;
  }

  public get items() {
    return Array.from(this._items.values());
  }

  public clear = vi.fn().mockImplementation(() => {
    this._items.clear();
  });
  public delete = vi.fn().mockImplementation((key: string) => {
    this._items.delete(key);
  });
  public get = vi.fn().mockImplementation((key: string) => {
    return this._items.get(key) ?? null;
  });
  public has = vi.fn().mockImplementation((key: string) => {
    return this._items.has(key);
  });
  public set = vi.fn().mockImplementation((key: string, item: T) => {
    this._items.set(key, item);
  });
}
