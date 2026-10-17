import type { Storage } from './storage.types';

/** The memory implementation of the Storage interface. */
export class Storage_Memory<T> implements Storage<T> {
  private readonly storage = new Map<string, T>();

  public get itemCount() {
    return this.storage.size;
  }

  public clear() {
    this.storage.clear();
  }

  public delete(key: string) {
    this.storage.delete(key);
  }

  public get(key: string) {
    return this.storage.get(key) ?? null;
  }

  public has(key: string) {
    return this.storage.has(key);
  }

  public set(key: string, data: T) {
    this.storage.set(key, data);
  }
}
