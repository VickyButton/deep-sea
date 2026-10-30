import { NodeBase } from './NodeBase';
import { describe, expect, it, vi } from 'vitest';

describe('NodeBase', () => {
  it('should have no children by default', () => {
    expect(createNode().children).toEqual([]);
  });

  it('should have no parent by default', () => {
    expect(createNode().parent).toBe(null);
  });

  it('should throw an error if trying to add self as a child', () => {
    const node = createNode();

    expect(() => node.addChild(node)).toThrowError(NodeBase.CircularRelationshipError);
  });

  it('should throw an error if trying to add a parented node as a child', () => {
    const node = createNode();
    const nodeWithParent = createNode();

    nodeWithParent.setParent(createNode());

    expect(() => node.addChild(nodeWithParent)).toThrowError(NodeBase.ChildHasParentError);
  });

  it('should add a child', () => {
    const node = createNode();
    const child = createNode();

    node.addChild(child);

    expect(node.children[0]).toBe(child);
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

  it('should throw an error if trying to set self as a parent', () => {
    const node = createNode();

    expect(() => node.setParent(node)).toThrowError(NodeBase.CircularRelationshipError);
  });

  it('should set a parent', () => {
    const node = createNode();
    const parent = createNode();

    node.setParent(parent);

    expect(node.parent).toBe(parent);
  });

  it('should unset a parent', () => {
    const node = createNode();
    const parent = createNode();

    node.setParent(parent);
    node.unsetParent();

    expect(node.parent).toBe(null);
  });
});

class NodeBaseImplementation extends NodeBase { }

function createNode(id = 'ID') {
  return new NodeBaseImplementation({
    id,
  });
}
