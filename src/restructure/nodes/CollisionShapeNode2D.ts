import type { ShapeNode2DEvents } from './ShapeNode2D';
import type { Color } from '../domain/colors';
import { ShapeNode2D } from './ShapeNode2D';
import { RGBA } from '../domain/colors/RGBA';

export class CollisionShapeNode2D<Events extends CollisionShapeNode2DEvents = CollisionShapeNode2DEvents> extends ShapeNode2D<Events> {
  public outlineColor: Color = RGBA.RED;

  /**
   * Checks if this node's collision shape is colliding with another node's collision shape.
   * @param node The node to check collision against.
   * @returns True if the the nodes' collision shapes are colliding, false if not.
   */
  public isCollidingWith(node: CollisionShapeNode2D) {
    return this.shape.isCollidingWith(this.globalTransform, node.shape, node.globalTransform);
  }

  public setup() {
    // TODO: Register in Physics Engine.
    super.setup();
  }
}

export type CollisionShapeNode2DEvents = ShapeNode2DEvents;
