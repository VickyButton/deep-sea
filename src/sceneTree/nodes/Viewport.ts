import { Camera2D } from './2D/Camera2D';
import { Node } from './Node';

/** A node that acts as a scene's viewport. */
export class Viewport extends Node {
  /** The viewport camera. */
  public readonly camera = Viewport.createCamera();

  private static createCamera() {
    return new Camera2D({
      id: 'VIEWPORT_CAMERA',
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      scale: {
        x: 1,
        y: 1,
      },
      visible: true,
      zIndex: 0,
    });
  }
}
