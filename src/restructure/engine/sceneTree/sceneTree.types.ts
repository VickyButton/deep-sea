import type { Node } from '../../nodes/node/node.types';
import type { Signal } from '../../signals/signal/signal.types';

/**
 * A tree of scenes that share a root node.
 */
export interface SceneTree {
  /** Emitted when a node has been deregistered from the tree. The deregistered node is passed to callbacks. */
  readonly node_deregistered: Signal<Node>;
  /** Emitted when a node has been registered with the tree. The registered node is passed to callbacks. */
  readonly node_registered: Signal<Node>;
  /** The root node of the tree. */
  readonly root: Node;
  /**
   * Deregisters a node from the tree, preventing the node from being processed.
   * @param node The node to deregister from the tree.
   */
  deregisterNode(node: Node): void;
  /**
   * Enters a scene into the tree, adding it to the root as a child.
   * @param scene The scene to enter into the tree.
   */
  enterSceneIntoTree(scene: Node): void;
  /**
   * Exits a scene from the tree, removing it from the root as a child.
   * @param scene The scene to exit from the tree.
   */
  exitSceneFromTree(scene: Node): void;
  /**
   * Registers a node with the tree, allowing the node to be processed.
   * @param node The node to register with the tree.
   */
  registerNode(node: Node): void;
  /** Starts the tree nodes, starting from the root. */
  start(): void;
  /** Stops the tree nodes, starting from the root. */
  stop(): void;
}
