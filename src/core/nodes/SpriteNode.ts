import { getAssets } from '@core/engine/assets';
import { Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { getGame } from 'game';
import { GraphicsNode2D } from './GraphicsNode2D';

const ERROR_SPRITE_SHEET_NAME_UNDEFINED = 'Sprite sheet name not defined';
const ERROR_SPRITE_SHEET_NOT_FOUND = 'Unable to retrieve sprite';

export class SpriteNode extends GraphicsNode2D {
  /**
   * The file name of the sprite sheet image, including the file extension.
   */
  public spriteSheetName = '';
  /**
   * The sprite's rectangle within the sprite sheet.
   */
  public spriteRectangle = new Rectangle(0, 0, 0, 0);

  public get boundingBox() {
    const position = this.globalPosition;
    const size = Vector2D.multiply(this.globalScale, this.spriteRectangle.size);

    return new Rectangle(position.x, position.y, size.x, size.y);
  }

  public setup() {
    super.setup();

    const game = getGame();
    const assets = getAssets();

    this.visible = false;

    if (!this.spriteSheetName) throw new Error(ERROR_SPRITE_SHEET_NAME_UNDEFINED);
    // If sprite sheet is already loaded, exit early.
    if (assets.spriteSheets.get(this.spriteSheetName)) return;

    const load = Promise.all([
      assets.images.load(this.spriteSheetName),
      assets.spriteSheets.load(this.spriteSheetName),
    ]);

    // Load sprite sheet.
    // TODO: If two different sprites use the same sprite sheet, the sprite sheet would be loaded
    // twice. A fix will be needed in order to ensure the same sprite sheet isn't loaded twice.
    game.taskManager.registerTask(load, () => {
      this.visible = true;
    });
  }

  public render() {
    if (!this.spriteSheetName) throw new Error(ERROR_SPRITE_SHEET_NAME_UNDEFINED);

    const assets = getAssets();
    // Retrieve sprite sheet.
    const spriteSheet = assets.spriteSheets.get(this.spriteSheetName);

    if (!spriteSheet) throw new Error(ERROR_SPRITE_SHEET_NOT_FOUND);

    // Parse sprite from sprite sheet.
    const sprite = this.parseSprite();
    const size = Vector2D.multiply(this.globalScale, this.spriteRectangle.size);
    const canvas = new OffscreenCanvas(size.x, size.y);
    const ctx = getCanvasContext2D(canvas);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, 0, 0, size.x, size.y);

    return canvas.transferToImageBitmap();
  }

  private parseSprite() {
    const assets = getAssets();
    const image = assets.images.get(this.spriteSheetName);
    const spriteSheet = assets.spriteSheets.get(this.spriteSheetName);

    if (!image) throw new Error('Unable to retrieve sprite sheet image');
    if (!spriteSheet) throw new Error('Unable to retrieve sprite sheet');

    const canvas = new OffscreenCanvas(this.spriteRectangle.width, this.spriteRectangle.height);
    const ctx = getCanvasContext2D(canvas);

    ctx.drawImage(
      image,
      this.spriteRectangle.x,
      this.spriteRectangle.y,
      this.spriteRectangle.width,
      this.spriteRectangle.height,
      0,
      0,
      this.spriteRectangle.width,
      this.spriteRectangle.height,
    );

    return canvas.transferToImageBitmap();
  }

  public static create(spriteSheetName = '', spriteRectangle = new Rectangle(0, 0, 0, 0)) {
    const node = new SpriteNode();

    node.spriteSheetName = spriteSheetName;
    node.spriteRectangle = spriteRectangle;

    return node;
  }
}
