import { Scene } from '@core/nodes/Scene';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SceneManager } from './SceneManager';

vi.mock('config', () => ({
  useConfig: () => ({
    content: {
      scenes: '/src/scenes',
    },
    graphics: {
      width: 1,
      height: 1,
    },
    dev: {
      printLogs: true,
    },
  }),
}));

class TestScene extends Scene {
  title = 'TestScene';
}

describe('SceneManager', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should setup new active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new TestScene();
    const sceneSetupSpy = vi.spyOn(scene, 'setup');

    expect(sceneSetupSpy).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(sceneSetupSpy).toHaveBeenCalledOnce();
  });

  it('should update active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new TestScene();
    const sceneUpdateSpy = vi.spyOn(scene, 'update');

    sceneManager.setActiveScene(scene);
    sceneManager.updateActiveScene(1);

    expect(sceneUpdateSpy).toHaveBeenCalledWith(1);
  });

  it('should teardown current active scene when setting new active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new TestScene();
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
