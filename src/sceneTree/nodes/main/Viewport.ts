import type { Camera2D } from '../2D/Camera2D';
import { Node } from './Node';

/** A node that acts as a scene's viewport. */
export class Viewport extends Node {
  private _camera: Camera2D | null = null;

  /** The viewport's camera or null if it has no camera. */
  public get camera() {
    return this._camera;
  }

  /**
   * Sets the viewport's camera.
   * @param camera The camera to set the viewport's camera to.
   */
  public setCamera(camera: Camera2D) {
    if (this.camera) {
      // Viewport already has a camera, unset it before setting new camera.
      this.unsetCamera();
    }

    // Add camera to children.
    this.addChild(camera);

    // Store camera reference.
    this._camera = camera;
  }

  /** Unsets the viewport's camera. */
  public unsetCamera() {
    if (!this.camera) {
      // No camera to unset, exit early.
      return;
    }

    // Remove camera from children.
    this.removeChild(this.camera);

    // Delete camera reference.
    this._camera = null;
  }
}
