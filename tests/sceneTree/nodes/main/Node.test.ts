import { Node } from '../../../../src/sceneTree/nodes/main/Node';
import { SceneTree } from '../../../../src/sceneTree/SceneTree';
import { describe, expect, it, vi } from 'vitest';

describe('Node', () => {
  it('should have no children by default', () => {
    expect(createNode().children).toEqual([]);
  });

  it('should have no parent by default', () => {
    expect(createNode().parent).toBe(null);
  });

  it('should have no tree by default', () => {
    expect(createNode().tree).toBe(null);
  });

  it('should throw an error if entering a tree when already in a tree', () => {
    const tree = new SceneTree();
    const node = createNode();

    node.enterTree(tree);

    expect(() => node.enterTree(new SceneTree())).toThrowError(Node.AlreadyInTreeError);
  });

  it('should enter a tree', () => {
    const tree = new SceneTree();
    const node = createNode();

    node.enterTree(tree);

    expect(node.tree).toBe(tree);
  });

  it('should emit a signal upon entering tree', () => {
    const tree = new SceneTree();
    const node = createNode();
    const callback = vi.fn();

    node.treeEnteredSignal.listen(callback);
    node.enterTree(tree);

    expect(callback).toHaveBeenCalledWith(tree);
  });

  it('should enter children into tree upon entering tree', () => {
    const tree = new SceneTree();
    const node = createNode();
    const child = createNode();
    node.addChild(child);

    node.enterTree(tree);

    expect(child.tree).toBe(tree);
  });

  it('should exit a tree', () => {
    const tree = new SceneTree();
    const node = createNode();

    node.enterTree(tree);
    node.exitTree();

    expect(node.tree).toBe(null);
  });

  it('should not emit a signal upon exiting tree if not in a tree', () => {
    const node = createNode();
    const callback = vi.fn();

    node.treeExitedSignal.listen(callback);
    node.exitTree();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should emit a signal upon exiting tree', () => {
    const tree = new SceneTree();
    const node = createNode();
    const callback = vi.fn();

    node.treeExitedSignal.listen(callback);
    node.enterTree(tree);
    node.exitTree();

    expect(callback).toHaveBeenCalledWith(tree);
  });

  it('should exit children from tree upon exiting tree', () => {
    const node = createNode();
    const child = createNode();
    node.addChild(child);

    node.enterTree(new SceneTree());
    node.exitTree();

    expect(child.tree).toBe(null);
  });

  it('should throw an error if trying to add self as a child', () => {
    const node = createNode();

    expect(() => node.addChild(node)).toThrowError(Node.CircularRelationshipError);
  });

  it('should throw an error if trying to add a parented node as a child', () => {
    const node = createNode();
    const nodeWithParent = createNode();

    nodeWithParent.parent = createNode();

    expect(() => node.addChild(nodeWithParent)).toThrowError(Node.ChildHasParentError);
  });

  it('should add a child', () => {
    const node = createNode();
    const child = createNode();

    node.addChild(child);

    expect(node.children[0]).toBe(child);
    expect(child.parent).toBe(node);
  });

  it('should enter child node into tree upon adding a child', () => {
    const node = createNode();
    const child = createNode();
    const tree = new SceneTree();

    node.enterTree(tree);
    node.addChild(child);

    expect(child.tree).toBe(tree);
  });

  it('should emit a signal upon adding a child', () => {
    const node = createNode();
    const child = createNode();
    const callback = vi.fn();

    node.childAddedSignal.listen(callback);
    node.addChild(child);

    expect(callback).toHaveBeenCalledWith(child);
  });

  it('should remove a child', () => {
    const node = createNode();
    const child = createNode();

    node.addChild(child);
    node.removeChild(child);

    expect(node.children[0]).toBe(undefined);
    expect(child.parent).toBe(null);
  });

  it('should exit child node from tree upon removing a child', () => {
    const node = createNode();
    const child = createNode();
    const tree = new SceneTree();

    node.enterTree(tree);
    node.addChild(child);
    node.removeChild(child);

    expect(child.tree).toBe(null);
  });

  it('should emit a signal upon removing a child', () => {
    const node = createNode();
    const child = createNode();
    const callback = vi.fn();

    node.childRemovedSignal.listen(callback);
    node.addChild(child);
    node.removeChild(child);

    expect(callback).toHaveBeenCalledWith(child);
  });

  it('should not emit a signal if a child was not removed', () => {
    const node = createNode();
    const callback = vi.fn();

    node.childRemovedSignal.listen(callback);
    node.removeChild(createNode());

    expect(callback).not.toHaveBeenCalled();
  });

  it('should return false if child was removed', () => {
    const node = createNode();
    const child = createNode();

    expect(node.removeChild(child)).toBe(false);
  });

  it('should return true if child was removed', () => {
    const node = createNode();
    const child = createNode();

    node.addChild(child);

    expect(node.removeChild(child)).toBe(true);
  });

  it('should set a parent', () => {
    const node = createNode();
    const parent = createNode();

    node.parent = parent;

    expect(node.parent).toBe(parent);
  });

  it('should unset a parent', () => {
    const node = createNode();
    const parent = createNode();

    node.parent = parent;
    node.parent = null;

    expect(node.parent).toBe(null);
  });
});

class NodeBaseImplementation extends Node { }

function createNode(id = 'ID') {
  return new NodeBaseImplementation({
    id,
  });
}
