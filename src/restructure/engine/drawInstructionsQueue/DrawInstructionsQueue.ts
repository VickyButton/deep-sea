import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';

/** Used for queueing draw instructions. */
export class DrawInstructionsQueue {
  private _items: DrawInstructions[] = [];

  /** A copy of the queued instructions. */
  public get items() {
    return this.copyItems();
  }

  private copyItems() {
    return [...this._items];
  }

  /**
   * Adds instructions to the back of the queue.
   * @param instructions The instructions to add.
   */
  public add(instructions: DrawInstructions) {
    this.addToQueue(instructions);
  }

  private addToQueue(instructions: DrawInstructions) {
    this._items.push(instructions);
  }

  /** Clears the queue, removing all queued instructions. */
  public clear() {
    this.clearQueue();
  }

  private clearQueue() {
    this._items = [];
  }
}
