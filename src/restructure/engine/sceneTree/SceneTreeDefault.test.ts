import { SceneTreeDefault } from './SceneTreeDefault';
import { BaseNode } from '../../nodes/BaseNode';
import { describe, expect, it } from 'vitest';

describe('SceneTreeDefault', () => {
  it('should add new scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');

    sceneTree.switchToScene(scene);

    expect(sceneTree.root.children.length).toBe(1);
    expect(sceneTree.root.children[0]).toBe(scene);
  });

  it('should replace current scene in root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');
    const replacementScene = new BaseNode('replacementScene');

    sceneTree.switchToScene(scene);
    sceneTree.switchToScene(replacementScene);

    expect(sceneTree.root.children.length).toBe(1);
    expect(sceneTree.root.children[0]).toBe(replacementScene);
  });

  it('should add scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');

    sceneTree.switchToScene(scene);

    expect(sceneTree.root.children.length).toBe(1);
  });

  it('should ready current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');
    scene.isReady = false;

    sceneTree.switchToScene(scene);
    sceneTree.ready();

    expect(scene.isReady).toBe(true);
  });

  it('should unready current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');
    scene.isReady = true;

    sceneTree.switchToScene(scene);
    sceneTree.unready();

    expect(scene.isReady).toBe(false);
  });

  it('should activate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');
    scene.isActive = false;

    sceneTree.switchToScene(scene);
    sceneTree.activate();

    expect(scene.isActive).toBe(true);
  });

  it('should deactivate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new BaseNode('scene');
    scene.isActive = true;

    sceneTree.switchToScene(scene);
    sceneTree.deactivate();

    expect(scene.isActive).toBe(false);
  });
});
