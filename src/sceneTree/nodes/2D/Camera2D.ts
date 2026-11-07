import type { Camera2DOptions } from './Camera2D.types';
import { Node2D } from './Node2D';
import { clamp } from '../../../utils/clamp';

/** A camera for viewing other nodes with. */
export class Camera2D extends Node2D {
  private _zoom: number;

  /**
   * Creates a new Camera2D instance.
   * @param options The options for the new Camera2D.
   */
  constructor(options: Camera2DOptions) {
    super(options);

    this._zoom = options.zoom ?? Camera2D.ZOOM_DEFAULT;
  }

  /** The camera's zoom level. The higher the zoom level, the more zoomed out the camera is. */
  public get zoom() {
    return this._zoom;
  }

  /**
   * Sets the camera's zoom level. The zoom level will be clamped to the allowed zoom level range.
   * @param zoom The zoom level to set the camera's zoom level to.
   */
  public set zoom(zoom: number) {
    this._zoom = this.clampZoom(zoom);
  }

  private clampZoom(value: number) {
    return clamp(value, Camera2D.ZOOM_MINIMUM, Camera2D.ZOOM_MAXIMUM);
  }

  private static readonly ZOOM_DEFAULT = 1;
  private static readonly ZOOM_MAXIMUM = 10; // TODO: Make adjustable via engine config.
  private static readonly ZOOM_MINIMUM = 1; // TODO: Make adjustable via engine config.
}
