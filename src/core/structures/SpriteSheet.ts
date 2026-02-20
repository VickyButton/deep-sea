import { Rectangle } from './Shapes';

export interface SpriteSheetRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class SpriteSheet {
  private rects: Record<string, SpriteSheetRect>;

  constructor(rects: Record<string, SpriteSheetRect>) {
    this.rects = rects;
  }

  /**
   * Retrieves a sprite rectangle.
   * @param key The sprite rectangle key.
   * @returns The sprite rectangle.
   */
  public getRect(key: string) {
    const rect = this.rects[key];

    return new Rectangle(rect.x, rect.y, rect.width, rect.height);
  }
}
