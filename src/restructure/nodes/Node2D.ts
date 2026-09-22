import type { GraphicsNode_Options } from './GraphicsNode';
import type { Node } from './Node';
import { GraphicsNode } from './GraphicsNode';
import { Transform2D } from '../domain/Transform2D';
import { Vector2D } from '../domain/Vector2D';

/**
 * A node which can be used in a 2D plane.
 */
export class Node2D extends GraphicsNode {
  /** The node's position relative to its parent. */
  public position: Vector2D;
  /** The node's scale relative to its parent. */
  public scale: Vector2D;
  /** The node's rotation, in radians, relative to its parent. */
  public rotation: number;

  constructor(id: string, options?: Node2D_Options) {
    super(id, options);

    this.position = options?.position ?? new Vector2D(0, 0);
    this.scale = options?.scale ?? new Vector2D(1, 1);
    this.rotation = options?.rotation ?? 0;
  }

  /** The node's transform matrix relative to its parent. */
  public get transform() {
    return new Transform2D({
      translation: this.position,
      scale: this.scale,
      rotation: this.rotation,
    });
  }

  /** The node's position relative to the root node. */
  public get globalPosition(): Vector2D {
    const closestNode2DAncestor = this.getClosestNode2DAncestor();

    return closestNode2DAncestor ? closestNode2DAncestor.globalPosition.add(this.position) : this.position;
  }

  /** The node's scale relative to the root node. */
  public get globalScale(): Vector2D {
    const closestNode2DAncestor = this.getClosestNode2DAncestor();

    return closestNode2DAncestor ? closestNode2DAncestor.globalScale.multiply(this.scale) : this.scale;
  }

  /** The node's rotation relative to the root node. */
  public get globalRotation(): number {
    const closestNode2DAncestor = this.getClosestNode2DAncestor();

    return closestNode2DAncestor ? closestNode2DAncestor.globalRotation + this.rotation : this.rotation;
  }

  /** The node's transform relative to the root node. */
  public get globalTransform(): Transform2D {
    return new Transform2D({
      translation: this.globalPosition,
      scale: this.globalScale,
      rotation: this.globalRotation,
    });
  }

  private getClosestNode2DAncestor(): Node2D | null {
    let parent = this.parent;

    while (parent !== null) {
      if (this.isNode2D(parent)) {
        return parent;
      }

      parent = parent.parent;
    }

    return null;
  }

  private isNode2D(node: Node): node is Node2D {
    return node instanceof Node2D;
  }

  public draw() {
    // TODO: Implement.
  }
}

export interface Node2D_Options extends GraphicsNode_Options {
  position?: Vector2D;
  scale?: Vector2D;
  rotation?: number;
}
