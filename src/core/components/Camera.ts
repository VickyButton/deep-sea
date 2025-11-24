import { Rectangle } from '@core/entities/Rectangle';
import { Vector2D } from '@core/entities/Vector2D';
import { Node } from '../entities/Node';

export interface CameraConfiguration {
  position: Vector2D;
  size: Vector2D;
}

export class Camera {
  private readonly configuration: CameraConfiguration;
  private rectangle: Rectangle;

  constructor(configuration: CameraConfiguration) {
    this.configuration = configuration;
    this.rectangle = this.getDefaultRectangle();
  }

  /**
   * The position of the camera.
   */
  public get position() {
    return this.rectangle.position;
  }

  /**
   * The size of the camera.
   */
  public get size() {
    return this.rectangle.size;
  }

  /**
   * Resets the camera back to it's default state.
   */
  public reset() {
    this.rectangle = this.getDefaultRectangle();
  }

  /**
   * Sets the position of the camera.
   *
   * @param position The position in which the camera should center on.
   */
  public setPosition(position: Vector2D) {
    this.rectangle.position.set(position.x, position.y);
  }

  /**
   * Moves camera by specified distance.
   *
   * @param distance The distance to move the camera.
   */
  public move(distance: Vector2D) {
    const newPosition = Vector2D.add(this.rectangle.position, distance);

    this.rectangle.position.set(newPosition.x, newPosition.y);
  }

  /**
   * Returns a world position relative to the camera.
   *
   * @param position The world position.
   * @returns The world position relative to the camera.
   */
  public getPositionRelativeToCamera(position: Vector2D) {
    return Vector2D.subtract(position, this.rectangle.position);
  }

  /**
   * Determines if a given node is offscreen.
   *
   * @param node Node to check.
   * @returns True if node is offscreen, false if not.
   */
  public isOffScreen(node: Node<{ rectangle: Rectangle }>) {
    return !this.rectangle.overlaps(node.state.rectangle);
  }

  private getDefaultRectangle() {
    return new Rectangle(
      this.configuration.position.x,
      this.configuration.position.y,
      this.configuration.size.x,
      this.configuration.size.y,
    );
  }
}
