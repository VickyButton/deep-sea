import { generateId } from '@core/utils/generateId';

export class GameNode {
  /**
   * The node's unique identifer.
   */
  public readonly id = generateId();
  /**
   * The node's children nodes.
   */
  public children = new Map<string, GameNode>();
  /**
   * The node's parent node.
   */
  public parent: GameNode | null = null;
  /**
   * Callback for when the node is set up.
   */
  public onSetup?: (node: GameNode) => void;
  /**
   * Callback for when node is updated.
   */
  public onUpdate?: (node: GameNode, dt: number) => void;
  /**
   * Callback for when the node is tore down.
   */
  public onTeardown?: (node: GameNode) => void;

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
    if (this.onSetup) this.onSetup(this);

    for (const child of this.children.values()) child.setup();
  }

  /**
   * Executes once per game loop.
   *
   * @param dt Time since the last update, in milliseconds.
   */
  public update(dt: number) {
    if (this.onUpdate) this.onUpdate(this, dt);

    for (const child of this.children.values()) child.update(dt);
  }

  /**
   * Executes at the end of a node's lifecycle.
   *
   * This is where cleanup should occur.
   */
  public teardown() {
    if (this.onTeardown) this.onTeardown(this);

    for (const child of this.children.values()) child.teardown();
  }

  /**
   * A recursive method that travels up the node tree and executes a callback, starting with the
   * current node's parent.
   *
   * @param callback The callback to be executed on each recursion.
   */
  public traverseToRoot(callback: (node: GameNode) => void) {
    if (!this.parent) return;

    callback(this.parent);

    this.parent.traverseToRoot(callback);
  }

  public traverseToLeaves(callback: (node: GameNode) => void) {
    for (const child of this.children.values()) {
      callback(child);

      child.traverseToLeaves(callback);
    }
  }
}
