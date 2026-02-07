export function getCanvasContext2D(canvas: OffscreenCanvas) {
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Unable to get canvas context');

  return ctx;
}
