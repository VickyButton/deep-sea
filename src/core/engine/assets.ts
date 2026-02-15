import { SpriteSheet, SpriteSheetRect } from '@core/structures/SpriteSheet';
import { loadImage } from '@core/utils/loadImage';
import { loadJson } from '@core/utils/loadJson';
import { log } from '@core/utils/logger';
import { useConfig } from 'config';

const LOG_TAG = 'assets';

abstract class AssetManager<T> {
  protected assets = new Map<string, T>();
  protected assetTasks = new Map<string, Promise<T>>();

  /**
   * Retrieves asset from storage.
   * @param key The asset key.
   * @returns The asset if found, undefined if not.
   */
  public get(key: string) {
    return this.assets.get(key);
  }

  /**
   * Stores an asset.
   * @param key The asset key.
   * @param value The asset to store.
   */
  public set(key: string, value: T) {
    this.assets.set(key, value);
  }

  /**
   * Deletes an asset from storage.
   * @param key The asset key.
   */
  public delete(key: string) {
    this.assets.delete(key);
  }

  /**
   * Loads and stores an asset.
   * @param name The asset name.
   * @returns The asset if loaded, undefined if not.
   */
  public abstract load(name: string): Promise<T>;
}

class ImageManager extends AssetManager<ImageBitmap> {
  public async load(name: string) {
    const activeTask = this.assetTasks.get(name);

    if (activeTask) return activeTask;

    const config = useConfig();
    const url = `${config.assets.images}/${name}.png`;

    try {
      const loadAsset = loadImage(url);

      this.assetTasks.set(name, loadAsset);

      log(LOG_TAG, `Loading image from "${url}"...`);

      const asset = await loadAsset;

      this.assetTasks.delete(name);
      this.assets.set(name, asset);

      return asset;
    } catch {
      this.assetTasks.delete(name);

      throw new Error(`Unable to load image from "${url}"`);
    }
  }
}

class SpriteSheetManager extends AssetManager<SpriteSheet> {
  public async load(name: string) {
    const activeTask = this.assetTasks.get(name);

    if (activeTask) return activeTask;

    const config = useConfig();
    const url = `${config.assets.spriteSheets}/${name}.json`;

    try {
      const loadSpriteSheet = async () => {
        const assetConfig = await loadJson(url);

        if (!this.isSpriteSheetConfig(assetConfig)) throw new Error('Invalid sprite sheet config');

        return new SpriteSheet(assetConfig.rects);
      };
      const loadAsset = loadSpriteSheet();

      this.assetTasks.set(name, loadAsset);

      log(LOG_TAG, `Loading sprite sheet from "${url}"...`);

      const asset = await loadAsset;

      this.assetTasks.delete(name);
      this.assets.set(name, asset);

      return asset;
    } catch {
      this.assetTasks.delete(name);

      throw new Error(`Unable to load sprite sheet from "${url}"`);
    }
  }

  private isSpriteSheetConfig(value: unknown): value is { rects: Record<string, SpriteSheetRect> } {
    return typeof value === 'object' && value !== null && 'rects' in value;
  }
}

let assets = {
  images: new ImageManager(),
  spriteSheets: new SpriteSheetManager(),
};

export function getAssets() {
  return assets;
}

export function resetAssets() {
  assets = {
    images: new ImageManager(),
    spriteSheets: new SpriteSheetManager(),
  };
}
