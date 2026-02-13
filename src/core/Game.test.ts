import { afterEach, describe, expect, it, vi } from 'vitest';
import { Game } from './Game';

const config = {
  actions: {
    restartGame: 'p',
    toggleDebugMode: 'm',
  },
  assets: {
    audio: '',
    images: '',
    spriteSheets: '',
  },
  content: {
    scenes: '',
  },
  dev: {
    autoStart: false,
    debugMode: false,
    printLogs: false,
  },
  game: {
    framesPerSecond: 1,
    splashScene: '',
  },
  graphics: {
    width: 1,
    height: 1,
  },
};

vi.mock('audio', () => ({
  getAudio: () => ({
    initialize: vi.fn(),
  }),
}));

vi.mock('config', () => ({
  getConfig: () => config,
}));

vi.mock('graphics', () => ({
  getGraphics: () => ({
    syncWithGameCanvas: vi.fn(),
  }),
}));

vi.mock('game', () => ({
  restartGame: vi.fn(),
}));

vi.mock('@core/engine/Audio', () => ({
  Audio: vi.fn(
    class {
      initialize = vi.fn();
    },
  ),
}));

vi.mock('@core/engine/InputController', () => ({
  InputController: vi.fn(
    class {
      addKeypressEventListener = vi.fn();
      attachListeners = vi.fn();
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

vi.mock('@core/engine/Physics2D', () => ({
  Physics2D: vi.fn(),
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

// TODO: Rewrite Game unit tests after engine components have been decoupled.
describe('Game', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should setup components and initial scene on setup', () => {
    const game = new Game();
    const loopSetLoopCallbackSpy = vi.spyOn(game.loop, 'setLoopCallback');
    const taskManagerRegisterTaskSpy = vi.spyOn(game.taskManager, 'registerTask');
    const sceneManagerLoadSceneSpy = vi.spyOn(game.sceneManager, 'loadScene');
    const sceneManagerSetActiveSceneSpy = vi.spyOn(game.sceneManager, 'setActiveScene');

    game.setup();

    expect(loopSetLoopCallbackSpy).toHaveBeenCalled();
    expect(taskManagerRegisterTaskSpy).toHaveBeenCalled();
    expect(sceneManagerLoadSceneSpy).toHaveBeenCalledWith(config.game.splashScene);
    expect(sceneManagerSetActiveSceneSpy).toHaveBeenCalled();
  });

  it('should start loop on start', () => {
    const game = new Game();
    const loopStartSpy = vi.spyOn(game.loop, 'start');

    game.start();

    expect(loopStartSpy).toHaveBeenCalled();
  });

  it('should stop loop on stop', () => {
    const game = new Game();
    const loopStopSpy = vi.spyOn(game.loop, 'stop');

    game.stop();

    expect(loopStopSpy).toHaveBeenCalled();
  });
});
