import { Vector2D } from '@structures/Vector2D';
import { GameNode } from './GameNode';
import { GameNode2D } from './GameNode2D';

export class VelocityNode2D extends GameNode {
  /**
   * The node velocity in pixels/ms
   */
  public velocity = Vector2D.zero;

  public update(dt: number) {
    if (!GameNode2D.isGameNode2D(this.parent)) return;

    this.parent.move(this.calculateMoveDistance(dt));
  }

  private calculateMoveDistance(dt: number) {
    return Vector2D.multiply(this.velocity, new Vector2D(dt, dt));
  }
}
