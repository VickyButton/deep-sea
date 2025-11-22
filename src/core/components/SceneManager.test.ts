import { describe, expect, it, vi } from 'vitest';
import { SceneManager } from './SceneManager';
import { Scene } from '../entities/Scene';

class TestScene extends Scene {
  public setup = vi.fn();
  public update = vi.fn();
  public teardown = vi.fn();

  protected getDefaultState() {
    return {
      name: 'Test',
    };
  }
}

describe('SceneManager', () => {
  it('should setup new active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new TestScene();

    expect(scene.setup).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(scene.setup).toHaveBeenCalledOnce();
  });

  it('should teardown current active scene when setting new active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new TestScene();

    sceneManager.setActiveScene(scene);

    expect(scene.teardown).not.toHaveBeenCalled();

    sceneManager.setActiveScene(scene);

    expect(scene.teardown).toHaveBeenCalledOnce();
  });

  it('should update active scene', () => {
    const sceneManager = new SceneManager();
    const scene = new TestScene();

    sceneManager.setActiveScene(scene);
    sceneManager.updateActiveScene(1);

    expect(scene.update).toHaveBeenCalledWith(1);
  });

  it('should load scene', async () => {
    vi.mock('/src/scenes/TestScene/TestScene', () => ({ default: TestScene }));

    const sceneManager = new SceneManager();
    const scene = await sceneManager.loadScene('TestScene');

    expect(scene instanceof TestScene).toBe(true);
  });
});
