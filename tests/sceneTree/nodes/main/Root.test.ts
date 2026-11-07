import { Root } from '../../../../src/sceneTree/nodes/main/Root';
import { SceneTree } from '../../../../src/sceneTree/SceneTree';
import { describe, expect, it } from 'vitest';

describe('Root', () => {
  it('should have no tree by default', () => {
    expect(createRoot().tree).toBe(null);
  });

  it('should set tree', () => {
    const tree = new SceneTree();
    const root = createRoot();

    root.tree = tree;

    expect(root.tree).toBe(tree);
  });
});

function createRoot() {
  return new Root({
    id: 'ROOT',
  });
}
