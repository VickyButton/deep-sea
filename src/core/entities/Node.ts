import { generateId } from '@core/utils/generateId';

export abstract class Node<T extends object = object> {
  public readonly id: string;
  public state: T;

  constructor() {
    this.id = generateId();
    this.state = this.getDefaultState();
  }

  /**
   * Executes at the beginning of a node's lifecycle. This is where loading and other setup should occur.
   */
  public abstract setup(): void;

  /**
   * Executes once per game loop.
   *
   * @param dt The time since the last update.
   */
  public abstract update(dt: number): void;

  /**
   * Executes at the end of a node's lifecycle. This is where cleanup should occur.
   */
  public abstract teardown(): void;

  protected abstract getDefaultState(): T;
}
