import { Node } from './entities/Node';
import { Point2D } from './interfaces/Point2D';
import { log } from './utils/logger';

export interface CameraConfiguration {
  width: number;
  height: number;
}

interface CameraState {
  position: Point2D;
  width: number;
  height: number;
}

type TargetNode = Node<{ position: Point2D }>;
type TargetNodeWithBounds = Node<{
  position: Point2D;
  width: number;
  height: number;
}>;

const CAMERA_LOG_TAG = 'Camera';
export class Camera {
  public state: CameraState;

  private readonly configuration: CameraConfiguration;
  private target?: TargetNode;

  constructor(configuration: CameraConfiguration) {
    this.configuration = configuration;
    this.state = this.getDefaultState();
  }

  public get width() {
    return this.state.width;
  }

  public get height() {
    return this.state.height;
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

  public isOffScreen(node: TargetNodeWithBounds) {
    const cameraVertices = this.getRectangleVertices(this.state.position, this.width, this.height);
    const nodeVertices = this.getRectangleVertices(
      node.state.position,
      node.state.width,
      node.state.height,
    );

    // If one rectangle is to the left of the other.
    if (cameraVertices.tl.x > nodeVertices.br.x || nodeVertices.tl.x > cameraVertices.br.x)
      return true;

    // If one rectangle is above the other.
    if (cameraVertices.br.y < nodeVertices.tl.y || nodeVertices.br.y < cameraVertices.tl.y)
      return true;

    return false;
  }

  private getRectangleVertices(center: Point2D, width: number, height: number) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const tl = {
      x: center.x - halfWidth,
      y: center.y - halfHeight,
    };
    const tr = {
      x: center.x + halfWidth,
      y: center.y - halfHeight,
    };
    const br = {
      x: center.x + halfWidth,
      y: center.y + halfHeight,
    };
    const bl = {
      x: center.x - halfWidth,
      y: center.y + halfHeight,
    };

    return { tl, tr, br, bl };
  }

  private getDefaultState() {
    return {
      position: {
        x: 0,
        y: 0,
      },
      width: this.configuration.width,
      height: this.configuration.height,
    };
  }
}
