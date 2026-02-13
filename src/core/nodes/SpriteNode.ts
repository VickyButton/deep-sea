import { Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { getAssets } from 'assets';
import { useGame } from 'game';
import { useGraphics } from 'graphics';
import { useRenderer } from 'renderer';
import { GraphicsNode2D } from './GraphicsNode2D';

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

    const game = useGame();
    const assets = getAssets();

    this.visible = false;

    // If sprite sheet is already loaded, exit early.
    if (assets.spriteSheets.get(this.spriteSheetName)) return;

    const load = Promise.all([
      assets.images.load(this.spriteSheetName),
      assets.spriteSheets.load(this.spriteSheetName),
    ]);

    game.taskManager.registerTask(load, () => {
      this.visible = true;
    });
  }

  public draw() {
    const assets = getAssets();
    const graphics = useGraphics();
    const renderer = useRenderer();
    const image = assets.images.get(this.spriteSheetName);

    if (!image) throw new Error('Unable to retrieve sprite sheet image');

    const drawPosition = renderer.getActiveCamera().calculateRelativePosition(this.globalPosition);
    const drawSize = Vector2D.multiply(this.globalScale, this.spriteRectangle.size);
    const sx = this.spriteRectangle.x;
    const sy = this.spriteRectangle.y;
    const sw = this.spriteRectangle.width;
    const sh = this.spriteRectangle.height;
    const dx = drawPosition.x;
    const dy = drawPosition.y;
    const dw = drawSize.x;
    const dh = drawSize.y;

    graphics.enableImageSmoothing();
    graphics.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    graphics.disableImageSmoothing();
  }

  public static create(spriteSheetName = '', spriteRectangle = new Rectangle(0, 0, 0, 0)) {
    const node = new SpriteNode();

    node.spriteSheetName = spriteSheetName;
    node.spriteRectangle = spriteRectangle;

    return node;
  }
}
