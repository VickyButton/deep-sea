import type { Event, EventListener } from '../events/Event';
import { EventController } from '../events/EventController';

/**
 * Core building blocks for scenes. Nodes encapsulate state, functionality, and hierarchy.
 */
export class Node {
  /** The node's unique ID. */
  public id: string;
  /** Maps events to their listeners. */
  protected controller = new EventController();
  /** Manages the node's relationships. */
  protected relationships = new NodeRelationships(this);

  constructor(id: string) {
    this.id = id;
  }

  /** The node's child nodes. */
  public get children() {
    return this.relationships.children;
  }

  /** A flag indicating whether or not the node is listening for events. */
  public get isListening() {
    return this.controller.isListening;
  }

  /** The node's parent node, or null if the node has no parent node. */
  public get parent() {
    return this.relationships.parent;
  }

  /**
   * Adds a node to the node's children.
   * @param node The node to add to the node's children.
   */
  public addChild(node: Node) {
    this.relationships.addChild(node);
  }

  /**
   * Adds a listener to an event. The listener will only execute if the node is active.
   * @param event The event to add a listener to.
   * @param listener The listener to execute when an event is emitted.
   */
  public addEventListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.controller.on(event, listener);
  }

  /**
   * Removes a child from the node's children.
   * @param child The child to remove from the node's children.
   */
  public removeChild(child: Node) {
    this.relationships.removeChild(child);
  }

  /**
   * Removes a listener for an event.
   * @param event The event to remove a listener from.
   * @param listener The listener to remove from the event.
   */
  public removeEventListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.controller.remove(event, listener);
  }

  /** Removes the node's parent. */
  public removeParent() {
    this.relationships.removeParent();
  }

  /**
   * Sets the node's parent.
   * @param node The node to set as a parent.
   */
  public setParent(node: Node) {
    this.relationships.setParent(node);
  }

  /** Starts the node, allowing it to listen for events. */
  public start() {
    this.startListening();
  }

  private startListening() {
    this.controller.startListening();
  }

  /** Stops the node, preventing it from listening for events. */
  public stop() {
    this.stopListening();
  }

  private stopListening() {
    this.controller.stopListening();
  }

  public teardown() {
    for (const child of this.children) {
      child.teardown();
    }

    this.removeFromParent();
    this.stop();
  }

  private removeFromParent() {
    this.parent?.removeChild(this);
  }

  /**
   * Traverses the node tree in post-order.
   * @param callback The callback to execute on each node.
   */
  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}

/**
 * Manages a node's relationships.
 */
class NodeRelationships {
  private readonly self: Node;
  private _children = new Set<Node>();
  private _parent: Node | null = null;

  constructor(self: Node) {
    this.self = self;
  }

  /** The node's children. */
  public get children() {
    return Array.from(this._children);
  }

  /** The node's parent node. */
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
   * Removes a child from the node's children.
   * @param child The child to remove from the node's children.
   * @throws An error if passed node is not a child of this node.
   */
  public removeChild(child: Node) {
    if (child.parent !== this.self) {
      throw new Error('Passed node is not a child of this node.');
    }

    this.removeChildFromChildren(child);
    this.removeParentFromChild(child);
  }

  private removeChildFromChildren(child: Node) {
    this._children.delete(child);
  }

  private removeParentFromChild(child: Node) {
    child.removeParent();
  }

  /** Removes the node's parent. */
  public removeParent() {
    this._parent = null;
  }

  /**
   * Sets the node's parent.
   * @param node The node to set as a parent.
   */
  public setParent(node: Node) {
    this._parent = node;
  }
}
