import type { CanvasNode } from './canvasNode.types';
import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import { Signal } from '../../domain/signal/Signal';
import { Node } from '../node/Node';
import { vi } from 'vitest';

/** The mock implementation of the CanvasNode interface. */
export class CanvasNode_Mock extends Node implements CanvasNode {
  public readonly redraw_requested = new Signal<DrawInstructions>();
  public readonly visibility_changed = new Signal<boolean>();
  public readonly z_index_changed = new Signal<number>();
  public visible = true;
  public zIndex = 0;

  public get globalVisible() {
    return this.visible;
  }

  public get globalZIndex() {
    return this.zIndex;
  }

  public hide = vi.fn().mockImplementation(() => {
    this.visible = false;
  });
  public requestRedraw = vi.fn();
  public setDrawCallback = vi.fn();
  public show = vi.fn().mockImplementation(() => {
    this.visible = true;
  });
}
