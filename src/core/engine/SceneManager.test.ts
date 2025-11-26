import { Scene } from '@core/nodes/Scene';
import { describe, expect, it, vi } from 'vitest';
import { SceneManager } from './SceneManager';

describe('SceneManager', () => {
  it('should setup new active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new Scene();
    const sceneSetupSpy = vi.spyOn(scene, 'setup');

    expect(sceneSetupSpy).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(sceneSetupSpy).toHaveBeenCalledOnce();
  });

  it('should update active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new Scene();
    const sceneUpdateSpy = vi.spyOn(scene, 'update');

    sceneManager.setActiveScene(scene);
    sceneManager.updateActiveScene(1);

    expect(sceneUpdateSpy).toHaveBeenCalledWith(1);
  });

  it('should teardown current active scene when setting new active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new Scene();
    const sceneTeardownSpy = vi.spyOn(scene, 'teardown');

    sceneManager.setActiveScene(scene);

    expect(sceneTeardownSpy).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(sceneTeardownSpy).toHaveBeenCalledOnce();
  });

  it('should load scene', async () => {
    vi.mock('/src/scenes/Scene/Scene', () => ({ default: Scene }));

    const sceneManager = new SceneManager();
    const scene = await sceneManager.loadScene('Scene');

    expect(scene instanceof Scene).toBe(true);
  });
});
