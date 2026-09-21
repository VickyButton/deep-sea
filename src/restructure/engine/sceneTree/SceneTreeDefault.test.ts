import { SceneTreeDefault } from './SceneTreeDefault';
import { Node } from '../../nodes/Node';
import { describe, expect, it } from 'vitest';

describe('SceneTreeDefault', () => {
  it('should add new scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');

    sceneTree.setScene(scene);

    expect(sceneTree.root.children.length).toBe(1);
    expect(sceneTree.root.children[0]).toBe(scene);
  });

  it('should replace current scene in root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    const replacementScene = new Node('replacementScene');

    sceneTree.setScene(scene);
    sceneTree.setScene(replacementScene);

    expect(sceneTree.root.children.length).toBe(1);
    expect(sceneTree.root.children[0]).toBe(replacementScene);
  });

  it('should set up current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isReady = false;

    sceneTree.setScene(scene);
    sceneTree.setup();

    expect(scene.isReady).toBe(true);
  });

  it('should activate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isActive = false;

    sceneTree.setScene(scene);
    sceneTree.activate();

    expect(scene.isActive).toBe(true);
  });

  it('should deactivate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isActive = true;

    sceneTree.setScene(scene);
    sceneTree.deactivate();

    expect(scene.isActive).toBe(false);
  });

  it('should tear down current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isReady = true;

    sceneTree.setScene(scene);
    sceneTree.teardown();

    expect(scene.isReady).toBe(false);
  });
});
