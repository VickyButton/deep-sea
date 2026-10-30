import type { NodeBaseOptions } from './nodeBase.types';

export abstract class NodeBase {
  public readonly id: string;
  private _children = new Set<NodeBase>();
  private _parent: NodeBase | null = null;

  constructor(options: NodeBaseOptions) {
    this.id = options.id;
  }

  public get children() {
    return Array.from(this._children);
  }

  public get parent() {
    return this._parent;
  }

  public addChild(node: NodeBase) {
    if (this === node) {
      throw NodeBase.CircularRelationshipError;
    }

    if (node.parent !== null) {
      throw NodeBase.ChildHasParentError;
    }

    this._children.add(node);
  }

  public removeChild(node: NodeBase) {
    this._children.delete(node);
  }

  public setParent(node: NodeBase) {
    if (this === node) {
      throw NodeBase.CircularRelationshipError;
    }

    this._parent = node;
  }

  public unsetParent() {
    this._parent = null;
  }

  public static get ChildHasParentError() {
    return new Error('Cannot add parented child as a child.');
  }

  public static get CircularRelationshipError() {
    return new Error('Cannot create a circular relationship.');
  }
}
