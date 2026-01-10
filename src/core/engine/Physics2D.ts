import { Circle2D } from '@core/nodes/Circle2D';
import { CollisionNode2D } from '@core/nodes/CollisionNode2D';
import { Rectangle2D } from '@core/nodes/Rectangle2D';

export class Physics2D {
  private nodes = new Set<CollisionNode2D>();

  /**
   * Registers a node to be considered for collision detection each frame.
   *
   * @param node The node to register.
   */
  public registerNode(node: CollisionNode2D) {
    this.nodes.add(node);
  }

  /**
   * Deregisters a node from consideration for collision detection each frame.
   *
   * @param node The node to deregister.
   */
  public deregisterNode(node: CollisionNode2D) {
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
        pair[0].onCollision();
        pair[1].onCollision();
      }
    }
  }

  private calculateCollisionPairs() {
    // TODO: Implement quad trees for more efficient collision pairing.
    // Pair IDs are stored in order to prevent duplicate pairs from being added.
    const pairIds = new Set<string>();
    const pairs = new Set<[CollisionNode2D, CollisionNode2D]>();

    const generatePairId = (node1: CollisionNode2D, node2: CollisionNode2D) => {
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

  private checkCollision(base: CollisionNode2D, target: CollisionNode2D) {
    switch (true) {
      case Circle2D.isCircle2D(base.parent):
        return this.checkCollisionWithCircleBase(base.parent, target);
      case Rectangle2D.isRectangle2D(base.parent):
        return this.checkCollisionWithRectangleBase(base.parent, target);
    }
  }

  private checkCollisionWithCircleBase(base: Circle2D, target: CollisionNode2D) {
    switch (true) {
      case Circle2D.isCircle2D(target.parent):
        return base.circle.overlaps(target.parent.circle);
      case Rectangle2D.isRectangle2D(target.parent):
        return false; // TODO: Implement collision detection for circle-rectangle pairs.
    }
  }

  private checkCollisionWithRectangleBase(base: Rectangle2D, target: CollisionNode2D) {
    switch (true) {
      case Circle2D.isCircle2D(target.parent):
        return false; // TODO: Implement collision detection for circle-rectangle pairs.
      case Rectangle2D.isRectangle2D(target.parent):
        return base.rectangle.overlaps(target.parent.rectangle);
    }
  }

  // TODO: Implement collision detection for circle-rectangle pairs.
}
