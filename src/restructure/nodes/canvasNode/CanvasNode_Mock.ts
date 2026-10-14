import type { CanvasNode } from './canvasNode.types';
import type { DrawCommand } from '../../engine/graphics/graphics.types';
import { Signal_Mock } from '../../signals/signal/Signal_Mock';
import { Node_Mock } from '../node/Node_Mock';
import { vi } from 'vitest';

/** The mock implementation of the CanvasNode interface. */
export class CanvasNode_Mock extends Node_Mock implements CanvasNode {
  public readonly redraw_requested = new Signal_Mock<DrawCommand>();
  public readonly visibility_changed = new Signal_Mock<boolean>();
  public readonly z_index_changed = new Signal_Mock<number>();
  public visible = true;

  public get globalVisible() {
    return this.visible;
  }

  public get globalZIndex() {
    return this.zIndex;
  }

  public get zIndex() {
    return 0;
  }

  public draw = vi.fn();
  public hide = vi.fn().mockImplementation(() => {
    this.visible = false;
  });
  public requestRedraw = vi.fn();
  public show = vi.fn().mockImplementation(() => {
    this.visible = true;
  });
}
