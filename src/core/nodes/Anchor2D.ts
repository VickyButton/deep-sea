import { GameNode } from '@core/entities/GameNode';
import { Vector2D } from '@core/structures/Vector2D';

interface Anchor2DState {
  position: Vector2D;
  rotation: Vector2D;
  scale: Vector2D;
}

/**
 * Manages position, rotation, and scale in a 2D space.
 */
export class Anchor2D extends GameNode {
  public state: Anchor2DState = this.getDefaultState();

  /**
   * Updates the node's position.
   *
   * @param position The node's new position.
   */
  public setPosition(position: Vector2D) {
    this.state.position.set(position.x, position.y);
  }

  /**
   * Moves the node by specified distance.
   *
   * @param distance The distance to move.
   */
  public move(distance: Vector2D) {
    const newPosition = Vector2D.add(this.state.position, distance);

    this.state.position = newPosition;
  }

  /**
   * Updates the node's rotation.
   *
   * @param rotation The node's new rotation.
   */
  public setRotation(rotation: Vector2D) {
    this.state.rotation.set(rotation.x, rotation.y);
  }

  /**
   * Rotates the node by specified radians.
   *
   * @param radians The amount of radians to rotate.
   */
  public rotate(radians: Vector2D) {
    const newRotation = Vector2D.add(this.state.rotation, radians);

    this.state.rotation = newRotation;
  }

  /**
   * Updates the node's scale.
   *
   * @param scale The node's new scale.
   */
  public setScale(scale: Vector2D) {
    this.state.scale.set(scale.x, scale.y);
  }

  /**
   * Scales the node by specified value.
   *
   * @param scale The amount of scaling to multiply by.
   */
  public scale(scale: Vector2D) {
    const newScale = Vector2D.multiply(this.state.scale, scale);

    this.state.scale = newScale;
  }

  private getDefaultState() {
    return {
      position: Vector2D.zero,
      rotation: Vector2D.zero,
      scale: Vector2D.one,
    };
  }
}
