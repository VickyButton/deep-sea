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
  useAudio: () => ({
    initialize: vi.fn(),
  }),
}));

vi.mock('config', () => ({
  useConfig: () => config,
}));

vi.mock('graphics', () => ({
  useGraphics: () => ({
    syncWithGameCanvas: vi.fn(),
  }),
}));

vi.mock('game', () => ({
  restartGame: vi.fn(),
}));

vi.mock('input', () => ({
  useInput: () => ({
    attachListeners: vi.fn(),
    addKeypressEventListener: vi.fn(),
  }),
}));

vi.mock('@core/engine/Audio', () => ({
  Audio: vi.fn(
    class {
      initialize = vi.fn();
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
    const taskManagerRegisterTaskSpy = vi.spyOn(game.taskManager, 'registerTask');
    const sceneManagerLoadSceneSpy = vi.spyOn(game.sceneManager, 'loadScene');
    const sceneManagerSetActiveSceneSpy = vi.spyOn(game.sceneManager, 'setActiveScene');

    game.setup();

    expect(taskManagerRegisterTaskSpy).toHaveBeenCalled();
    expect(sceneManagerLoadSceneSpy).toHaveBeenCalledWith(config.game.splashScene);
    expect(sceneManagerSetActiveSceneSpy).toHaveBeenCalled();
  });
});
