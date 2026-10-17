import type { Storage } from './storage.types';
import { vi } from 'vitest';

/** The mock implementation of the Storage interface. */
export class Storage_Mock<T> implements Storage<T> {
  public get itemCount() {
    return 0;
  }

  public clear = vi.fn();
  public delete = vi.fn();
  public get = vi.fn();
  public has = vi.fn();
  public set = vi.fn();
}
