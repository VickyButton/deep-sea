import { useGame } from 'game';
import { GameNode } from './GameNode';

export class CollisionNode2D extends GameNode {
  /**
   * Callback for when a collision occurs involving this node.
   */
  public onCollision?: (collider: CollisionNode2D) => void;

  public setup() {
    super.setup();

    const game = useGame();

    game.physics.registerNode(this);
  }

  public teardown() {
    super.teardown();

    const game = useGame();

    game.physics.deregisterNode(this);
  }
}
