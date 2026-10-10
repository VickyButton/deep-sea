import type { Node } from './node.types';
import { SignalController_Test } from '../../controllers/SignalController_Test';
import { Signal_Test } from '../../signals/signal/Signal_Test';
import { vi } from 'vitest';

/** The test implementation of the Node interface. */
export class Node_Test implements Node {
  public readonly child_added = new Signal_Test();
  public readonly child_removed = new Signal_Test();
  public readonly controller = new SignalController_Test();
  public readonly id;
  public readonly started = new Signal_Test();
  public readonly stopped = new Signal_Test();
  public readonly tree_entered = new Signal_Test();
  public readonly tree_exited = new Signal_Test();
  private readonly _children = new Set<Node>();
  private _parent: Node | null = null;

  constructor(id: string) {
    this.id = id;
  }

  public get children() {
    return Array.from(this._children);
  }

  public get isActive() {
    return this.controller.isListening;
  }

  public get isInsideTree() {
    return false;
  }

  public get parent() {
    return this._parent;
  }

  public get tree() {
    return null;
  }

  public addChild = vi.fn().mockImplementation((node: Node) => {
    this._children.add(node);
  });
  public enterTree = vi.fn();
  public exitTree = vi.fn();
  public removeChild = vi.fn().mockImplementation((node: Node) => {
    this._children.delete(node);
  });
  public setParent = vi.fn().mockImplementation((node: Node | null) => {
    this._parent = node;
  });
  public start = vi.fn();
  public stop = vi.fn();
}
