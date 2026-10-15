import type { CanvasNode } from './canvasNode.types';
import type { DrawCommand } from '../../engine/graphics/graphics.types';
import { Signal_Main } from '../../signals/signal/Signal_Main';
import { Node_Main } from '../node/Node_Main';

/** The main implementation of the CanvasNode interface. */
export class CanvasNode_Main extends Node_Main implements CanvasNode {
  public readonly redraw_requested = new Signal_Main<DrawCommand>();
  public readonly visibility_changed = new Signal_Main<boolean>();
  public readonly z_index_changed = new Signal_Main<number>();
  private hasActiveRedrawRequest = false;
  private _visible = true;
  private _zIndex = 0;

  public get globalVisible(): boolean {
    if (!this.visible) {
      return this.visible;
    }

    const closestAncestor = this.getClosestAncestorOfType(CanvasNode_Main);

    return closestAncestor ? closestAncestor.globalVisible : this.visible;
  }

  public get globalZIndex(): number {
    const closestAncestor = this.getClosestAncestorOfType(CanvasNode_Main);

    return closestAncestor ? this.calculateGlobalZIndexFromNode(closestAncestor) : this.zIndex;
  }

  private calculateGlobalZIndexFromNode(node: CanvasNode) {
    return this.zIndex + node.zIndex;
  }

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

  public draw() {
    this.completeRedrawRequest();
  }

  private completeRedrawRequest() {
    this.hasActiveRedrawRequest = false;
  }

  public hide() {
    this.visible = false;
  }

  public requestRedraw() {
    if (this.hasActiveRedrawRequest) {
      return;
    }

    this.hasActiveRedrawRequest = true;
    this.emitRedrawRequestedSignal();
  }

  private emitRedrawRequestedSignal() {
    this.redraw_requested.emit(this.createDrawCommand());
  }

  private createDrawCommand() {
    return {
      id: this.id,
      zIndex: this.globalZIndex,
      draw: this.draw,
    };
  }

  public show() {
    this.visible = true;
  }
}
