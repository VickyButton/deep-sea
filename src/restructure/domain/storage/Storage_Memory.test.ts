import { Storage_Memory } from './Storage_Memory';
import { describe, expect, it } from 'vitest';

describe('Storage_Memory', () => {
  it('should have no items by default', () => {
    expect(new Storage_Memory().itemCount).toBe(0);
  });

  it('should clear all items', () => {
    const storage = new Storage_Memory();

    storage.set('KEY', 'ITEM');
    storage.clear();

    expect(storage.itemCount).toBe(0);
  });

  it('should delete an item', () => {
    const key = 'KEY';
    const storage = new Storage_Memory();

    storage.set(key, 'ITEM');
    storage.delete(key);

    expect(storage.get(key)).toBe(null);
  });

  it('should retrieve an item', () => {
    const key = 'KEY';
    const storage = new Storage_Memory();

    storage.set(key, 'ITEM');

    expect(storage.get(key)).toBe('ITEM');
  });

  it('should determine that an item exists', () => {
    const key = 'KEY';
    const storage = new Storage_Memory();

    storage.set(key, 'ITEM');

    expect(storage.has(key)).toBe(true);
  });

  it('should determine that an item does not exists', () => {
    const storage = new Storage_Memory();

    expect(storage.has('KEY')).toBe(false);
  });

  it('should store an item', () => {
    const key = 'KEY';
    const storage = new Storage_Memory();

    storage.set(key, 'ITEM');

    expect(storage.get(key)).toBe('ITEM');
  });
});
