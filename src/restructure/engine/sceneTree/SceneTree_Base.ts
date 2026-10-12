import type { SceneTree } from './sceneTree.types';
import type { Node } from '../../nodes/node/node.types';
import { Node_Base } from '../../nodes/node/Node_Base';
import { Signal_Base } from '../../signals/signal/Signal_Base';

/** The base implementation of the SceneTree interface. */
export class SceneTree_Base implements SceneTree {
  public readonly node_deregistered = new Signal_Base<Node>();
  public readonly node_registered = new Signal_Base<Node>();
  public readonly root: Node;
  private readonly nodes = new NodeManager();

  constructor() {
    this.root = new Node_Base('root');
    this.registerNode(this.root);
  }

  public get nodeCount() {
    return this.nodes.count;
  }

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

  public start() {
    this.startRoot();
  }

  private startRoot() {
    this.root.start();
  }

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
