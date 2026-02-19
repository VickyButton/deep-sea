import { afterEach, describe, it, vi } from 'vitest';
import { useGame } from './game';

const config = {
  actions: {
    restartGame: 'p',
    toggleDebugMode: 'm',
  },
  assets: {
    audio: '',
    images: '',
    scripts: '',
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

vi.mock('input', () => ({
  useInput: () => ({
    attachListeners: vi.fn(),
    addKeypressEventListener: vi.fn(),
  }),
}));

vi.mock('scenes', () => ({
  useScenes: () => ({
    loadScene: vi.fn(),
    setActiveScene: vi.fn(),
  }),
}));

vi.mock('tasks', () => ({
  useTasks: () => ({
    registerTask: vi.fn().mockImplementation((_task: Promise<void>, callback: () => void) => {
      callback();
    }),
  }),
}));

// TODO: Rewrite Game unit tests after engine components have been decoupled.
describe('game', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should setup components and initial scene on setup', () => {
    const game = useGame();

    game.setup();
  });
});
