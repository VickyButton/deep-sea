interface Config {
  assets: {
    images: string;
  };
  game: {
    framesPerSecond: number;
    splashScene: string;
  };
  graphics: {
    width: number;
    height: number;
  };
}

let config = defaultConfig();

function defaultConfig(): Config {
  return {
    assets: {
      images: new URL('./assets/images', import.meta.url).pathname,
    },
    game: {
      framesPerSecond: 60,
      splashScene: 'SplashScene',
    },
    graphics: {
      width: 1920,
      height: 1080,
    },
  };
}

/**
 * Loads the game config.
 * @param path The path of the config JSON.
 * @returns The loaded config.
 */
export async function loadConfig(path: string) {
  const config = (await import(path, {
    with: {
      type: 'json',
    },
  })) as unknown;

  // TODO: Implement config schema validation.

  return config as Config;
}

export function getConfig() {
  return config;
}

export function setConfig(_config: Config) {
  config = _config;
}
