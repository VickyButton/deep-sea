import { SceneTreeDefault } from './SceneTreeDefault';
import { Node } from '../../nodes/Node';
import { describe, expect, it, vi } from 'vitest';

describe('SceneTreeDefault', () => {
  it('should stop and then teardown current scene when setting a new scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    const stopSpy = vi.spyOn(scene, 'stop');
    const teardownSpy = vi.spyOn(scene, 'teardown');
    const newScene = new Node('new-scene');

    sceneTree.setCurrentScene(scene);
    sceneTree.setCurrentScene(newScene);

    expect(stopSpy).toHaveBeenCalled();
    expect(stopSpy).toHaveBeenCalledBefore(teardownSpy);
    expect(teardownSpy).toHaveBeenCalled();
  });

  it('should start the current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    const startSpy = vi.spyOn(scene, 'start');

    sceneTree.setCurrentScene(scene);
    sceneTree.startCurrentScene();

    expect(startSpy).toHaveBeenCalled();
  });

  it('should stop the current scene', () => {
    const sceneTree = new SceneTreeDefault();
    const scene = new Node('scene');
    const stopSpy = vi.spyOn(scene, 'stop');

    sceneTree.setCurrentScene(scene);
    sceneTree.stopCurrentScene();

    expect(stopSpy).toHaveBeenCalled();
  });
});
