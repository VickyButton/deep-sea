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
    if (!this._visible) {
      return this._visible;
    }

    const closestAncestor = this.getClosestAncestorOfType(CanvasNode_Base);

    return closestAncestor ? closestAncestor.globalVisible : this._visible;
  }

  public get globalZIndex(): number {
    const closestAncestor = this.getClosestAncestorOfType(CanvasNode_Base);

    return closestAncestor ? this._zIndex + closestAncestor.globalZIndex : this._zIndex;
  }

  public get visible() {
    return this._visible;
  }

  public set visible(newValue: boolean) {
    this.setVisibile(newValue);
  }

  private setVisibile(newValue: boolean) {
    if (this._visible !== newValue) {
      this._visible = newValue;
      this.emitVisibilityChangedSignal(newValue);
    }
  }

  private emitVisibilityChangedSignal(newValue: boolean) {
    this.visibility_changed.emit(newValue);
  }

  public get zIndex() {
    return this._zIndex;
  }

  public set zIndex(newValue: number) {
    this.setZIndex(newValue);
  }

  private setZIndex(newValue: number) {
    if (this._zIndex !== newValue) {
      this._zIndex = newValue;
      this.emitZIndexChangedSignal(newValue);
    }
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
    this.setVisibile(false);
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
    this.setVisibile(true);
  }
}
