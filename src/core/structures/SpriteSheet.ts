interface SpriteSheetRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteSheet {
  rects: Record<string, SpriteSheetRect>;
}
