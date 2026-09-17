/**
 * Handles collision resolution between two shapes.
 */
export abstract class CollisionResolver {
  /**
   * Resolves a collision between two shapes.
   * @returns True if the shapes are colliding, false if not.
   */
  public abstract resolveCollision(): boolean;

  protected createUnableToResolveCollisionError() {
    return new Error('Unable to resolve collision for shape');
  }
}
