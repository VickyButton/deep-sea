import type { DrawCallback } from './canvasNode.types';
import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import { DrawInstructionsBuilder } from '../../domain/drawInstructions/builder/DrawInstructionsBuilder';
import { Signal } from '../../domain/signal/Signal';
import { Node } from '../node/Node';

/** A node that can be drawn onto a canvas. */
export class CanvasNode extends Node {
  /** Emitted after a redraw has been requested for the node. The draw instructions are passed to callbacks. */
  public readonly redraw_requested = new Signal<DrawInstructions>();
  /** Emitted after the node's visibility has been changed. The new visibility is passed to callbacks. */
  public readonly visibility_changed = new Signal<boolean>();
  /** Emitted after the node's z-index has been changed. The new z-index is passed to callbacks. */
  public readonly z_index_changed = new Signal<number>();
  private drawCallback: DrawCallback | null = null;
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

  public process(dt: number) {
    super.process(dt);

    if (this.globalVisible) {
      this.requestRedraw();
    }
  }

  /** Requests a redraw for the next frame. */
  public requestRedraw() {
    this.emitRedrawRequestedSignal(this.buildDrawInstructions());
  }

  private emitRedrawRequestedSignal(instructions: DrawInstructions) {
    this.redraw_requested.emit(instructions);
  }

  private buildDrawInstructions() {
    const builder = new DrawInstructionsBuilder();

    builder.setZIndex(this.globalZIndex);

    if (this.drawCallback) {
      this.drawCallback(builder);
    }

    return builder.build();
  }

  /** Sets the callback to execute when building the node's draw instructions. */
  public setDrawCallback(callback: DrawCallback) {
    this.drawCallback = callback;
  }

  /** Turns on the node's visibility. Visible nodes can be drawn. */
  public show() {
    this.visible = true;
  }
}
