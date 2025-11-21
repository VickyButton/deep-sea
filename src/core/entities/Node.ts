import { generateId } from '@core/utils/generateId';

export abstract class Node<T extends object = object> {
  public readonly id: string;
  public state: T;

  constructor() {
    this.id = generateId();
    this.state = this.getDefaultState();
  }

  public abstract setup(): void;
  public abstract update(dt: number): void;
  protected abstract getDefaultState(): T;
}
