import { useRenderer } from 'renderer';
import { CameraNode2D } from './CameraNode2D';
import { GameNode } from './GameNode';

export class Scene extends GameNode {
  /**
   * The title of the scene.
   */
  public title = '';
  /**
   * The scene camera.
   */
  public camera = new CameraNode2D();
  /**
   * Callback for when the scene is set up.
   */
  public onSetup?: () => void;

  public setup(): void {
    super.setup();
    this.setupCamera();

    if (this.onSetup) this.onSetup();
  }

  private setupCamera() {
    const renderer = useRenderer();

    renderer.setActiveCamera(this.camera);
    this.addChild(this.camera);
  }

  public static create(title: string) {
    const node = new Scene();

    node.title = title;

    return node;
  }
}
