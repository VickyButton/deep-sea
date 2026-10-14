import { CanvasNode_Main } from './CanvasNode_Main';
import { describe, expect, it, vi } from 'vitest';

describe('CanvasNode_Main', () => {
  it('should be visible by default', () => {
    const node = new CanvasNode_Main('node');

    expect(node.visible).toBe(true);
  });

  it('should not emit "visibility_changed" signal if visibility has not changed', () => {
    const node = new CanvasNode_Main('node');
    const newValue = node.visible;
    const emitSpy = vi.spyOn(node.visibility_changed, 'emit');

    node.visible = newValue;

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit "visibility_changed" signal if visibility has changed', () => {
    const node = new CanvasNode_Main('node');
    const newValue = !node.visible;
    const emitSpy = vi.spyOn(node.visibility_changed, 'emit');

    node.visible = newValue;

    expect(emitSpy).toHaveBeenCalledWith(newValue);
  });

  it('should have z-index of 0 by default', () => {
    const node = new CanvasNode_Main('node');

    expect(node.zIndex).toBe(0);
  });

  it('should not emit "z_index_changed" signal if z-index has not changed', () => {
    const node = new CanvasNode_Main('node');
    const newValue = node.zIndex;
    const emitSpy = vi.spyOn(node.z_index_changed, 'emit');

    node.zIndex = newValue;

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit "z_index_changed" signal if z-index has changed', () => {
    const node = new CanvasNode_Main('node');
    const newValue = node.zIndex + 1;
    const emitSpy = vi.spyOn(node.z_index_changed, 'emit');

    node.zIndex = newValue;

    expect(emitSpy).toHaveBeenCalledWith(newValue);
  });

  it('should be visible globally by default', () => {
    const node = new CanvasNode_Main('node');

    expect(node.globalVisible).toBe(true);
  });

  it('should determine global visibility from closest ancestor', () => {
    const node = new CanvasNode_Main('node');
    const parent = new CanvasNode_Main('ancestor');
    parent.visible = false;

    parent.addChild(node);

    expect(node.globalVisible).toBe(false);
  });

  it('should have global z-index of 0 by default', () => {
    const node = new CanvasNode_Main('node');

    expect(node.globalZIndex).toBe(0);
  });

  it('should determine global z-index from closest ancestor', () => {
    const node = new CanvasNode_Main('node');
    node.zIndex = 1;
    const parent = new CanvasNode_Main('ancestor');
    parent.zIndex = 2;

    parent.addChild(node);

    expect(node.globalZIndex).toBe(3);
  });

  it('should hide node', () => {
    const node = new CanvasNode_Main('node');
    const emitSpy = vi.spyOn(node.visibility_changed, 'emit');

    node.hide();

    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should emit "redraw_requested" signal when a redraw is requested', () => {
    const node = new CanvasNode_Main('node');
    const emitSpy = vi.spyOn(node.redraw_requested, 'emit');

    node.requestRedraw();

    expect(emitSpy).toHaveBeenCalledWith({
      id: node.id,
      zIndex: node.globalZIndex,
      draw: node.draw,
    });
  });

  it('should only emit "redraw_requested" signal once, even if redraw is requested more than once', () => {
    const node = new CanvasNode_Main('node');
    const emitSpy = vi.spyOn(node.redraw_requested, 'emit');

    node.requestRedraw();
    node.requestRedraw();

    expect(emitSpy).toHaveBeenCalledOnce();
  });

  it('should allow "redraw_requested" signal to be emitted again after request is completed', () => {
    const node = new CanvasNode_Main('node');
    const emitSpy = vi.spyOn(node.redraw_requested, 'emit');

    node.requestRedraw();
    node.draw();
    node.requestRedraw();

    expect(emitSpy).toHaveBeenCalledTimes(2);
  });

  it('should show node', () => {
    const node = new CanvasNode_Main('node');
    const emitSpy = vi.spyOn(node.visibility_changed, 'emit');

    node.hide();
    node.show();

    expect(emitSpy).toHaveBeenLastCalledWith(true);
  });
});
