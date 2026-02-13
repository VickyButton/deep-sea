import { getRenderer } from '@core/engine/renderer';
import { CameraNode2D } from './CameraNode2D';
import { GameNode } from './GameNode';

export abstract class Scene extends GameNode {
  public abstract readonly title: string;
  public camera = new CameraNode2D();

  public setup(): void {
    super.setup();

    this.setupCamera();
  }

  private setupCamera() {
    const renderer = getRenderer();

    renderer.setActiveCamera(this.camera);
    this.addChild(this.camera);
  }
}
