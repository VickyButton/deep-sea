import { generateId } from '@core/utils/generateId';

export abstract class Script<T = unknown> {
  /**
   * Callback to be executed when the node is set up.
   * @param node The node the script is attached to.
   */
  public abstract onSetup(node: T): void;
  /**
   * Callback to be executed when the node is updated.
   * @param node The node the script is attached to.
   * @param dt The time since the last frame, in miliseconds.
   */
  public abstract onUpdate(node: T, dt: number): void;
  /**
   * Callback to be executed when the node is torn down.
   * @param node The node the script is attached to.
   */
  public abstract onTeardown(node: T): void;
}

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
   * The node's attached scripts.
   */
  public scripts = new Set<Script<GameNode>>();

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
   * Attaches a script to the node.
   * @param script The script to attach.
   */
  public attachScript(script: Script<GameNode>) {
    this.scripts.add(script);
  }

  /**
   * Detaches a script from the node.
   * @param script The script to detach.
   */
  public detachScript(script: Script<GameNode>) {
    this.scripts.delete(script);
  }

  /**
   * Executes at the beginning of a node's lifecycle.
   *
   * This is where asset loading and other setup should occur.
   */
  public setup() {
    for (const script of this.scripts) script.onSetup(this);
    for (const child of this.children.values()) child.setup();
  }

  /**
   * Executes once per game loop.
   *
   * @param dt Time since the last update, in milliseconds.
   */
  public update(dt: number) {
    for (const script of this.scripts) script.onUpdate(this, dt);
    for (const child of this.children.values()) child.update(dt);
  }

  /**
   * Executes at the end of a node's lifecycle.
   *
   * This is where cleanup should occur.
   */
  public teardown() {
    for (const script of this.scripts) script.onTeardown(this);
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
