import type { SpriteSheet } from '@core/structures/SpriteSheet';
import { loadImage } from '@core/utils/loadImage';
import { loadJson } from '@core/utils/loadJson';
import { getConfig } from 'config';

abstract class AssetManager<T> {
  protected assets = new Map<string, T>();
  protected loadingAssets = new Set<string>();

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
  public abstract load(name: string): Promise<T | undefined>;
}

class ImageManager extends AssetManager<ImageBitmap> {
  public async load(name: string) {
    if (this.loadingAssets.has(name)) return;

    this.loadingAssets.add(name);

    try {
      const config = getConfig();
      const image = await loadImage(`${config.assets.images}/${name}.png`);

      this.loadingAssets.delete(name);
      this.assets.set(name, image);

      return image;
    } catch {
      this.loadingAssets.delete(name);

      throw new Error(`Unable to load image ${name}.png`);
    }
  }
}

class SpriteSheetManager extends AssetManager<SpriteSheet> {
  public async load(name: string) {
    if (this.loadingAssets.has(name)) return;

    this.loadingAssets.add(name);

    try {
      const config = getConfig();
      const spriteSheet = await loadJson(`${config.assets.spriteSheets}/${name}.json`);

      if (!this.isSpriteSheet(spriteSheet)) throw new Error('Invalid sprite sheet');

      this.loadingAssets.delete(name);
      this.assets.set(name, spriteSheet);

      return spriteSheet;
    } catch {
      this.loadingAssets.delete(name);

      throw new Error(`Unable to load sprite sheet ${name}.json`);
    }
  }

  private isSpriteSheet(value: unknown): value is SpriteSheet {
    return typeof value === 'object' && value !== null && 'rects' in value;
  }
}

const assets = {
  images: new ImageManager(),
  spriteSheets: new SpriteSheetManager(),
};

export function getAssets() {
  return assets;
}
