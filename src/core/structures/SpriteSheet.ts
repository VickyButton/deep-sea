import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { Rectangle } from './Rectangle';

const ERROR_INVALID_SPRITE_SHEET_RECTANGLE = 'Invalid sprite sheet rectangle';

export class SpriteSheet {
  private readonly image: ImageBitmap;

  constructor(image: ImageBitmap) {
    this.image = image;
  }

  public parseSprite(rectangle: Rectangle) {
    if (!this.isValidRectangle(rectangle)) throw new Error(ERROR_INVALID_SPRITE_SHEET_RECTANGLE);

    const canvas = new OffscreenCanvas(rectangle.width, rectangle.height);
    const ctx = getCanvasContext2D(canvas);
    const image = this.image;
    const sx = rectangle.x;
    const sy = rectangle.y;
    const sw = rectangle.width;
    const sh = rectangle.height;
    const dx = 0;
    const dy = 0;
    const dw = rectangle.width;
    const dh = rectangle.height;

    ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

    return canvas.transferToImageBitmap();
  }

  private isValidRectangle(rectangle: Rectangle) {
    const imageRectangle = new Rectangle(0, 0, this.image.width, this.image.height);

    // TODO: Create Rectangle.containsRectangle method and use here. An overlapping rectangle does
    // not equate to a valid rectangle here as it could potentially lie outside the image.
    return imageRectangle.overlaps(rectangle);
  }
}
