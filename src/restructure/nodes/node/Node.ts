import type { ProcessCallback } from './node.types';
import type { SceneTree } from '../../engine/sceneTree/SceneTree';
import { Signal } from '../../domain/signal/Signal';
import { SignalController } from '../../domain/signalController/SignalController';

/** A node that encapsulate state, emits signals, and can be added to a scene tree. */
export class Node {
  /** Emitted when the node has a child added to it. The added child is passed to callbacks. */
  public readonly child_added = new Signal<Node>();
  /** Emitted when the node has a child removed from it. The removed child is passed to callbacks. */
  public readonly child_removed = new Signal<Node>();
  /** The node's signal controller used for delegating signal callbacks. */
  public readonly controller = new SignalController();
  /** The node's unique ID. */
  public readonly id;
  /** Emitted when the node has finished processing. Processing is considered finished after both the node and its children have finished processing. */
  public readonly processed = new Signal();
  /** Emitted when the node is started. */
  public readonly started = new Signal();
  /** Emitted when the node is stopped. */
  public readonly stopped = new Signal();
  /** Emitted when the node enters a scene tree. The entered tree is passed to callbacks. */
  public readonly tree_entered = new Signal<SceneTree>();
  /** Emitted when the node exits a scene tree. The exited tree is passed to callbacks. */
  public readonly tree_exited = new Signal<SceneTree>();
  private readonly relationships = new NodeRelationships();
  private _tree: SceneTree | null = null;
  private processCallback: ProcessCallback = () => { };

  constructor(id: string) {
    this.id = id;
    this.relationships.setSelf(this);
  }

  /** The node's children. */
  public get children() {
    return this.relationships.children;
  }

  /** Whether or not the node is listening for signals. Starting a node activates it and stopping a node deactivates it. */
  public get isActive() {
    return this.controller.isListening;
  }

  /** Whether or not the node is inside a scene tree. */
  public get isInsideTree() {
    return this.tree !== null;
  }

  /** The node's parent, or null if the node does not have a parent. */
  public get parent() {
    return this.relationships.parent;
  }

  /** The scene tree which the node belongs to, or null if the node does not belong to a tree. */
  public get tree() {
    return this._tree;
  }

  /**
   * Adds a node to the node's children.
   * @param node The node to add to the node's children.
   */
  public addChild(node: Node) {
    // Add child relationship to self.
    this.addChildRelationship(node);

    // If self is in tree, enter new child into tree.
    if (this.tree) {
      this.enterNodeIntoTree(node, this.tree);
    }

    // Emit "child_added" signal.
    this.emitChildAddedSignal(node);
  }

  private addChildRelationship(node: Node) {
    this.relationships.addChild(node);
  }

  private enterNodeIntoTree(node: Node, tree: SceneTree) {
    node.enterTree(tree);
  }

  private emitChildAddedSignal(node: Node) {
    this.child_added.emit(node);
  }

  /**
   * Enters the node and its children into a scene tree.
   * @param tree The tree to enter.
   */
  public enterTree(tree: SceneTree) {
    // Assert that node does not already belong to a tree.
    if (this.tree !== null) {
      throw new Error('Node already belongs to a tree.');
    }

    // Enter self into tree.
    this.registerWithTree(tree);
    this.setTree(tree);
    this.emitTreeEnteredSignal(tree);

    // Enter children into tree.
    this.enterChildrenIntoTree(tree);
  }

  private registerWithTree(tree: SceneTree) {
    tree.registerNode(this);
  }

  private setTree(tree: SceneTree | null) {
    this._tree = tree;
  }

  private emitTreeEnteredSignal(tree: SceneTree) {
    this.tree_entered.emit(tree);
  }

  private enterChildrenIntoTree(tree: SceneTree) {
    for (const child of this.children) {
      this.enterNodeIntoTree(child, tree);
    }
  }

  /**
   * Exits the node and its children from a scene tree.
   * @param tree The tree to exit.
   */
  public exitTree(tree: SceneTree) {
    // Assert that self belongs to tree being exited.
    if (this.tree !== tree) {
      throw new Error('Node does not belong to tree.');
    }

    // Exit children from tree.
    this.exitChildrenFromTree(tree);

    // Exit self from tree.
    this.deregisterFromTree(tree);
    this.setTree(null);
    this.emitTreeExitedSignal(tree);
  }

  private exitChildrenFromTree(tree: SceneTree) {
    for (const child of this.children) {
      this.exitNodeFromTree(child, tree);
    }
  }

  private deregisterFromTree(tree: SceneTree) {
    tree.deregisterNode(this);
  }

  private emitTreeExitedSignal(tree: SceneTree) {
    this.tree_exited.emit(tree);
  }

