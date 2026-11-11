import { CanvasService } from '../../src/engine/services/canvasService/CanvasService';
import { SceneTree } from '../../src/sceneTree/SceneTree';
import { MockCanvas } from '../mocks/MockCanvas';
import { describe, expect, it } from 'vitest';

describe('SceneTree', () => {
  it('should set viewport tree', () => {
    const tree = createSceneTree();

    expect(tree.viewport.tree).toBe(tree);
  });

  it('should set viewport camera', () => {
    expect(createSceneTree().viewport.camera).not.toBe(null);
  });
});

function createSceneTree() {
  return new SceneTree(createCanvasService());
}

function createCanvasService() {
  return new CanvasService(new MockCanvas());
}
