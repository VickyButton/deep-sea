import { Scene } from '@core/nodes/Scene';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScenes } from './scenes';

vi.mock('assets', () => ({
  useAssets: () => ({
    sceneConfigs: {
      get: () => ({
        type: 'Scene',
        scripts: [],
        state: {
          title: 'Splash',
        },
        children: [],
      }),
    },
  }),
}));

vi.mock('config', () => ({
  useConfig: () => ({
    assets: {
      scenes: '/src/assets/scenes',
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

describe('scenes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should setup new active scene', () => {
    const sceneManager = useScenes();
    const scene = new Scene();
    const sceneSetupSpy = vi.spyOn(scene, 'setup');

    expect(sceneSetupSpy).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(sceneSetupSpy).toHaveBeenCalledOnce();
  });

  it('should update active scene', () => {
    const sceneManager = useScenes();
    const scene = new Scene();
    const sceneUpdateSpy = vi.spyOn(scene, 'update');

    sceneManager.setActiveScene(scene);
    sceneManager.updateActiveScene(1);

    expect(sceneUpdateSpy).toHaveBeenCalledWith(1);
  });

  it('should teardown current active scene when setting new active scene', () => {
    const sceneManager = useScenes();
    const scene = new Scene();
    const sceneTeardownSpy = vi.spyOn(scene, 'teardown');

    sceneManager.setActiveScene(scene);

    expect(sceneTeardownSpy).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(sceneTeardownSpy).toHaveBeenCalledOnce();
  });

  it('should load scene', async () => {
    const sceneManager = useScenes();
    const scene = await sceneManager.loadScene('Scene');

    expect(scene instanceof Scene).toBe(true);
  });
});
