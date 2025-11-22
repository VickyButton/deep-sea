import { afterEach, describe, expect, it, vi } from 'vitest';
import { Game } from './Game';

const configuration = {
  camera: {
    width: 1,
    height: 1,
  },
  graphics: {
    width: 1,
    height: 1,
  },
  loop: {
    framesPerSecond: 1,
  },
};

vi.mock('./components/Audio', () => ({
  Audio: vi.fn(),
}));

vi.mock('./components/Graphics', () => ({
  Graphics: vi.fn(
    class {
      setup = vi.fn();
    },
  ),
}));

vi.mock('./components/Loop', () => ({
  Loop: vi.fn(
    class {
      setup = vi.fn();
      start = vi.fn();
      stop = vi.fn();
    },
  ),
}));

vi.mock('./components/SceneManager', () => ({
  SceneManager: vi.fn(
    class {
      loadScene = vi.fn();
      setActiveScene = vi.fn();
    },
  ),
}));

vi.mock('./components/TaskManager', () => ({
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
    const graphicsSetupSpy = vi.spyOn(game.graphics, 'setup');
    const loopSetupSpy = vi.spyOn(game.loop, 'setup');
    const taskManagerRegisterTaskSpy = vi.spyOn(game.taskManager, 'registerTask');
    const sceneManagerSetActiveScene = vi.spyOn(game.sceneManager, 'setActiveScene');

    game.setup('scene');

    expect(graphicsSetupSpy).toHaveBeenCalled();
    expect(loopSetupSpy).toHaveBeenCalled();
    expect(taskManagerRegisterTaskSpy).toHaveBeenCalled();
    expect(sceneManagerSetActiveScene).toHaveBeenCalled();
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
