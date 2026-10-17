import type { Storage } from './storage.types';

/** The memory implementation of the Storage interface. */
export class Storage_Memory<T> implements Storage<T> {
  private readonly items = new Map<string, T>();

  public get itemCount() {
    return this.items.size;
  }

  public clear() {
    this.items.clear();
  }

  public delete(key: string) {
    this.items.delete(key);
  }

  public get(key: string) {
    return this.items.get(key) ?? null;
  }

  public has(key: string) {
    return this.items.has(key);
  }

  public set(key: string, data: T) {
    this.items.set(key, data);
  }
}
