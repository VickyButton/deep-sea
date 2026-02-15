interface Config {
  actions: {
    restartGame: string;
    toggleDebugMode: string;
  };
  assets: {
    audio: string;
    images: string;
    scripts: string;
    spriteSheets: string;
  };
  content: {
    scenes: string;
  };
  dev: {
    autoStart: boolean;
    debugMode: boolean;
    printLogs: boolean;
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
    actions: {
      restartGame: 'p',
      toggleDebugMode: 'm',
    },
    assets: {
      audio: new URL('./assets/audio', import.meta.url).pathname,
      images: new URL('./assets/images', import.meta.url).pathname,
      scripts: new URL('./assets/scripts', import.meta.url).pathname,
      spriteSheets: new URL('./assets/spriteSheets', import.meta.url).pathname,
    },
    content: {
      scenes: new URL('./scenes', import.meta.url).pathname,
    },
    dev: {
      autoStart: false,
      debugMode: false,
      printLogs: false,
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
  const config = (await import(/* @vite-ignore */ path, {
    with: {
      type: 'json',
    },
  })) as unknown;

  // TODO: Implement config schema validation.

  return config as Config;
}

export function useConfig() {
  return config;
}

export function setConfig(_config: Config) {
  config = _config;
}

export function toggleDebugMode() {
  config.dev.debugMode = !config.dev.debugMode;
}
