import { loadImage } from '@core/utils/loadImage';
import { getConfig } from 'config';

class ImageManager {
  private images = new Map<string, ImageBitmap>();
  private loadingImages = new Set<string>();

  /**
   * Retrieves an image by name.
   * @param name The name of the image.
   */
  public get(name: string) {
    return this.images.get(name);
  }

  /**
   * Registers and stores an image by name.
   * @param name The name of the image.
   * @param image The image to store.
   */
  public set(name: string, image: ImageBitmap) {
    this.images.set(name, image);
  }

  /**
   * Deletes an image from storage.
   * @param name The name of the image to delete.
   */
  public delete(name: string) {
    this.images.delete(name);
  }

  /**
   * Loads and stores an image.
   * @param name The name of the image, without the file extension.
   * @returns The image, or undefined if not found.
   */
  public async load(name: string) {
    if (this.loadingImages.has(name)) return;

    this.loadingImages.add(name);

    try {
      const config = getConfig();
      const image = await loadImage(`${config.assets.images}/${name}.png`);

      this.loadingImages.delete(name);
      this.images.set(name, image);

      return image;
    } catch {
      this.loadingImages.delete(name);
    }
  }
}

const assets = {
  images: new ImageManager(),
};

export function getAssets() {
  return assets;
}
