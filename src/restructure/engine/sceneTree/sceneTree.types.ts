import type { Node } from '../../nodes/node/node.types';
import type { Signal } from '../../signals/signal/signal.types';

/** A tree of scenes that share a root node. */
export interface SceneTree {
  /** Emitted when a node has been deregistered from the tree. The deregistered node is passed to callbacks. */
  readonly node_deregistered: Signal<Node>;
  /** Emitted when a node has been registered with the tree. The registered node is passed to callbacks. */
  readonly node_registered: Signal<Node>;
  /** Emitted when the tree has finished processing. Processing is considered finished after all nodes have finished processing. */
  readonly processed: Signal;
  /** The root node of the tree. */
  readonly root: Node;
  // TODO: Add isActive getter.
  /** The number of nodes registered with the tree, including the root node. */
  get nodeCount(): number;
  /**
   * Adds a scene to the tree, adding it as a child of the root node.
   * @param scene The scene to add to the tree.
   */
  addScene(scene: Node): void;
  /**
   * Deregisters a node from the tree, preventing the node from being processed.
   * @param node The node to deregister from the tree.
   */
  deregisterNode(node: Node): void;
  /**
   * Processes the tree nodes, starting from the root.
   * @param dt The time elapsed since the last loop.
   */
  process(dt: number): void;
  /**
   * Registers a node with the tree, allowing the node to be processed.
   * @param node The node to register with the tree.
   */
  registerNode(node: Node): void;
  /**
   * Removes a scene from the tree, removing it as a child of the root node.
   * @param scene The scene to remove from the tree.
   */
  removeScene(scene: Node): void;
  /** Starts the tree nodes, starting from the root. */
  start(): void;
  /** Stops the tree nodes, starting from the root. */
  stop(): void;
}
