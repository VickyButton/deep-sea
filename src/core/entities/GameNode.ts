import { generateId } from '@core/utils/generateId';

export class GameNode {
  public readonly id = generateId();
  public children = new Map<string, GameNode>();
  public parent: GameNode | null = null;

  /**
   * The number of direct children this node has.
   */
  public get childCount() {
    return this.children.size;
  }

  /**
   * Attaches a child node.
   *
   * @param node The node to attach.
   */
  public addChild(node: GameNode) {
    node.parent = this;

    this.children.set(node.id, node);
  }

  /**
   * Detaches a child node.
   *
   * @param node The node to detach.
   */
  public removeChild(node: GameNode) {
    node.parent = null;

    this.children.delete(node.id);
  }

  /**
   * Executes at the beginning of a node's lifecycle.
   *
   * This is where asset loading and other setup should occur.
   */
  public setup() {
    for (const child of this.children.values()) child.setup();
  }

  /**
   * Executes once per game loop.
   *
   * @param dt Time since the last update, in milliseconds.
   */
  public update(dt: number) {
    for (const child of this.children.values()) child.update(dt);
  }

  /**
   * Executes at the end of a node's lifecycle.
   *
   * This is where cleanup should occur.
   */
  public teardown() {
    for (const child of this.children.values()) child.teardown();
  }

  /**
   * A recursive method that travels up the node tree and executes a callback, starting with the
   * current node.
   *
   * @param callback The callback to be executed on each recursion.
   */
  public traverseToRoot(callback: (node: GameNode) => void) {
    callback(this);

    if (this.parent) this.parent.traverseToRoot(callback);
  }
}
