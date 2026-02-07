/**
 * Retrieves a 2D context from a canvas or throws an error if unable to.
 * @param canvas The canvas to retrieve the context from.
 * @returns The canvas context.
 */
export function getCanvasContext2D(canvas: OffscreenCanvas) {
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Unable to get canvas context');

  return ctx;
}
