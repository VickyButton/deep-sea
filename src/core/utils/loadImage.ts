import { log } from './logger';

const LOG_TAG = 'loadImage';

/**
 * Loads image from specified path and returns it as a bitmap.
 * @param path The path of the image file.
 * @returns The image bitmap.
 */
export function loadImage(path: string) {
  return new Promise<ImageBitmap>((resolve, reject) => {
    const image = new Image();

    log(LOG_TAG, `Loading image at "${path}"...`);

    image.addEventListener('load', () => {
      resolve(createImageBitmap(image));
    });
    image.addEventListener('error', () => {
      reject(new Error(`Failed to load image at "${path}"`));
    });

    image.src = path;
  });
}
