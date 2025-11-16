import { Node } from './entities/Node';
import { Point2D } from './interfaces/Point2D';
import { log } from './utils/logger';

export interface CameraConfiguration {
  width: number;
  height: number;
}

interface CameraState {
  position: Point2D;
}

type TargetNode = Node<{ position: Point2D }>;

const CAMERA_LOG_TAG = 'Camera';
export class Camera {
  public state: CameraState;

  private readonly configuration: CameraConfiguration;
  private target?: TargetNode;

  constructor(configuration: CameraConfiguration) {
    this.configuration = configuration;
    this.state = this.getDefaultState();
  }

  public reset() {
    this.state = this.getDefaultState();
  }

  public update() {
    if (this.target) this.state.position = this.target.state.position;
  }

  public setPosition(position: Point2D) {
    this.state.position = position;
  }

  public setTarget(target: TargetNode) {
    log(CAMERA_LOG_TAG, `Setting camera target: ${target.id}`);

    this.target = target;
  }

  public getPositionRelativeToCamera(position: Point2D) {
    return {
      x: position.x - this.state.position.x,
      y: position.y - this.state.position.y,
    };
  }

  private getDefaultState() {
    return {
      position: {
        x: 0,
        y: 0,
      },
    };
  }
}
