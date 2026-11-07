import { SceneTree } from '../../src/sceneTree/SceneTree';
import { describe, expect, it } from 'vitest';

describe('SceneTree', () => {
  it('should set root tree', () => {
    const tree = new SceneTree();

    expect(tree.root.tree).toBe(tree);
  });
});
