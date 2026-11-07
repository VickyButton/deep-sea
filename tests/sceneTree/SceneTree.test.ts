import { SceneTree } from '../../src/sceneTree/SceneTree';
import { describe, expect, it } from 'vitest';

describe('SceneTree', () => {
  it('should set viewport tree', () => {
    const tree = new SceneTree();

    expect(tree.viewport.tree).toBe(tree);
  });
});
