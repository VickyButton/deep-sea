import type { NodeBaseOptions } from './nodeBase.types';
import type { Node } from '../Node';

export abstract class NodeBase {
  public readonly id: string;
  private _children = new Set<Node>();
  private _parent: Node | null = null;

  constructor(options: NodeBaseOptions) {
    this.id = options.id;
  }

  public get children() {
    return Array.from(this._children);
  }

  public get parent() {
    return this._parent;
  }

  public addChild(node: Node) {
    if (this === node) {
      throw NodeBase.CircularRelationshipError;
    }

    if (node.parent !== null) {
      throw NodeBase.ChildHasParentError;
    }

    this._children.add(node);
  }

  public removeChild(node: Node) {
    this._children.delete(node);
  }

  public setParent(node: Node) {
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
