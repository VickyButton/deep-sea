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
  public onSetup?: (scene: Scene) => void;
  /**
   * Callback for when scene is updated.
   */
  public onUpdate?: (scene: Scene, dt: number) => void;
  /**
   * Callback for when the scene is tore down.
   */
  public onTeardown?: (scene: Scene) => void;

  public setup() {
    this.setupCamera();

    if (this.onSetup) this.onSetup(this);

    super.setup();
  }

  public update(dt: number) {
    if (this.onUpdate) this.onUpdate(this, dt);
  }

  public teardown() {
    if (this.onTeardown) this.onTeardown(this);

    super.teardown();
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
