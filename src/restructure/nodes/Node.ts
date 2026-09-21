import type { Event, EventListener } from '../events/Event';

/**
 * Core building blocks for scenes. Nodes encapsulate state, functionality, and hierarchy.
 */
export class Node {
  /** The node's unique ID. */
  public id: string;
  /** A flag indicating if the node is active or not. */
  public isActive: boolean;
  /** A flag indicating if the node is ready or not. */
  public isReady: boolean;
  protected nodeEventManager: NodeEventManager;
  protected nodeRelationshipManager: NodeRelationshipManager;

  constructor(id: string, options?: Node_Options) {
    this.id = id;
    this.isActive = options?.isActive ?? false;
    this.isReady = options?.isReady ?? false;
    this.nodeEventManager = new NodeEventManager();
    this.nodeRelationshipManager = new NodeRelationshipManager(this);
  }

  /** The node's parent node, or null if the node has no parent node. */
  public get parent() {
    return this.nodeRelationshipManager.getParent();
  }

  /** True if node has a parent, false if not. */
  public get hasParent() {
    return this.nodeRelationshipManager.getParent() !== null;
  }

  /** The node's child nodes. */
  public get children() {
    return this.nodeRelationshipManager.getChildren();
  }

  /**
   * Adds a listener to an event. The listener will only execute if the node is active.
   * @param event The event to add a listener to.
   * @param listener The listener to execute when an event is emitted.
   */
  public addEventListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.nodeEventManager.addListener(event, listener);
  }

  /**
   * Removes a listener for an event.
   * @param event The event to remove a listener from.
   * @param listener The listener to remove from the event.
   */
  public removeEventListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.nodeEventManager.removeListener(event, listener);
  }

  /** Activates the node. */
  public activate() {
    this.isActive = true;
    this.nodeEventManager.startListening();
  }

  /** Deactivates the node. */
  public deactivate() {
    this.isActive = false;
    this.nodeEventManager.stopListening();
  }

  /** Readies the node. */
  public ready() {
    this.isReady = true;
  }

  /** Unreadies the node. */
  public unready() {
    this.isReady = false;
  }

  /**
   * Assigns a parent to the node. If the node already has a parent, use the `reparent` method
   * instead.
   * @param node The node to add as a parent.
   */
  public assignParent(parent: Node) {
    this.nodeRelationshipManager.assignParent(parent);
  }

  /** Unassigns the node's parent from the node. */
  public unassignParent() {
    this.nodeRelationshipManager.unassignParent();
  }

  /**
   * Reparents the node.
   * @param newParent The new parent to assign to the node.
   */
  public reparent(newParent: Node) {
    this.nodeRelationshipManager.reparent(newParent);
  }

  /**
   * Adds a child node to the node tree.
   * @param node The node to add as a child.
   */
  public addChild(child: Node) {
    this.nodeRelationshipManager.addChild(child);
  }

  /**
   * Removes a child node from the node tree.
   * @param node The child node to remove.
   */
  public removeChild(child: Node) {
    this.nodeRelationshipManager.removeChild(child);
  }

  /**
   * Traverses the node tree in post-order.
   * @param callback The callback to execute on each node.
   */
  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}

export interface Node_Options {
  isActive?: boolean;
  isReady?: boolean;
}

/**
 * Manages a node's event listeners.
 */
class NodeEventManager {
  private isListening = false;
  private delegators = new Map<Event, EventListener>();
  private callbacks = new Map<Event, Set<EventListener>>();

  /**
   * Adds a listener to an event. The listener will only execute if the event manager is listening.
   * @param event The event to add a listener to.
   * @param listener The listener to execute when an event is emitted.
   */
  public addListener<T>(event: Event<T>, listener: EventListener<T>) {
    if (this.isListening) {
      this.ensureEventHasDelegator(event as Event);
    }

    this.addCallbackForEvent(event as Event, listener as EventListener);
  }

  private ensureEventHasDelegator(event: Event) {
    if (!this.hasDelegatorForEvent(event)) {
      this.addDelegatorForEvent(event);
    }
  }

  private hasDelegatorForEvent(event: Event) {
    return this.delegators.has(event);
  }

  private addDelegatorForEvent(event: Event) {
    const delegator = this.createDelegatorForEvent(event);

    this.delegators.set(event, delegator);

    event.addListener(delegator);
  }

  private createDelegatorForEvent(event: Event) {
    return (data: unknown) => {
      this.executeCallbacksForEvent(event, data);
    };
  }

