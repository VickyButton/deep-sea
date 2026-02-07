import { SpriteSheet } from '@core/structures/SpriteSheet';
import { loadImage } from '@core/utils/loadImage';
import { getConfig } from 'config';

export class SpriteSheetManager {
  private readonly spriteSheets = new Map<string, SpriteSheet>();

  /**
   * Registers a sprite sheet for global access.
   * @param name The name to register the sprite sheet as.
   * @param spriteSheet The sprite sheet being registered.
   */
  public set(name: string, spriteSheet: SpriteSheet) {
    this.spriteSheets.set(name, spriteSheet);
  }

  /**
   * Retrieves a registered sprite sheet.
   * @param name The name of the sprite sheet.
   * @returns The sprite sheet if found, undefined if not.
   */
  public get(name: string) {
    return this.spriteSheets.get(name);
  }

  /**
   * Loads sprite sheet image and creates and registers it as a sprite sheet.
   * @param name The file name of the sprite sheet image, including the file extension.
   * @returns The loaded sprite sheet.
   */
  public async load(name: string) {
    const config = getConfig();
    const image = await loadImage(`${config.assets.images}/${name}`);
    const spriteSheet = new SpriteSheet(image);

    this.spriteSheets.set(name, spriteSheet);

    return spriteSheet;
  }
}
