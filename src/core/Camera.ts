import { Node } from './entities/Node';
import { Point2D } from './interfaces/Point2D';

export interface CameraConfiguration {
  width: number;
  height: number;
}

interface CameraState {
  position: Point2D;
}

type TargetNode = Node<{ position: Point2D }>;

export class Camera {
  private readonly configuration: CameraConfiguration;
  private state: CameraState;
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
    this.target = target;
  }

  public getDefaultState() {
    return {
      position: {
        x: 0,
        y: 0,
      },
    };
  }
}
