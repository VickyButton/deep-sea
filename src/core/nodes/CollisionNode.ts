import { usePhysics } from 'physics';
import { GameNode } from './GameNode';

export class CollisionNode extends GameNode {
  /**
   * Callback for when a collision occurs involving this node.
   */
  public onCollision?: (collider: CollisionNode) => void;

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
