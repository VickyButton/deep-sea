/** Resolves a collision between two 2D shapes. */
export abstract class CollisionResolver2D {
  /**
   * Resolves a collision between two shapes.
   * @returns True if the shapes are colliding, false if not.
   */
  public abstract resolveCollision(): boolean;

  protected createUnableToResolveCollisionError() {
    return new Error('Unable to resolve collision between shapes.');
  }
}
