import { Node } from '../entities/Node';
import { Point2D } from '../interfaces/Point2D';
import { log } from '../utils/logger';

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

const LOG_TAG = 'Camera';

export class Camera {
  private readonly configuration: CameraConfiguration;
  private state: CameraState;
  private target?: TargetNode;

  constructor(configuration: CameraConfiguration) {
    this.configuration = configuration;
    this.state = this.getDefaultState();
  }

  /**
   * The width of the camera.
   */
  public get width() {
    return this.state.width;
  }

  /**
   * The height of the camera.
   */
  public get height() {
    return this.state.height;
  }

  /**
   * The position of the camera.
   */
  public get position() {
    return this.state.position;
  }

  /**
   * Resets the camera back to it's default state.
   */
  public reset() {
    this.state = this.getDefaultState();
  }

  /**
   * Updates the camera's position if tracking a target.
   */
  public update() {
    if (this.target) this.state.position = this.target.state.position;
  }

  /**
   * Sets the position of the camera.
   *
   * @param position The position in which the camera should center on.
   */
  public setPosition(position: Point2D) {
    this.state.position = position;
  }

  /**
   * Sets a target node to follow.
   *
   * @param target The target node to follow.
   */
  public setTarget(target: TargetNode) {
    log(LOG_TAG, `Setting camera target: ${target.id}`);

    this.target = target;
  }

  /**
   * Returns a world position relative to the camera.
   *
   * @param position The world position.
   * @returns The world position relative to the camera.
   */
  public getPositionRelativeToCamera(position: Point2D) {
    return {
      x: position.x - this.state.position.x,
      y: position.y - this.state.position.y,
    };
  }

  /**
   * Determines if a given node is offscreen.
   *
   * @param node Node to check.
   * @returns True if node is offscreen, false if not.
   */
  public isOffScreen(node: TargetNodeWithBounds) {
    const cameraVertices = this.getRectangleVertices(
      this.state.position,
      this.state.width,
      this.state.height,
    );
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
