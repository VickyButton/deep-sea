import { SceneTreeDefault } from './SceneTreeDefault';
import { Node } from '../../nodes/Node';
import { describe, expect, it } from 'vitest';

describe('SceneTreeDefault', () => {
  it('should add new scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');

    sceneTree.switchToScene(scene);

    expect(sceneTree.root.children.length).toBe(1);
    expect(sceneTree.root.children[0]).toBe(scene);
  });

  it('should replace current scene in root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    const replacementScene = new Node('replacementScene');

    sceneTree.switchToScene(scene);
    sceneTree.switchToScene(replacementScene);

    expect(sceneTree.root.children.length).toBe(1);
    expect(sceneTree.root.children[0]).toBe(replacementScene);
  });

  it('should add scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');

    sceneTree.switchToScene(scene);

    expect(sceneTree.root.children.length).toBe(1);
  });

  it('should set up current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isReady = false;

    sceneTree.switchToScene(scene);
    sceneTree.setup();

    expect(scene.isReady).toBe(true);
  });

  it('should activate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isActive = false;

    sceneTree.switchToScene(scene);
    sceneTree.activate();

    expect(scene.isActive).toBe(true);
  });

  it('should deactivate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isActive = true;

    sceneTree.switchToScene(scene);
    sceneTree.deactivate();

    expect(scene.isActive).toBe(false);
  });

  it('should tear down current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    scene.isReady = true;

    sceneTree.switchToScene(scene);
    sceneTree.teardown();

    expect(scene.isReady).toBe(false);
  });
});
