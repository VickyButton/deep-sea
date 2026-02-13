/**
 * Retrieves a 2D context from a canvas or throws an error if unable to.
 * @param canvas The canvas to retrieve the context from.
 * @returns The canvas context.
 */
export function getCanvasContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
export function getCanvasContext2D(canvas: OffscreenCanvas): OffscreenCanvasRenderingContext2D;
export function getCanvasContext2D(canvas: HTMLCanvasElement | OffscreenCanvas) {
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Unable to get canvas context');

  return ctx;
}
