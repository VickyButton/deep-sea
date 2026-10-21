/** Used for storing items. */
export interface Storage<T> {
  /** The number of items in the storage. */
  get itemCount(): number;
  /** The items stored in the storage. */
  get items(): T[];
  /** Clears all items from the storage. */
  clear(): void;
  /**
   * Deletes an item from the storage.
   * @param key The key for the item being deleted.
   */
  delete(key: string): void;
  /**
   * Retrieves an item from the storage.
   * @param key The key for the item being retrieved.
   */
  get(key: string): T | null;
  /**
   * Checks whether or not an item exists for a passed key.
   * @param key The key for the item being checked.
   */
  has(key: string): boolean;
  /**
   * Stores an item in the storage.
   * @param key The key to store the item under.
   * @param item The item being stored.
   */
  set(key: string, item: T): void;
}
