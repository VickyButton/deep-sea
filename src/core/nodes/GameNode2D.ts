import { GameNode } from '@core/entities/GameNode';
import { Vector2D } from '@core/structures/Vector2D';

/**
 * Manages position, rotation, and scale in a 2D space.
 */
export class GameNode2D extends GameNode {
  /**
   * The position relative to the nearest GameNode2D parent.
   */
  public position = Vector2D.zero;
  /**
   * The rotation, in radians, relative to the nearest GameNode2D parent.
   */
  public rotation = Vector2D.zero;
  /**
   * The scale relative to the nearest GameNode2D parent.
   */
  public scale = Vector2D.one;

  /**
   * The position relative to the global space.
   */
  public get globalPosition() {
    let position = this.position;

    this.traverseToRoot((gameNode) => {
      if (gameNode instanceof GameNode2D) position = Vector2D.add(position, gameNode.position);
    });

    return position;
  }

  /**
   * The rotation, in radians, relative to the global space.
   */
  public get globalRotation() {
    let rotation = this.rotation;

    this.traverseToRoot((gameNode) => {
      if (gameNode instanceof GameNode2D) rotation = Vector2D.add(rotation, gameNode.rotation);
    });

    return rotation;
  }

  /**
   * The scale relative to the global space.
   */
  public get globalScale() {
    let scale = this.scale;

    this.traverseToRoot((gameNode) => {
      if (gameNode instanceof GameNode2D) scale = Vector2D.multiply(scale, gameNode.scale);
    });

    return scale;
  }

  /**
   * Moves the node by specified distance.
   *
   * @param distance The distance to move.
   */
  public move(distance: Vector2D) {
    const newPosition = Vector2D.add(this.position, distance);

    this.position = newPosition;
  }

  /**
   * Rotates the node by specified radians.
   *
   * @param radians The amount of radians to rotate.
   */
  public rotate(radians: Vector2D) {
    const newRotation = Vector2D.add(this.rotation, radians);

    this.rotation = newRotation;
  }
}
