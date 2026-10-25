import { Signal } from '../../domain/signal/Signal';
import { Node } from '../../nodes/node/Node';

/** A tree of scenes that share a root node. */
export class SceneTree {
  /** Emitted when a node has been deregistered from the tree. The deregistered node is passed to callbacks. */
  public readonly node_deregistered = new Signal<Node>();
  /** Emitted when a node has been registered with the tree. The registered node is passed to callbacks. */
  public readonly node_registered = new Signal<Node>();
  /** Emitted when the tree has finished processing. Processing is considered finished after all nodes have finished processing. */
  public readonly processed = new Signal();
  /** The root node of the tree. */
  public readonly root: Node;
  private readonly nodes = new NodeManager();

  constructor() {
    this.root = new Node('root');
    this.registerNode(this.root);
  }

  /** Whether or not the tree's root node is active. */
  public get isActive() {
    return this.root.isActive;
  }

  /** The number of nodes registered with the tree, including the root node. */
  public get nodeCount() {
    return this.nodes.count;
  }

  /**
   * Adds a scene to the tree, adding it as a child of the root node.
   * @param scene The scene to add to the tree.
   */
  public addScene(scene: Node) {
    this.addSceneToRoot(scene);
    this.enterSceneIntoSelf(scene);
  }

  private addSceneToRoot(scene: Node) {
    this.root.addChild(scene);
  }

  private enterSceneIntoSelf(scene: Node) {
    scene.enterTree(this);
  }

  /**
   * Deregisters a node from the tree, preventing the node from being processed.
   * @param node The node to deregister from the tree.
   */
  public deregisterNode(node: Node) {
    this.deregisterNodeFromSelf(node);
    this.emitNodeDeregisteredSignal(node);
  }

  private deregisterNodeFromSelf(node: Node) {
    this.nodes.deregister(node);
  }

  private emitNodeDeregisteredSignal(node: Node) {
    this.node_deregistered.emit(node);
  }

  /**
   * Processes the tree nodes, starting from the root.
   * @param dt The time elapsed since the last loop.
   */
  public process(dt: number) {
    this.processRoot(dt);
    this.emitProcessedSignal();
  }

  private processRoot(dt: number) {
    this.root.process(dt);
  }

  private emitProcessedSignal() {
    this.processed.emit();
  }

  /**
   * Registers a node with the tree, allowing the node to be processed.
   * @param node The node to register with the tree.
   */
  public registerNode(node: Node) {
    this.registerNodeWithSelf(node);
    this.emitNodeRegisteredSignal(node);
  }

  private registerNodeWithSelf(node: Node) {
    this.nodes.register(node);
  }

  private emitNodeRegisteredSignal(node: Node) {
    this.node_registered.emit(node);
  }

  /**
   * Removes a scene from the tree, removing it as a child of the root node.
   * @param scene The scene to remove from the tree.
   */
  public removeScene(scene: Node) {
    this.removeSceneFromRoot(scene);
    this.exitSceneFromSelf(scene);
  }

  private removeSceneFromRoot(scene: Node) {
    this.root.removeChild(scene);
  }

  private exitSceneFromSelf(scene: Node) {
    scene.exitTree(this);
  }

  /** Starts the tree nodes, starting from the root. */
  public start() {
    this.startRoot();
  }

  private startRoot() {
    this.root.start();
  }

  /** Stops the tree nodes, starting from the root. */
  public stop() {
    this.stopRoot();
  }

  private stopRoot() {
    this.root.stop();
  }
}

class NodeManager {
  private readonly nodes = new Map<string, Node>();

  /** The number of nodes currently registered. */
  public get count() {
    return this.nodes.size;
  }

  /** Clears all registered nodes. */
  public clear() {
    this.nodes.clear();
  }

  /**
   * Deregisters a node.
   * @param node The node to deregister.
   */
  public deregister(node: Node) {
    this.nodes.delete(node.id);
  }

  /**
   * Registers a node.
   * @param node The node to register.
   */
  public register(node: Node) {
    this.nodes.set(node.id, node);
  }
}
