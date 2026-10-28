import { Signal } from '../../domain/signal/Signal';
import { Node } from '../node/Node';

/** A node that can be drawn onto a canvas. */
export class CanvasNode extends Node {
  /** Emitted after the node's visibility has been changed. The new visibility is passed to callbacks. */
  public readonly visibility_changed = new Signal<boolean>();
  /** Emitted after the node's z-index has been changed. The new z-index is passed to callbacks. */
  public readonly z_index_changed = new Signal<number>();
  private _visible = true;
  private _zIndex = 0;

  /** The node's global visibility. Is true when the node and its ancestors are visible. */
  public get globalVisible(): boolean {
    if (!this.visible) {
      return this.visible;
    }

    const closestAncestor = this.getClosestAncestorOfType(CanvasNode);

    return closestAncestor ? closestAncestor.globalVisible : this.visible;
  }

  /** The node's global z-index. */
  public get globalZIndex(): number {
    const closestAncestor = this.getClosestAncestorOfType(CanvasNode);

    return closestAncestor ? this.calculateGlobalZIndexFromNode(closestAncestor) : this.zIndex;
  }

  private calculateGlobalZIndexFromNode(node: CanvasNode) {
    return this.zIndex + node.zIndex;
  }

  /** The node's visibility. True means the node is visible, false means the node is hidden. */
  public get visible() {
    return this._visible;
  }

  public set visible(visible: boolean) {
    if (this.equalsCurrentVisible(visible)) {
      return;
    }

    this.setVisibile(visible);
    this.emitVisibilityChangedSignal(visible);
  }

  private equalsCurrentVisible(visible: boolean) {
    return this.visible === visible;
  }

  private setVisibile(visible: boolean) {
    this._visible = visible;
  }

  private emitVisibilityChangedSignal(visible: boolean) {
    this.visibility_changed.emit(visible);
  }

  /** The z-index to which the node belongs to. A node with a lower z-index will be drawn before a node with a higher z-index. */
  public get zIndex() {
    return this._zIndex;
  }

  public set zIndex(zIndex: number) {
    if (this.equalsCurrentZIndex(zIndex)) {
      return;
    }

    this.setZIndex(zIndex);
    this.emitZIndexChangedSignal(zIndex);
  }

  private equalsCurrentZIndex(zIndex: number) {
    return this.zIndex === zIndex;
  }

  private setZIndex(zIndex: number) {
    this._zIndex = zIndex;
  }

  private emitZIndexChangedSignal(zIndex: number) {
    this.z_index_changed.emit(zIndex);
  }

  /** Turns off the node's visibility. Hidden nodes cannot be drawn. */
  public hide() {
    this.visible = false;
  }

  /** Turns on the node's visibility. Visible nodes can be drawn. */
  public show() {
    this.visible = true;
  }
}
