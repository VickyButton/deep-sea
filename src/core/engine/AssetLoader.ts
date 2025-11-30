import { log } from '@core/utils/logger';

export interface AssetLoaderConfiguration {
  imagesPath: string;
}

const LOG_TAG = 'AssetLoader';

export class AssetLoader {
  private readonly configuration: AssetLoaderConfiguration;

  constructor(configuration: AssetLoaderConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Loads an image asset.
   *
   * @param imagePath The file path of the image relative to the image assets path and including the file extension.
   * @returns The loaded image asset.
   */
  public loadImage(imagePath: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const url = `${this.configuration.imagesPath}/${imagePath}`;
      const image = new Image();

      log(LOG_TAG, `Loading image at ${url}...`);

      image.addEventListener('load', () => {
        resolve(image);
      });
      image.addEventListener('error', () => {
        reject(new Error(`Failed to load image at ${url}`));
      });

      image.src = url;
    });
  }
}
