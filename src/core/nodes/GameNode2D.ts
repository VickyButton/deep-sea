import { Vector2D } from '@core/structures/Vector2D';
import { GameNode } from './GameNode';

/**
 * Manages position and scale in a 2D space.
 */
export class GameNode2D extends GameNode {
  /**
   * The position relative to the nearest GameNode2D parent.
   */
  public position = Vector2D.zero;
  /**
   * The scale relative to the nearest GameNode2D parent.
   */
  public scale = Vector2D.one;

  /**
   * The position relative to the global space.
   */
  public get globalPosition() {
    let position = this.position;

    this.traverseToRoot((node) => {
      if (node instanceof GameNode2D) position = Vector2D.add(position, node.position);
    });

    return position;
  }

  /**
   * The scale relative to the global space.
   */
  public get globalScale() {
    let scale = this.scale;

    this.traverseToRoot((node) => {
      if (node instanceof GameNode2D) scale = Vector2D.multiply(scale, node.scale);
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
}
