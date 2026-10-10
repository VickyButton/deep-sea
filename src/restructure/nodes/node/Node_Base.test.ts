import { Node_Base } from './Node_Base';
import { SignalController_Test } from '../../controllers/SignalController_Test';
import { SceneTree_Test } from '../../engine/sceneTree/SceneTree_Test';
import { Signal_Test } from '../../signals/signal/Signal_Test';
import { describe, expect, it, vi } from 'vitest';

describe('Node_Base', () => {
  it('should have no children by default', () => {
    const node = new Node_Base('node', dependencies);

    expect(node.children.length).toBe(0);
  });

  it('should not be active by default', () => {
    const node = new Node_Base('node', dependencies);

    expect(node.isActive).toBe(false);
  });

  it('should not be inside a tree by default', () => {
    const node = new Node_Base('node', dependencies);

    expect(node.isInsideTree).toBe(false);
  });

  it('should have no parent by default', () => {
    const node = new Node_Base('node', dependencies);

    expect(node.parent).toBe(null);
  });

  it('should have no tree by default', () => {
    const node = new Node_Base('node', dependencies);

    expect(node.tree).toBe(null);
  });

  it('should throw an error if trying to add self as a child', () => {
    const node = new Node_Base('node', dependencies);

    expect(() => node.addChild(node)).toThrowError();
  });

  it('should throw an error if trying to add child that already has a parent', () => {
    const node = new Node_Base('node', dependencies);
    const parent = new Node_Base('parent', dependencies);
    const child = new Node_Base('child', dependencies);

    parent.addChild(child);

    expect(() => node.addChild(child)).toThrowError();
  });

  it('should add a child', () => {
    const node = new Node_Base('node', dependencies);
    const child = new Node_Base('child', dependencies);

    node.addChild(child);

    expect(node.children.length).toBe(1);
    expect(node.children[0]).toBe(child);
    expect(child.parent).toBe(node);
  });

  it('should enter a node into tree upon adding as a child', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const child = new Node_Base('child', dependencies);

    node.enterTree(tree);
    node.addChild(child);

    expect(child.tree).toBe(tree);
  });

  it('should emit "child_added" signal upon adding a child', () => {
    const node = new Node_Base('node', dependencies);
    const child = new Node_Base('child', dependencies);
    const emitSpy = vi.spyOn(node.child_added, 'emit');

    node.addChild(child);

    expect(emitSpy).toHaveBeenCalledWith(child);
  });

  it('should throw an error if trying to enter a tree while already belonging to another tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const otherTree = new SceneTree_Test();

    node.enterTree(tree);

    expect(() => node.enterTree(otherTree)).toThrowError();
  });

  it('should register with tree upon entering a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const registerNodeSpy = vi.spyOn(tree, 'registerNode');

    node.enterTree(tree);

    expect(registerNodeSpy).toHaveBeenCalledWith(node);
  });

  it('should enter a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();

    node.enterTree(tree);

    expect(node.tree).toBe(tree);
  });

  it('should emit "tree_entered" signal upon entering a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const emitSpy = vi.spyOn(node.tree_entered, 'emit');

    node.enterTree(tree);

    expect(emitSpy).toHaveBeenCalledWith(tree);
  });

  it('should enter children into tree upon entering a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const child = new Node_Base('child', dependencies);

    node.addChild(child);
    node.enterTree(tree);

    expect(child.tree).toBe(tree);
  });

  it('should be inside a tree after entering a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();

    node.enterTree(tree);

    expect(node.isInsideTree).toBe(true);
  });

  it('should throw an error if trying to exit a tree that it does not belong to', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const otherTree = new SceneTree_Test();

    node.enterTree(tree);

    expect(() => node.exitTree(otherTree)).toThrowError();
  });

  it('should deregister from tree upon exiting a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const deregisterNodeSpy = vi.spyOn(tree, 'deregisterNode');

    node.enterTree(tree);
    node.exitTree(tree);

    expect(deregisterNodeSpy).toHaveBeenCalledWith(node);
  });

  it('should exit a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();

    node.enterTree(tree);
    node.exitTree(tree);

    expect(node.tree).toBe(null);
  });

  it('should exit children from a tree after exiting a tree', () => {
    const node = new Node_Base('node', dependencies);
    const child = new Node_Base('child', dependencies);
    const tree = new SceneTree_Test();

    node.addChild(child);
    node.enterTree(tree);
    node.exitTree(tree);

    expect(child.tree).toBe(null);
  });

  it('should emit "tree_exited" signal upon exiting a tree', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const emitSpy = vi.spyOn(node.tree_exited, 'emit');

    node.enterTree(tree);
    node.exitTree(tree);

    expect(emitSpy).toHaveBeenCalledWith(tree);
  });

  it('should throw an error if trying to remove a child that does not belong to it', () => {
    const node = new Node_Base('node', dependencies);
    const parent = new Node_Base('parent', dependencies);
    const child = new Node_Base('child', dependencies);

    parent.addChild(child);

    expect(() => node.removeChild(child)).toThrowError();
  });

  it('should remove a child', () => {
    const node = new Node_Base('node', dependencies);
    const child = new Node_Base('child', dependencies);

    node.addChild(child);
    node.removeChild(child);

    expect(node.children.length).toBe(0);
    expect(child.parent).toBe(null);
  });

  it('should exit a node from tree upon removing as a child', () => {
    const node = new Node_Base('node', dependencies);
    const tree = new SceneTree_Test();
    const child = new Node_Base('child', dependencies);

    node.enterTree(tree);
    node.addChild(child);
    node.removeChild(child);

    expect(child.tree).toBe(null);
  });

  it('should set parent to another node', () => {
    const node = new Node_Base('node', dependencies);
    const parent = new Node_Base('parent', dependencies);

    node.setParent(parent);

    expect(node.parent).toBe(parent);
  });

  it('should remove parent', () => {
    const node = new Node_Base('node', dependencies);
    const parent = new Node_Base('parent', dependencies);

    node.setParent(parent);
    node.setParent(null);

    expect(node.parent).toBe(null);
  });

  it('should start listening for signals upon starting', () => {
    const node = new Node_Base('node', dependencies);
    const startListeningSpy = vi.spyOn(node.controller, 'startListening');

    node.start();

    expect(startListeningSpy).toHaveBeenCalled();
  });

  it('should start children upon starting', () => {
    const node = new Node_Base('node', dependencies);
    const child = new Node_Base('child', dependencies);
    const emitSpy = vi.spyOn(child.started, 'emit');

    node.addChild(child);
    node.start();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit "started" signal upon starting', () => {
    const node = new Node_Base('node', dependencies);
    const emitSpy = vi.spyOn(node.started, 'emit');

    node.start();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should be active after starting', () => {
    const node = new Node_Base('node', dependencies);

    node.start();

    expect(node.controller.isListening).toBe(true);
  });

  it('should stop children upon stopping', () => {
    const node = new Node_Base('node', dependencies);
    const child = new Node_Base('child', dependencies);
    const emitSpy = vi.spyOn(child.stopped, 'emit');

    node.addChild(child);
    node.stop();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should stop listening for signals upon stopping', () => {
    const node = new Node_Base('node', dependencies);
    const stopListeningSpy = vi.spyOn(node.controller, 'stopListening');

    node.stop();

    expect(stopListeningSpy).toHaveBeenCalled();
  });

  it('should emit "stopped" signal upon stopping', () => {
    const node = new Node_Base('node', dependencies);
    const emitSpy = vi.spyOn(node.stopped, 'emit');

    node.stop();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not be active after stopping', () => {
    const node = new Node_Base('node', dependencies);

    node.stop();

    expect(node.isActive).toBe(false);
  });
});

const dependencies = {
  Signal: Signal_Test,
  SignalController: SignalController_Test,
};
