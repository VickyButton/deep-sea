import type { CanvasNode } from './canvasNode.types';
import { Signal_Base } from '../../signals/Signal_Base';
import { Node_Base } from '../Node_Base';

/** The base implementation of the CanvasNode interface. */
export class CanvasNode_Base extends Node_Base implements CanvasNode {
  public readonly redraw_requested = new Signal_Base();
  public readonly visibility_changed = new Signal_Base<boolean>();
  public readonly z_index_changed = new Signal_Base<number>();
  private hasActiveRedrawRequest = false;
  private _visible = true;
  private _zIndex = 0;

  public get globalVisible(): boolean {
    if (!this.visible) {
      return this.visible;
    }

    const closestAncestor = this.getClosestAncestorOfType(CanvasNode_Base);

    return closestAncestor ? closestAncestor.globalVisible : this._visible;
  }

  public get globalZIndex(): number {
    const closestAncestor = this.getClosestAncestorOfType(CanvasNode_Base);

    return closestAncestor ? this.zIndex + closestAncestor.globalZIndex : this.zIndex;
  }

  public get visible() {
    return this._visible;
  }

  public set visible(newValue: boolean) {
    if (this.visible !== newValue) {
      this.setVisibile(newValue);
      this.emitVisibilityChangedSignal(newValue);
    }
  }

  private setVisibile(newValue: boolean) {
    this._visible = newValue;
  }

  private emitVisibilityChangedSignal(newValue: boolean) {
    this.visibility_changed.emit(newValue);
  }

  public get zIndex() {
    return this._zIndex;
  }

  public set zIndex(newValue: number) {
    if (this.zIndex !== newValue) {
      this.setZIndex(newValue);
      this.emitZIndexChangedSignal(newValue);
    }
  }

  private setZIndex(newValue: number) {
    this._zIndex = newValue;
  }

  private emitZIndexChangedSignal(newValue: number) {
    this.z_index_changed.emit(newValue);
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
    if (!this.hasActiveRedrawRequest) {
      this.hasActiveRedrawRequest = true;
      this.emitRedrawRequestedSignal();
    }
  }

  private emitRedrawRequestedSignal() {
    this.redraw_requested.emit();
  }

  public show() {
    this.visible = true;
  }
}
