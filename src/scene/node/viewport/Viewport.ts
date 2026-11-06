import { Camera2D } from '../camera2D/Camera2D';
import { NodeBase } from '../nodeBase/NodeBase';

/** A node that acts as a scene's viewport. */
export class Viewport extends NodeBase {
  /** The viewport camera. */
  public readonly camera = Viewport.createCamera();

  private static createCamera() {
    return new Camera2D({
      id: 'VIEWPORT_CAMERA',
    });
  }
}
