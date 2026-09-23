import type { ShapeNode2D_Options } from './ShapeNode2D';
import { ShapeNode2D } from './ShapeNode2D';
import { RGBA } from '../domain/colors/RGBA';

export class CollisionShapeNode2D extends ShapeNode2D {
  constructor(id: string, options?: ShapeNode2D_Options) {
    super(id, options);

    this.outlineColor = options?.outlineColor ?? RGBA.RED;
  }

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
