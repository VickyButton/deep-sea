import { usePhysics } from 'physics';
import { GameNode } from './GameNode';

export class CollisionNode2D extends GameNode {
  /**
   * Callback for when a collision occurs involving this node.
   */
  public onCollision?: (collider: CollisionNode2D) => void;

  public setup() {
    super.setup();

    const physics = usePhysics();

    physics.registerNode(this);
  }

  public teardown() {
    super.teardown();

    const physics = usePhysics();

    physics.deregisterNode(this);
  }
}
