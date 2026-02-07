import { Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { getGame } from 'game';
import { GraphicsNode2D } from './GraphicsNode2D';

const ERROR_SPRITE_SHEET_NAME_UNDEFINED = 'Sprite sheet name not defined';
const ERROR_SPRITE_SHEET_NOT_FOUND = 'Unable to retrieve sprite';
const ERROR_SPRITE_RECTANGLE_UNDEFINED = 'Sprite rectangle not defined';

export class Sprite2D extends GraphicsNode2D {
  /**
   * The file name of the sprite sheet image, including the file extension.
   */
  public spriteSheetName?: string;
  /**
   * The sprite's rectangle within the sprite sheet.
   */
  public spriteRectangle?: Rectangle;

  public get boundingBox() {
    if (!this.spriteRectangle) throw new Error(ERROR_SPRITE_RECTANGLE_UNDEFINED);

    const position = this.globalPosition;
    const size = Vector2D.multiply(this.globalScale, this.spriteRectangle.size);

    return new Rectangle(position.x, position.y, size.x, size.y);
  }

  public setup() {
    super.setup();

    const game = getGame();

    this.visible = false;

    if (!this.spriteSheetName) throw new Error(ERROR_SPRITE_SHEET_NAME_UNDEFINED);
    // If sprite sheet is already loaded, exit early.
    if (game.spriteSheetManager.get(this.spriteSheetName)) return;

    // Load sprite sheet.
    // TODO: If two different sprites use the same sprite sheet, the sprite sheet would be loaded
    // twice. A fix will be needed in order to ensure the same sprite sheet isn't loaded twice.
    game.taskManager.registerTask(game.spriteSheetManager.load(this.spriteSheetName), () => {
      this.visible = true;
    });
  }

  public render() {
    if (!this.spriteSheetName) throw new Error(ERROR_SPRITE_SHEET_NAME_UNDEFINED);
    if (!this.spriteRectangle) throw new Error(ERROR_SPRITE_RECTANGLE_UNDEFINED);

    const game = getGame();
    // Retrieve sprite sheet.
    const spriteSheet = game.spriteSheetManager.get(this.spriteSheetName);

    if (!spriteSheet) throw new Error(ERROR_SPRITE_SHEET_NOT_FOUND);

    // Parse sprite from sprite sheet.
    const sprite = spriteSheet.parseSprite(this.spriteRectangle);
    const size = Vector2D.multiply(this.globalScale, this.spriteRectangle.size);
    const canvas = new OffscreenCanvas(size.x, size.y);
    const ctx = getCanvasContext2D(canvas);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, 0, 0, size.x, size.y);

    return canvas.transferToImageBitmap();
  }
}
