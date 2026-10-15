import type { SignalController } from '../../controllers/signalController/signalController.types';
import type { SceneTree } from '../../engine/sceneTree/sceneTree.types';
import type { Signal } from '../../signals/signal/signal.types';

/** A node that encapsulate state, emits signals, and can be added to a scene tree. */
export interface Node {
  /** Emitted when the node has a child added to it. The added child is passed to callbacks. */
  readonly child_added: Signal<Node>;
  /** Emitted when the node has a child removed from it. The removed child is passed to callbacks. */
  readonly child_removed: Signal<Node>;
  /** The node's signal controller used for delegating signal callbacks. */
  readonly controller: SignalController;
  /** The node's unique ID. */
  readonly id: string;
  /** Emitted when the node has finished processing. Processing is considered finished after both the node and its children have finished processing. */
  readonly processed: Signal;
  /** Emitted when the node is started. */
  readonly started: Signal;
  /** Emitted when the node is stopped. */
  readonly stopped: Signal;
  /** Emitted when the node enters a scene tree. The entered tree is passed to callbacks. */
  readonly tree_entered: Signal<SceneTree>;
  /** Emitted when the node exits a scene tree. The exited tree is passed to callbacks. */
  readonly tree_exited: Signal<SceneTree>;
  /** The node's children. */
  get children(): Node[];
  /** Whether or not the node is listening for signals. Starting a node activates it and stopping a node deactivates it. */
  get isActive(): boolean;
  /** Whether or not the node is inside a scene tree. */
  get isInsideTree(): boolean;
  /** The node's parent, or null if the node does not have a parent. */
  get parent(): Node | null;
  /** The scene tree which the node belongs to, or null if the node does not belong to a tree. */
  get tree(): SceneTree | null;
  /**
   * Adds a node to the node's children.
   * @param node The node to add to the node's children.
   */
  addChild(node: Node): void;
  /**
   * Enters the node and its children into a scene tree.
   * @param tree The tree to enter.
   */
  enterTree(tree: SceneTree): void;
  /**
   * Exits the node and its children from a scene tree.
   * @param tree The tree to exit.
   */
  exitTree(tree: SceneTree): void;
  /**
   * Processes the node and its children. The nodes process callback is executed before its childrens' callbacks.
   * @param dt The time elapsed since the last loop.
   */
  process(dt: number): void;
  /**
   * Removes a node from the node's children.
   * @param node The node to remove from the node's children.
   */
  removeChild(node: Node): void;
  /**
   * Sets the node's parent.
   * @param node The node to set as the node's parent, or null if removing a parent.
   */
  setParent(node: Node | null): void;
  /**
   * Sets the callback to be executed on each process call.
   * @param callback The callback to execute on process.
   */
  setProcessCallback(callback: ProcessCallback): void;
  /** Starts the node and its children, allowing it to listen for signals. */
  start(): void;
  /** Stops the node and its children, preventing it from listening for signals. */
  stop(): void;
}

export type NodeConstructor<Type extends Node> = (abstract new (id: string) => Type) | (new (id: string) => Type);
export type ProcessCallback = (dt: number) => void;
