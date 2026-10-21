import type { Storage } from './storage.types';

/** The memory implementation of the Storage interface. */
export class Storage_Memory<T> implements Storage<T> {
  private readonly _items = new Map<string, T>();

  public get itemCount() {
    return this._items.size;
  }

  public get items() {
    return Array.from(this._items.values());
  }

  public clear() {
    this._items.clear();
  }

  public delete(key: string) {
    this._items.delete(key);
  }

  public get(key: string) {
    return this._items.get(key) ?? null;
  }

  public has(key: string) {
    return this._items.has(key);
  }

  public set(key: string, item: T) {
    this._items.set(key, item);
  }
}