  private executeCallbacksForEvent(event: Event, data: unknown) {
    for (const callback of this.getCallbacksForEvent(event)) {
      callback(data);
    }
  }

  private getCallbacksForEvent(event: Event) {
    return this.callbacks.get(event) ?? new Set();
  }

  private addCallbackForEvent(event: Event, callback: EventListener) {
    const eventCallbacks = this.getCallbacksForEvent(event);

    eventCallbacks.add(callback);

    this.callbacks.set(event, eventCallbacks);
  }

  /**
   * Removes a listener for an event.
   * @param event The event to remove a listener from.
   * @param listener The listener to remove from the event.
   */
  public removeListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.removeCallbackForEvent(event as Event, listener as EventListener);

    if (this.getCallbacksForEvent(event as Event).size === 0) {
      this.callbacks.delete(event as Event);
      this.removeDelegatorForEvent(event as Event);
    }
  }

  private removeCallbackForEvent(event: Event, callback: EventListener) {
    const eventCallbacks = this.getCallbacksForEvent(event);

    eventCallbacks.delete(callback);

    this.callbacks.set(event, eventCallbacks);
  }

  private removeDelegatorForEvent(event: Event) {
    const delegator = this.delegators.get(event);

    this.delegators.delete(event);

    if (delegator) {
      event.removeListener(delegator);
    }
  }

  /** Starts listening for events, enabling listeners to execute when an event is emitted. */
  public startListening() {
    this.isListening = true;
    this.setupDelegators();
  }

  private setupDelegators() {
    for (const event of this.getEventsWithCallbacks()) {
      this.ensureEventHasDelegator(event);
    }
  }

  private getEventsWithCallbacks() {
    return this.callbacks.keys();
  }

  /** Stops listening for events, preventing listeners from executing when an event is emitted. This does not remove the event listeners. */
  public stopListening() {
    this.isListening = false;
    this.teardownDelegators();
  }

  private teardownDelegators() {
    for (const event of this.getEventsWithCallbacks()) {
      this.removeDelegatorForEvent(event);
    }
  }
}

/**
 * Manages a node's relationships.
 */
class NodeRelationshipManager {
  /** The node being managed. */
  private readonly self: Node;
  /** The node's parent node. */
  private parent: Node | null = null;
  /** The node's child nodes. */
  private children = new Set<Node>();

  constructor(self: Node) {
    this.self = self;
  }

  /** Gets the node's parent. */
  public getParent() {
    return this.parent;
  }

  /**
   * Assigns a parent to the node.
   * @param parent The parent to assign to the node.
   * @throws An error if passed parent is the node itself.
   */
  public assignParent(parent: Node) {
    this.throwIfParentIsSelf(parent);
    this.parent = parent;
  }

  private throwIfParentIsSelf(parent: Node) {
    if (this.isSelf(parent)) {
      throw new Error('Cannot set self as parent.');
    }
  }

  private isSelf(node: Node) {
    return node === this.self;
  }

  /** Unassigns the node's parent from the node. */
  public unassignParent() {
    this.parent = null;
  }

  private removeSelfFromParent() {
    this.self.parent?.removeChild(this.self);
  }

  private addSelfToParent(newParent: Node) {
    newParent.addChild(this.self);
  }

  /** Gets the node's children. */
  public getChildren() {
    return Array.from(this.children);
  }

  /**
   * Adds a child to the node.
   * @param child The child to add to the node.
   * @throws An error if passed child is self.
   * @throws An error if pass child already has a parent.
   */
  public addChild(child: Node) {
    this.throwIfChildIsSelf(child);
    this.throwIfChildAlreadyHasParent(child);
    this.parentChild(child);
  }

  private throwIfChildIsSelf(child: Node) {
    if (this.isSelf(child)) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private throwIfChildAlreadyHasParent(child: Node) {
    if (child.hasParent) {
      throw new Error('Node already has a parent.');
    }
  }

  private parentChild(child: Node) {
    this.children.add(child);
    this.assignSelfAsChildParent(child);
  }

  private assignSelfAsChildParent(child: Node) {
    child.assignParent(this.self);
  }

  /**
   * Removes child from the node.
   * @param child The child to remove.
   */
  public removeChild(child: Node) {
    this.children.delete(child);
    this.unassignParentFromChild(child);
  }

  private unassignParentFromChild(child: Node) {
    child.unassignParent();
  }

  /**
   * Reparents the node.
   * @param newParent The new parent to assign to the node.
   */
  public reparent(newParent: Node) {
    this.removeSelfFromParent();
    this.addSelfToParent(newParent);
  }
}
