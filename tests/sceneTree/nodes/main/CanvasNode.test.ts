import { CanvasNode } from '../../../../src/sceneTree/nodes/main/CanvasNode';
import { describe, expect, it } from 'vitest';

describe('CanvasNode', () => {
  it('should be visible by default', () => {
    expect(createCanvasNode().visible).toBe(true);
  });

  it('should set visibility', () => {
    const node = createCanvasNode();

    node.visible = false;

    expect(node.visible).toBe(false);
  });

  it('should show node', () => {
    const node = createCanvasNode();

    node.visible = false;
    node.show();

    expect(node.visible).toBe(true);
  });

  it('should hide node', () => {
    const node = createCanvasNode();

    node.visible = true;
    node.hide();

    expect(node.visible).toBe(false);
  });

  it('should have local z-index of zero by default', () => {
    expect(createCanvasNode().zIndex).toBe(0);
  });

  it('should set local z-index', () => {
    const node = createCanvasNode();

    node.zIndex = 1;

    expect(node.zIndex).toBe(1);
  });
});

function createCanvasNode() {
  return new CanvasNode({
    id: 'ID',
  });
}
