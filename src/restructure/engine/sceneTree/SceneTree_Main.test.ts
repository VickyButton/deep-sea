import { SceneTree_Main } from './SceneTree_Main';
import { Node_Mock } from '../../nodes/node/Node_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('SceneTree_Main', () => {
  it('should not be active by default', () => {
    const tree = new SceneTree_Main();

    expect(tree.isActive).toBe(false);
  });

  it('should have 1 registered node by default', () => {
    const tree = new SceneTree_Main();

    expect(tree.nodeCount).toBe(1);
  });

  it('should add scene to root node as a child upon adding scene', () => {
    const tree = new SceneTree_Main();
    const scene = createNode('scene');
    const addChildSpy = vi.spyOn(tree.root, 'addChild');

    tree.addScene(scene);

    expect(addChildSpy).toHaveBeenCalledWith(scene);
  });

  it('should enter scene into self upon adding scene', () => {
    const tree = new SceneTree_Main();
    const scene = createNode('scene');

    tree.addScene(scene);

    expect(scene.enterTree).toHaveBeenCalledWith(tree);
  });

  it('should deregister node from self upon deregistering node', () => {
    const tree = new SceneTree_Main();
    const node = createNode('node');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(tree.nodeCount).toBe(1);
  });

  it('should emit "node_deregistered" signal upon deregistering node', () => {
    const tree = new SceneTree_Main();
    const node = createNode('node');
    const emitSpy = vi.spyOn(tree.node_deregistered, 'emit');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(emitSpy).toHaveBeenCalledWith(node);
  });

  it('should process root node upon processing', () => {
    const tree = new SceneTree_Main();
    const processSpy = vi.spyOn(tree.root, 'process');
    const dt = 1;

    tree.process(dt);

    expect(processSpy).toHaveBeenCalledWith(dt);
  });

  it('should emit "processed" signal after processing root node', () => {
    const tree = new SceneTree_Main();
    const emitSpy = vi.spyOn(tree.processed, 'emit');
    const processSpy = vi.spyOn(tree.root, 'process');
    const dt = 1;

    tree.process(dt);

    expect(emitSpy).toHaveBeenCalledAfter(processSpy);
  });

  it('should register node with self upon registering node', () => {
    const tree = new SceneTree_Main();
    const node = createNode('node');

    tree.registerNode(node);

    expect(tree.nodeCount).toBe(2);
  });

  it('should emit "node_registered" signal upon registering node', () => {
    const tree = new SceneTree_Main();
    const node = createNode('node');
    const emitSpy = vi.spyOn(tree.node_registered, 'emit');

    tree.registerNode(node);
    tree.deregisterNode(node);

    expect(emitSpy).toHaveBeenCalledWith(node);
  });

  it('should remove scene from root node as a child upon removing scene', () => {
    const tree = new SceneTree_Main();
    const scene = createNode('scene');
    const removeChildSpy = vi.spyOn(tree.root, 'removeChild');

    tree.addScene(scene);
    tree.removeScene(scene);

    expect(removeChildSpy).toHaveBeenCalledWith(scene);
  });

  it('should exit scene from self upon removing scene', () => {
    const tree = new SceneTree_Main();
    const scene = createNode('scene');

    tree.addScene(scene);
    tree.removeScene(scene);

    expect(scene.exitTree).toHaveBeenCalledWith(tree);
  });

  it('should start root node upon starting', () => {
    const tree = new SceneTree_Main();
    const startSpy = vi.spyOn(tree.root, 'start');

    tree.start();

    expect(startSpy).toHaveBeenCalled();
  });

  it('should be active after starting', () => {
    const tree = new SceneTree_Main();

    tree.start();

    expect(tree.isActive).toBe(true);
  });

  it('should stop root node upon stopping', () => {
    const tree = new SceneTree_Main();
    const stopSpy = vi.spyOn(tree.root, 'stop');

    tree.stop();

    expect(stopSpy).toHaveBeenCalled();
  });

  it('should not be active after stopping', () => {
    const tree = new SceneTree_Main();

    tree.stop();

    expect(tree.isActive).toBe(false);
  });
});

function createNode(id: string) {
  return new Node_Mock(id);
}
