import { SceneTreeDefault } from './SceneTreeDefault';
import { describe, expect, it, vi } from 'vitest';

describe('SceneTreeDefault', () => {
  it('should add scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();

    sceneTree.addScene(scene);

    expect(sceneTree.root.getChildren().length).toBe(1);
  });

  it('should ready scene upon adding', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isReady = false;

    sceneTree.addScene(scene);

    expect(scene.isReady).toBe(true);
  });

  it('should activate scene upon adding', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isActive = false;

    sceneTree.addScene(scene);

    expect(scene.isActive).toBe(true);
  });

  it('should remove scene from root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();

    sceneTree.addScene(scene);
    sceneTree.removeScene(scene);

    expect(sceneTree.root.getChildren().length).toBe(0);
  });

  it('should unready scene upon removing', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isReady = false;

    sceneTree.addScene(scene);
    sceneTree.removeScene(scene);

    expect(scene.isReady).toBe(false);
  });

  it('should deactivate scene upon adding', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isActive = false;

    sceneTree.addScene(scene);
    sceneTree.removeScene(scene);

    expect(scene.isActive).toBe(false);
  });
});

const TestNode = vi.fn(class {
  id = '';
  isActive = false;
  isReady = false;
  activate = vi.fn(() => {
    this.isActive = true;
  });
  deactivate = vi.fn(() => {
    this.isActive = false;
  });
  ready = vi.fn(() => {
    this.isReady = true;
  });
  unready = vi.fn(() => {
    this.isReady = false;
  });
  traversePostorder = vi.fn((callback: (node: typeof this) => void) => {
    callback(this);
  });
  getParent = vi.fn();
  setParent = vi.fn();
  getChildren = vi.fn();
  addChild = vi.fn();
  removeChild = vi.fn();
});
