import type { Node, NodeTree } from './node.types';
import { SignalController_Base } from '../../controllers/SignalController_Base';
import { Signal_Base } from '../../signals/signal/Signal_Base';

/** The base implementation of the Node interface. */
export class Node_Base implements Node {
  public readonly child_added = new Signal_Base<Node>();
  public readonly child_removed = new Signal_Base<Node>();
  public readonly controller = new SignalController_Base();
  public readonly id: string;
  public readonly started = new Signal_Base();
  public readonly stopped = new Signal_Base();
  public readonly tree_entered = new Signal_Base<NodeTree>();
  public readonly tree_exited = new Signal_Base<NodeTree>();
  private readonly relationships = new NodeRelationships();
  private _tree: NodeTree | null = null;

  constructor(id: string) {
    this.id = id;
    this.relationships.setSelf(this);
  }

  public get children() {
    return this.relationships.children;
  }

  public get isActive() {
    return this.tree !== null;
  }

  public get parent() {
    return this.relationships.parent;
  }

  public get tree() {
    return this._tree;
  }

  public addChild(node: Node) {
    this.relationships.addChild(node);
    this.emitChildAddedSignal(node);
  }

  private emitChildAddedSignal(node: Node) {
    this.child_added.emit(node);
  }

  public enterTree(tree: NodeTree) {
    if (this.tree !== null) {
      throw new Error('Node already belongs to a tree.');
    }

    this.setTree(tree);
    this.emitTreeEnteredSignal(tree);
    this.addChildrenToTree(tree);
  }

  private setTree(tree: NodeTree | null) {
    this._tree = tree;
  }

  private emitTreeEnteredSignal(tree: NodeTree) {
    this.tree_entered.emit(tree);
  }

  private addChildrenToTree(tree: NodeTree) {
    for (const child of this.children) {
      tree.addNode(child);
    }
  }

  public removeChild(node: Node) {
    this.relationships.removeChild(node);
    this.emitChildRemovedSignal(node);
  }

  private emitChildRemovedSignal(node: Node) {
    this.child_removed.emit(node);
  }

  public exitTree(tree: NodeTree) {
    if (this.tree !== tree) {
      throw new Error('Node does not belong to tree.');
    }

    this.removeChildrenFromTree(tree);
    this.setTree(null);
    this.emitTreeExitedSignal(tree);
  }

  private emitTreeExitedSignal(tree: NodeTree) {
    this.tree_exited.emit(tree);
  }

  private removeChildrenFromTree(tree: NodeTree) {
    for (const child of this.children) {
      tree.removeNode(child);
    }
  }

  public setParent(node: Node | null) {
    this.relationships.setParent(node);
  }

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

  protected getClosestAncestorOfType<T extends Node>(type: NodeConstructor<T>) {
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

type NodeConstructor<NodeType extends Node> = AbstractConstructor<NodeType, string> | Constructor<NodeType, string>;
type AbstractConstructor<Type, Args> = abstract new (args: Args) => Type;
type Constructor<Type, Args> = new (args: Args) => Type;
