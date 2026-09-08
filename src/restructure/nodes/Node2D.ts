import type { CanvasNodeOptions } from './CanvasNode';
import type { Node } from '../domain/node.types';
import { CanvasNode } from './CanvasNode';
import { Vector2D } from '../domain/vector';

export interface Node2DOptions extends CanvasNodeOptions {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
}

/**
 * A node which can be used in a 2D plane.
 */
export class Node2D<T extends Node2DOptions = Node2DOptions> extends CanvasNode<T> {
  /** The node's position relative to its parent. */
  public position = new Vector2D();
  /** The node's scale relative to its parent. */
  public scale = new Vector2D(1, 1);
  /** The node's rotation, in radians, relative to its parent. */
  public rotation = 0;

  constructor(id: string, options?: T) {
    super(id, options);

    this.position = options?.position ? new Vector2D(options.position[0], options.position[1]) : new Vector2D();
    this.scale = options?.scale ? new Vector2D(options.scale[0], options.scale[1]) : new Vector2D(1, 1);
    this.rotation = options?.rotation ?? 0;
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
