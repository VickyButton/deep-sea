import { Vector2D } from '@core/structures/Vector2D';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Game } from './Game';

const configuration = {
  initialSceneName: '',
  camera: {
    position: new Vector2D(0, 0),
    size: new Vector2D(1, 1),
  },
  graphics: {
    size: new Vector2D(1, 1),
  },
  loop: {
    framesPerSecond: 1,
  },
};

vi.mock('@core/engine/Audio', () => ({
  Audio: vi.fn(),
}));

vi.mock('@core/engine/Graphics', () => ({
  Graphics: vi.fn(
    class {
      syncWithTargetCanvas = vi.fn();
    },
  ),
}));

vi.mock('@core/engine/Loop', () => ({
  Loop: vi.fn(
    class {
      setLoopCallback = vi.fn();
      start = vi.fn();
      stop = vi.fn();
    },
  ),
}));

vi.mock('@core/engine/SceneManager', () => ({
  SceneManager: vi.fn(
    class {
      loadScene = vi.fn();
      setActiveScene = vi.fn();
    },
  ),
}));

vi.mock('@core/engine/TaskManager', () => ({
  TaskManager: vi.fn(
    class {
      registerTask = vi.fn().mockImplementation((_task: Promise<void>, callback: () => void) => {
        callback();
      });
    },
  ),
}));

describe('Game', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should setup components and initial scene on setup', () => {
    const game = new Game(configuration);
    const graphicsSetupSpy = vi.spyOn(game.graphics, 'syncWithTargetCanvas');
    const loopSetLoopCallbackSpy = vi.spyOn(game.loop, 'setLoopCallback');
    const taskManagerRegisterTaskSpy = vi.spyOn(game.taskManager, 'registerTask');
    const sceneManagerLoadSceneSpy = vi.spyOn(game.sceneManager, 'loadScene');
    const sceneManagerSetActiveSceneSpy = vi.spyOn(game.sceneManager, 'setActiveScene');

    game.setup();

    expect(graphicsSetupSpy).toHaveBeenCalled();
    expect(loopSetLoopCallbackSpy).toHaveBeenCalled();
    expect(taskManagerRegisterTaskSpy).toHaveBeenCalled();
    expect(sceneManagerLoadSceneSpy).toHaveBeenCalledWith(configuration.initialSceneName);
    expect(sceneManagerSetActiveSceneSpy).toHaveBeenCalled();
  });

  it('should start loop on start', () => {
    const game = new Game(configuration);
    const loopStartSpy = vi.spyOn(game.loop, 'start');

    game.start();

    expect(loopStartSpy).toHaveBeenCalled();
  });

  it('should stop loop on stop', () => {
    const game = new Game(configuration);
    const loopStopSpy = vi.spyOn(game.loop, 'stop');

    game.stop();

    expect(loopStopSpy).toHaveBeenCalled();
  });
});
