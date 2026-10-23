import type { CanvasNode, DrawCallback } from './canvasNode.types';
import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import { DrawInstructionsBuilder } from '../../domain/drawInstructions/builder/DrawInstructionsBuilder';
import { Signal_Main } from '../../domain/signal/Signal_Main';
import { Node_Main } from '../node/Node_Main';

/** The main implementation of the CanvasNode interface. */
export class CanvasNode_Main extends Node_Main implements CanvasNode {
  public readonly redraw_requested = new Signal_Main<DrawInstructions>();
  public readonly visibility_changed = new Signal_Main<boolean>();
  public readonly z_index_changed = new Signal_Main<number>();
  private drawCallback: DrawCallback | null = null;
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

  public hide() {
    this.visible = false;
  }

  public process(dt: number) {
    super.process(dt);

    if (this.globalVisible) {
      this.requestRedraw();
    }
  }

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

  public setDrawCallback(callback: DrawCallback) {
    this.drawCallback = callback;
  }

  public show() {
    this.visible = true;
  }
}
