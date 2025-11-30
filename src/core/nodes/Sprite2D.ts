import { Rectangle } from '@core/structures/Rectangle';
import { Vector2D } from '@core/structures/Vector2D';
import { game } from 'game';
import { RenderableNode2D } from './RenderableNode2D';

export class Sprite2D extends RenderableNode2D {
  /**
   * The path of the sprite's sprite sheet image.
   */
  public spriteSheetImagePath?: string;
  /**
   * The top-left corner position of the sprite in the sprite sheet image.
   */
  public spritePosition?: Vector2D;
  /**
   * The size of the sprite in the sprite sheet image.
   */
  public spriteSize?: Vector2D;
  /**
   * The parsed sprite from the sprite sheet image.
   */
  private sprite?: ImageBitmap;

  public setup() {
    this.isVisible = false;

    game.taskManager.registerTask(this.loadSprite(), (sprite) => {
      this.sprite = sprite;
      this.isVisible = true;
    });
  }

  public render() {
    if (!this.sprite) throw new Error(`Unable to render sprite ${this.id}`);

    return this.sprite;
  }

  private async loadSprite() {
    const spriteSheetImage = await this.loadSpriteSheetImage();

    return this.parseSpriteFromSpriteSheet(spriteSheetImage);
  }

  private loadSpriteSheetImage() {
    if (!this.spriteSheetImagePath) throw new Error(`Image path not defined for sprite ${this.id}`);

    return game.assetLoader.loadImage(this.spriteSheetImagePath);
  }

  private parseSpriteFromSpriteSheet(spriteSheetImage: HTMLImageElement) {
    if (!this.spriteSize) throw new Error(`Sprite size not defined for sprite ${this.id}`);
    if (!this.spritePosition) throw new Error(`Sprite position not defined for sprite ${this.id}`);

    const spriteSheetImageRectangle = new Rectangle(
      0,
      0,
      spriteSheetImage.width,
      spriteSheetImage.height,
    );
    const spriteRectangle = new Rectangle(
      this.spritePosition.x,
      this.spritePosition.y,
      this.spriteSize.x,
      this.spriteSize.y,
    );

    // Verify that provided sprite parse instructions are valid.
    if (!spriteSheetImageRectangle.overlaps(spriteRectangle))
      throw new Error('Invalid sprite parse instructions');

    const canvas = new OffscreenCanvas(this.spriteSize.x, this.spriteSize.y);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Unable to get rendering context');

    context.drawImage(
      spriteSheetImage,
      this.spritePosition.x,
      this.spritePosition.y,
      this.spriteSize.x,
      this.spriteSize.y,
      0,
      0,
      this.spriteSize.x,
      this.spriteSize.y,
    );

    return canvas.transferToImageBitmap();
  }
}
