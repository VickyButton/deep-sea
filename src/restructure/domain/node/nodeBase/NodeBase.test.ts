import { NodeBase } from './NodeBase';
import { describe, expect, it } from 'vitest';

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

  it('should remove a child', () => {
    const node = createNode();
    const child = createNode();

    node.addChild(child);
    node.removeChild(child);

    expect(node.children[0]).toBe(undefined);
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
