import { Vector2D } from '@core/entities/Vector2D';
import { Node } from '../entities/Node';
import { log } from '../utils/logger';

export interface CameraConfiguration {
  size: Vector2D;
}

interface CameraState {
  position: Vector2D;
  size: Vector2D;
}

type TargetNode = Node<{ position: Vector2D }>;
type TargetNodeWithBounds = Node<{
  position: Vector2D;
  size: Vector2D;
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
   * The position of the camera.
   */
  public get position() {
    return this.state.position;
  }

  /**
   * The size of the camera.
   */
  public get size() {
    return this.state.size;
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
    if (this.target) this.state.position.set(this.target.state.position);
  }

  /**
   * Sets the position of the camera.
   *
   * @param position The position in which the camera should center on.
   */
  public setPosition(position: Vector2D) {
    this.state.position.set(position);
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
   * Moves camera by specified distance.
   *
   * @param distance The distance to move the camera.
   */
  public move(distance: Vector2D) {
    this.position.add(distance);
  }

  /**
   * Returns a world position relative to the camera.
   *
   * @param position The world position.
   * @returns The world position relative to the camera.
   */
  public getPositionRelativeToCamera(position: Vector2D) {
    return new Vector2D(position.x - this.state.position.x, position.y - this.state.position.y);
  }

  /**
   * Determines if a given node is offscreen.
   *
   * @param node Node to check.
   * @returns True if node is offscreen, false if not.
   */
  public isOffScreen(node: TargetNodeWithBounds) {
    const cameraVertices = this.getRectangleVertices(this.state.position, this.state.size);
    const nodeVertices = this.getRectangleVertices(node.state.position, node.state.size);

    // If one rectangle is to the left of the other.
    if (cameraVertices.tl.x > nodeVertices.br.x || nodeVertices.tl.x > cameraVertices.br.x)
      return true;

    // If one rectangle is above the other.
    if (cameraVertices.br.y < nodeVertices.tl.y || nodeVertices.br.y < cameraVertices.tl.y)
      return true;

    return false;
  }

  private getRectangleVertices(center: Vector2D, size: Vector2D) {
    const halfSize = new Vector2D(size.x / 2, size.y / 2);

    const tl = new Vector2D(center.x - halfSize.x, center.y - halfSize.y);
    const tr = new Vector2D(center.x + halfSize.x, center.y - halfSize.y);
    const br = new Vector2D(center.x + halfSize.x, center.y + halfSize.y);
    const bl = new Vector2D(center.x - halfSize.x, center.y + halfSize.y);

    return { tl, tr, br, bl };
  }

  private getDefaultState() {
    return {
      position: new Vector2D(0, 0),
      size: new Vector2D(this.configuration.size.x, this.configuration.size.y),
    };
  }
}
