/** A queue of items that can be retrieved in sequential order. */
export class Queue<T> {
  private readonly items: T[] = [];

  /** The item at the front of the queue. */
  public get front() {
    return this.items[0] ?? null;
  }

  /**
   * Adds an item to the back of the queue.
   * @param item The item to add to the queue.
   */
  public add(item: T) {
    this.items.push(item);
  }

  /**
   * Removes and returns the item at the front of the queue.
   * @returns The item at the front of the queue.
   */
  public remove() {
    return this.items.shift() ?? null;
  }
}
