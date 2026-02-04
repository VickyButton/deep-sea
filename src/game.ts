import { Game } from '@core/Game';
import { Vector2D } from '@core/structures/Vector2D';

interface GameConfigRaw {
  initialSceneName: string;
  engine: {
    assetLoader: {
      imagesPath: string;
    };
    graphics: {
      size: {
        x: number;
        y: number;
      };
    };
    loop: {
      framesPerSecond: number;
    };
  };
}

async function loadGameConfig(path: string) {
  const config = (await import(path, {
    with: {
      type: 'json',
    },
  })) as unknown;

  // TODO: Implement game configuration schema validation.

  return config as GameConfigRaw;
}

/**
 * Loads the game configuration and creates a new game.
 * @param path The page of the game configuration JSON.
 * @returns The loaded game.
 */
export async function loadGame(path: string) {
  const config = await loadGameConfig(path);
  const game = new Game({
    initialSceneName: config.initialSceneName,
    engine: {
      assetLoader: config.engine.assetLoader,
      graphics: {
        size: new Vector2D(config.engine.graphics.size.x, config.engine.graphics.size.y),
      },
      loop: config.engine.loop,
    },
  });

  return game;
}

export function setGame(_game: Game) {
  game = _game;
}

export let game: Game;