  /**
   * Processes the node and its children. The nodes process callback is executed before its childrens' callbacks.
   * @param dt The time elapsed since the last loop.
   */
  public process(dt: number) {
    this.executeProcessCallback(dt);
    this.processChildren(dt);
    this.emitProcessedSignal();
  }

  private executeProcessCallback(dt: number) {
    this.processCallback(dt);
  }

  private processChildren(dt: number) {
    for (const child of this.children) {
      child.process(dt);
    }
  }

  private emitProcessedSignal() {
    this.processed.emit();
  }

  /**
   * Removes a node from the node's children.
   * @param node The node to remove from the node's children.
   */
  public removeChild(node: Node) {
    // Remove child relationship from self.
    this.removeChildRelationship(node);

    // If self is in tree, exit child from tree.
    if (this.tree) {
      this.exitNodeFromTree(node, this.tree);
    }

    // Emit "child_removed" signal.
    this.emitChildRemovedSignal(node);
  }

  private removeChildRelationship(node: Node) {
    this.relationships.removeChild(node);
  }

  private exitNodeFromTree(node: Node, tree: SceneTree) {
    node.exitTree(tree);
  }

  private emitChildRemovedSignal(node: Node) {
    this.child_removed.emit(node);
  }

  /**
   * Sets the node's parent.
   * @param node The node to set as the node's parent, or null if removing a parent.
   */
  public setParent(node: Node | null) {
    this.setParentRelationship(node);
  }

  private setParentRelationship(node: Node | null) {
    this.relationships.setParent(node);
  }

  /**
   * Sets the callback to be executed on each process call.
   * @param callback The callback to execute on process.
   */
  public setProcessCallback(callback: ProcessCallback) {
    this.processCallback = callback;
  }

  /** Starts the node and its children, allowing it to listen for signals. */
  public start() {
    this.startListening();
    this.startChildren();
    this.emitStartedSignal();
  }

  private startListening() {
    this.controller.startListening();
  }

  private startChildren() {
    for (const child of this.children) {
      child.start();
    }
  }

  private emitStartedSignal() {
    this.started.emit();
  }

  /** Stops the node and its children, preventing it from listening for signals. */
  public stop() {
    this.stopChildren();
    this.stopListening();
    this.emitStoppedSignal();
  }

  private stopChildren() {
    for (const child of this.children) {
      child.stop();
    }
  }

  private stopListening() {
    this.controller.stopListening();
  }

  private emitStoppedSignal() {
    this.stopped.emit();
  }

  protected getClosestAncestorOfType<T extends Node>(type: AbstractNodeConstructor<T> | NodeConstructor<T>) {
    let parent = this.parent;

    while (parent !== null) {
      if (parent instanceof type) {
        return parent;
      }

      parent = parent.parent;
    }

    return null;
  }
}

class NodeRelationships {
  private _children = new Set<Node>();
  private _parent: Node | null = null;
  private self: Node | null = null;

  public get children() {
    return Array.from(this._children);
  }

  public get parent() {
    return this._parent;
  }

  /**
   * Adds a node to the node's children.
   * @param node The node to add to the node's children.
   * @throws An error if passed node is self.
   * @throws An error if passed node already has a parent.
   */
  public addChild(node: Node) {
    if (this.self === null) {
      throw new Error('Self is not set.');
    }

    if (node === this.self) {
      throw new Error('Cannot add self as a child.');
    }

    if (node.parent !== null) {
      throw new Error('Passed node already has a parent.');
    }

    this.addNodeToChildren(node);
    this.setNodeParentToSelf(node);
  }

  private addNodeToChildren(node: Node) {
    this._children.add(node);
  }

  private setNodeParentToSelf(node: Node) {
    node.setParent(this.self);
  }

  /**
   * Removes a node from the node's children.
   * @param child The node to remove from the node's children.
   * @throws An error if passed node is not a child of this node.
   */
  public removeChild(node: Node) {
    if (this.self === null) {
      throw new Error('Self is not set.');
    }

    if (node.parent !== this.self) {
      throw new Error('Passed node is not a child of this node.');
    }

    this.removeChildFromChildren(node);
    this.removeParentFromChild(node);
  }

  private removeChildFromChildren(node: Node) {
    this._children.delete(node);
  }

  private removeParentFromChild(node: Node) {
    node.setParent(null);
  }

  /**
   * Sets the node's parent.
   * @param node The node to set as a parent.
   */
  public setParent(node: Node | null) {
    if (this.self === null) {
      throw new Error('Self is not set.');
    }

    this._parent = node;
  }

  /**
   * Sets the node which is the basis of these relationships.
   * @param node 
   */
  public setSelf(node: Node) {
    this.self = node;
  }
}

type AbstractNodeConstructor<Type extends Node = Node> = abstract new (id: string) => Type;
type NodeConstructor<Type extends Node = Node> = new (id: string) => Type;
