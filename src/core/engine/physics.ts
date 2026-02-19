import { CollisionNode } from '@nodes/CollisionNode';
import { ShapeNode2D } from '@nodes/ShapeNode2D';

class Physics2D {
  private nodes = new Set<CollisionNode>();

  /**
   * Registers a node to be considered for collision detection each frame.
   *
   * @param node The node to register.
   */
  public registerNode(node: CollisionNode) {
    this.nodes.add(node);
  }

  /**
   * Deregisters a node from consideration for collision detection each frame.
   *
   * @param node The node to deregister.
   */
  public deregisterNode(node: CollisionNode) {
    this.nodes.delete(node);
  }

  /**
   * Calculates potential collision pairs and checks them for collisions.
   */
  public update() {
    const collisionPairs = this.calculateCollisionPairs();

    for (const pair of collisionPairs) {
      const isColliding = this.checkCollision(...pair);

      if (isColliding) {
        if (pair[0].onCollision) pair[0].onCollision(pair[1]);
        if (pair[1].onCollision) pair[1].onCollision(pair[0]);
      }
    }
  }

  private calculateCollisionPairs() {
    // TODO: Implement quad trees for more efficient collision pairing.
    // Pair IDs are stored in order to prevent duplicate pairs from being added.
    const pairIds = new Set<string>();
    const pairs = new Set<[CollisionNode, CollisionNode]>();

    const generatePairId = (node1: CollisionNode, node2: CollisionNode) => {
      // Sort the node IDs for consistent ordering.
      const nodeIds = [node1.id, node2.id].sort((a, b) => a.localeCompare(b));

      return JSON.stringify(nodeIds);
    };

    for (const node of this.nodes) {
      const subset = new Set(this.nodes);

      subset.delete(node);

      for (const subsetNode of subset) {
        const pairId = generatePairId(node, subsetNode);

        if (pairIds.has(pairId)) continue;

        pairIds.add(pairId);
        pairs.add([node, subsetNode]);
      }
    }

    return pairs;
  }

  private checkCollision(base: CollisionNode, target: CollisionNode) {
    if (ShapeNode2D.isShapeNode2D(base.parent) && ShapeNode2D.isShapeNode2D(target.parent)) {
      return base.parent.shape.overlaps(target.parent.shape);
    }
  }
}

let physics = new Physics2D();

export function usePhysics() {
  return physics;
}

export function resetPhysics() {
  physics = new Physics2D();
}
