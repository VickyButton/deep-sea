/** A queue of items that can be retrieved in sequential order. */
export interface Queue<T> {
  /** The item at the front of the queue. */
  get front(): T | null;
  /**
   * Adds an item to the back of the queue.
   * @param item The item to add to the queue.
   */
  add(item: T): void;
  /**
   * Removes and returns the item at the front of the queue.
   * @returns The item at the front of the queue.
   */
  remove(): T | null;
}
