import type { Node } from './node.types';
import { SignalController_Mock } from '../../controllers/signalController/SignalController_Mock';
import { Signal_Mock } from '../../signals/signal/Signal_Mock';
import { vi } from 'vitest';

/** The mock implementation of the Node interface. */
export class Node_Mock implements Node {
  public readonly child_added = new Signal_Mock();
  public readonly child_removed = new Signal_Mock();
  public readonly controller = new SignalController_Mock();
  public readonly id;
  public readonly processed = new Signal_Mock();
  public readonly started = new Signal_Mock();
  public readonly stopped = new Signal_Mock();
  public readonly tree_entered = new Signal_Mock();
  public readonly tree_exited = new Signal_Mock();
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
  public process = vi.fn();
  public removeChild = vi.fn().mockImplementation((node: Node) => {
    this._children.delete(node);
  });
  public setParent = vi.fn().mockImplementation((node: Node | null) => {
    this._parent = node;
  });
  public setProcessCallback = vi.fn();
  public start = vi.fn();
  public stop = vi.fn();
}
