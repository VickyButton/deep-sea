import { SceneTree_Base } from './SceneTree_Base';
import { Node_Test } from '../../nodes/node/Node_Test';
import { describe, expect, it, vi } from 'vitest';

describe('SceneTree_Base', () => {
  it('should have 1 registered node by default', () => {
    const tree = new SceneTree_Base();

    expect(tree.nodeCount).toBe(1);
  });

  it('should add scene to root node as a child upon adding scene', () => {
    const tree = new SceneTree_Base();
    const scene = createNode('scene');
    const addChildSpy = vi.spyOn(tree.root, 'addChild');

    tree.addScene(scene);

    expect(addChildSpy).toHaveBeenCalledWith(scene);
  });

  it('should enter scene into self upon adding scene', () => {
    const tree = new SceneTree_Base();
    const scene = createNode('scene');

    tree.addScene(scene);

    expect(scene.enterTree).toHaveBeenCalledWith(tree);
  });

  it('should deregister node from self upon deregistering node', () => {
    const tree = new SceneTree_Base();
    const node = createNode('node');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(tree.nodeCount).toBe(1);
  });

  it('should emit "node_deregistered" signal upon deregistering node', () => {
    const tree = new SceneTree_Base();
    const node = createNode('node');
    const emitSpy = vi.spyOn(tree.node_deregistered, 'emit');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(emitSpy).toHaveBeenCalledWith(node);
  });

  it('should register node with self upon registering node', () => {
    const tree = new SceneTree_Base();
    const node = createNode('node');

    tree.registerNode(node);

    expect(tree.nodeCount).toBe(2);
  });

  it('should emit "node_registered" signal upon registering node', () => {
    const tree = new SceneTree_Base();
    const node = createNode('node');
    const emitSpy = vi.spyOn(tree.node_registered, 'emit');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(emitSpy).toHaveBeenCalledWith(node);
  });

  it('should remove scene from root node as a child upon removing scene', () => {
    const tree = new SceneTree_Base();
    const scene = createNode('scene');
    const removeChildSpy = vi.spyOn(tree.root, 'removeChild');

    tree.addScene(scene);
    tree.removeScene(scene);

    expect(removeChildSpy).toHaveBeenCalledWith(scene);
  });

  it('should exit scene from self upon removing scene', () => {
    const tree = new SceneTree_Base();
    const scene = createNode('scene');

    tree.addScene(scene);
    tree.removeScene(scene);

    expect(scene.exitTree).toHaveBeenCalledWith(tree);
  });

  it('should start root node upon starting', () => {
    const tree = new SceneTree_Base();
    const startSpy = vi.spyOn(tree.root, 'start');

    tree.start();

    expect(startSpy).toHaveBeenCalled();
  });

  it('should stop root node upon stopping', () => {
    const tree = new SceneTree_Base();
    const stopSpy = vi.spyOn(tree.root, 'stop');

    tree.stop();

    expect(stopSpy).toHaveBeenCalled();
  });
});

function createNode(id: string) {
  return new Node_Test(id);
}
