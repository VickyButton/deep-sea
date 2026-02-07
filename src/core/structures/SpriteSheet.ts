import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { Rectangle } from './Rectangle';

interface SpriteSheetQuad {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class SpriteSheet {
  private readonly image: ImageBitmap;

  constructor(image: ImageBitmap) {
    this.image = image;
  }

  public parseSprite(quad: SpriteSheetQuad) {
    if (!this.isValidQuad(quad)) throw new Error('Invalid sprite sheet quad');

    const canvas = new OffscreenCanvas(quad.width, quad.height);
    const ctx = getCanvasContext2D(canvas);
    const image = this.image;
    const sx = quad.x;
    const sy = quad.y;
    const sw = quad.width;
    const sh = quad.height;
    const dx = 0;
    const dy = 0;
    const dw = quad.width;
    const dh = quad.height;

    ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

    return canvas.transferToImageBitmap();
  }

  private isValidQuad(quad: SpriteSheetQuad) {
    const imageRectangle = new Rectangle(0, 0, this.image.width, this.image.height);
    const quadRectangle = new Rectangle(quad.x, quad.y, quad.width, quad.height);

    // TODO: Create Rectangle.containsRectangle method and use here. An overlapping quad does not
    // equate to a valid quad here as it could potentially lie outside the image.
    return imageRectangle.overlaps(quadRectangle);
  }
}
