import { SceneTreeDefault } from './SceneTreeDefault';
import { describe, expect, it, vi } from 'vitest';

describe('SceneTreeDefault', () => {
  it('should add new scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();

    sceneTree.switchToScene(scene);

    expect(sceneTree.root.getChildren().length).toBe(1);
    expect(sceneTree.root.getChildren()[0]).toBe(scene);
  });

  it('should replace current scene in root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    const replacementScene = new TestNode();

    sceneTree.switchToScene(scene);
    sceneTree.switchToScene(replacementScene);

    expect(sceneTree.root.getChildren().length).toBe(1);
    expect(sceneTree.root.getChildren()[0]).toBe(replacementScene);
  });

  it('should add scene to root node', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();

    sceneTree.switchToScene(scene);

    expect(sceneTree.root.getChildren().length).toBe(1);
  });

  it('should ready current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isReady = false;

    sceneTree.switchToScene(scene);
    sceneTree.ready();

    expect(scene.isReady).toBe(true);
  });

  it('should unready current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isReady = true;

    sceneTree.switchToScene(scene);
    sceneTree.unready();

    expect(scene.isReady).toBe(false);
  });

  it('should activate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isActive = false;

    sceneTree.switchToScene(scene);
    sceneTree.activate();

    expect(scene.isActive).toBe(true);
  });

  it('should deactivate current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new TestNode();
    scene.isActive = true;

    sceneTree.switchToScene(scene);
    sceneTree.deactivate();

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
