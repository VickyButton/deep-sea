export abstract class Node<T extends object = object> {
  public readonly id: string;
  public state: T;

  constructor() {
    this.id = ''; // TODO: generate and assign id.
    this.state = this.getDefaultState();
  }

  public abstract initialize(): void;
  public abstract start(): void;
  public abstract stop(): void;
  public abstract update(dt: number): void;
  protected abstract getDefaultState(): T;
}
