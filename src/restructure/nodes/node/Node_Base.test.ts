import { Node_Base } from './Node_Base';
import { describe, expect, it, vi } from 'vitest';

describe('Node_Base', () => {
  it('should have no children by default', () => {
    const node = new Node_Base('node');

    expect(node.children.length).toBe(0);
  });

  it('should not be active by default', () => {
    const node = new Node_Base('node');

    expect(node.isActive).toBe(false);
  });

  it('should not be inside a tree by default', () => {
    const node = new Node_Base('node');

    expect(node.isInsideTree).toBe(false);
  });

  it('should have no parent by default', () => {
    const node = new Node_Base('node');

    expect(node.parent).toBe(null);
  });

  it('should have no tree by default', () => {
    const node = new Node_Base('node');

    expect(node.tree).toBe(null);
  });

  it('should throw an error if trying to add self as a child', () => {
    const node = new Node_Base('node');

    expect(() => node.addChild(node)).toThrowError();
  });

  it('should throw an error if trying to add child that already has a parent', () => {
    const node = new Node_Base('node');
    const parent = new Node_Base('parent');
    const child = new Node_Base('child');

    parent.addChild(child);

    expect(() => node.addChild(child)).toThrowError();
  });

  it('should add a child', () => {
    const node = new Node_Base('node');
    const child = new Node_Base('child');

    node.addChild(child);

    expect(node.children.length).toBe(1);
    expect(node.children[0]).toBe(child);
    expect(child.parent).toBe(node);
  });

  it('should enter a node into node tree when adding as a child', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const child = new Node_Base('child');

    node.enterTree(tree);
    node.addChild(child);

    expect(child.tree).toBe(tree);
  });

  it('should emit "child_added" signal after adding a child', () => {
    const node = new Node_Base('node');
    const child = new Node_Base('child');
    const emitSpy = vi.spyOn(node.child_added, 'emit');

    node.addChild(child);

    expect(emitSpy).toHaveBeenCalledWith(child);
  });

  it('should throw an error if trying to enter a tree when already belonging to another tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const otherTree = new NodeTree();

    node.enterTree(tree);

    expect(() => node.enterTree(otherTree)).toThrowError();
  });

  it('should enter a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();

    node.enterTree(tree);

    expect(node.tree).toBe(tree);
  });

  it('should be active after entering a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();

    node.enterTree(tree);

    expect(node.isActive).toBe(true);
  });

  it('should be inside a tree after entering a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();

    node.enterTree(tree);

    expect(node.isInsideTree).toBe(true);
  });

  it('should emit "tree_entered" signal after entering a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const emitSpy = vi.spyOn(node.tree_entered, 'emit');

    node.enterTree(tree);

    expect(emitSpy).toHaveBeenCalledWith(tree);
  });

  it('should enter children into tree after entering a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const child = new Node_Base('child');

    node.addChild(child);
    node.enterTree(tree);

    expect(child.tree).toBe(tree);
  });

  it('should throw an error if trying to remove a child that does not belong to it', () => {
    const node = new Node_Base('node');
    const parent = new Node_Base('parent');
    const child = new Node_Base('child');

    parent.addChild(child);

    expect(() => node.removeChild(child)).toThrowError();
  });

  it('should remove a child', () => {
    const node = new Node_Base('node');
    const child = new Node_Base('child');

    node.addChild(child);
    node.removeChild(child);

    expect(node.children.length).toBe(0);
    expect(child.parent).toBe(null);
  });

  it('should throw an error if trying to exit a tree that it does not belong to', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const otherTree = new NodeTree();

    node.enterTree(tree);

    expect(() => node.exitTree(otherTree)).toThrowError();
  });

  it('should exit a node from node tree when removing as a child', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const child = new Node_Base('child');

    node.enterTree(tree);
    node.addChild(child);
    node.removeChild(child);

    expect(child.tree).toBe(null);
  });

  it('should exit a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();

    node.enterTree(tree);
    node.exitTree(tree);

    expect(node.tree).toBe(null);
  });

  it('should not be active after exiting a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();

    node.enterTree(tree);
    node.exitTree(tree);

    expect(node.isActive).toBe(false);
  });

  it('should exit children from a tree after exiting a tree', () => {
    const node = new Node_Base('node');
    const child = new Node_Base('child');
    const tree = new NodeTree();

    node.addChild(child);
    node.enterTree(tree);
    node.exitTree(tree);

    expect(child.tree).toBe(null);
  });

  it('should emit "tree_exited" signal after exiting a tree', () => {
    const node = new Node_Base('node');
    const tree = new NodeTree();
    const emitSpy = vi.spyOn(node.tree_exited, 'emit');

    node.enterTree(tree);
    node.exitTree(tree);

    expect(emitSpy).toHaveBeenCalledWith(tree);
  });

  it('should set parent to another node', () => {
    const node = new Node_Base('node');
    const parent = new Node_Base('parent');

    node.setParent(parent);

    expect(node.parent).toBe(parent);
  });

  it('should remove parent', () => {
    const node = new Node_Base('node');
    const parent = new Node_Base('parent');

    node.setParent(parent);
    node.setParent(null);

    expect(node.parent).toBe(null);
  });

  it('should start listening for signals on start', () => {
    const node = new Node_Base('node');
    const startListeningSpy = vi.spyOn(node.controller, 'startListening');

    node.start();

    expect(startListeningSpy).toHaveBeenCalled();
  });

  it('should start children on start', () => {
    const node = new Node_Base('node');
    const child = new Node_Base('child');
    const emitSpy = vi.spyOn(child.started, 'emit');

    node.addChild(child);
    node.start();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit "started" signal after starting', () => {
    const node = new Node_Base('node');
    const emitSpy = vi.spyOn(node.started, 'emit');

    node.start();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should stop children on stop', () => {
    const node = new Node_Base('node');
    const child = new Node_Base('child');
    const emitSpy = vi.spyOn(child.stopped, 'emit');

    node.addChild(child);
    node.stop();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should stop listening for signals on stop', () => {
    const node = new Node_Base('node');
    const stopListeningSpy = vi.spyOn(node.controller, 'stopListening');

    node.stop();

    expect(stopListeningSpy).toHaveBeenCalled();
  });

  it('should emit "stopped" signal after starting', () => {
    const node = new Node_Base('node');
    const emitSpy = vi.spyOn(node.stopped, 'emit');

    node.stop();

    expect(emitSpy).toHaveBeenCalled();
  });
});

const NodeTree = vi.fn(class {
  public readonly node_added = new Signal();
  public readonly node_removed = new Signal();
  public readonly root = new Node_Base('root');
  public addNode = vi.fn();
  public removeNode = vi.fn();
});

class Signal {
  public callbackCount = 0;
  public clear = vi.fn();
  public emit = vi.fn();
  public listen = vi.fn();
  public unlisten = vi.fn();
}
