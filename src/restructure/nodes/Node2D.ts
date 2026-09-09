import type { CanvasNode_Options } from './CanvasNode';
import type { Node } from './Node';
import type { Transform2DOptions } from '../domain/Transform2D';
import { CanvasNode } from './CanvasNode';
import { Transform2D } from '../domain/Transform2D';
import { Vector2D } from '../domain/Vector2D';

/**
 * A node which can be used in a 2D plane.
 */
export class Node2D extends CanvasNode {
  /** The node's position relative to its parent. */
  public position: Vector2D;
  /** The node's scale relative to its parent. */
  public scale: Vector2D;
  /** The node's rotation, in radians, relative to its parent. */
  public rotation: number;
  /** The node's transform matrix relative to its parent. */
  public transform: Transform2D;

  constructor(id: string, options?: Node2D_Options) {
    super(id, options);

    this.position = options?.position ? new Vector2D(options.position[0], options.position[1]) : new Vector2D();
    this.scale = options?.scale ? new Vector2D(options.scale[0], options.scale[1]) : new Vector2D(1, 1);
    this.rotation = options?.rotation ?? 0;
    this.transform = options?.transform ? new Transform2D(options.transform) : new Transform2D();
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

  public get globalTransform(): Transform2D {
    const closestNode2DAncestor = this.getClosestNode2DAncestor();

    return closestNode2DAncestor ? {
      position: closestNode2DAncestor.transform.position.add(this.transform.position),
      scale: closestNode2DAncestor.transform.scale.multiply(this.transform.scale),
      rotation: closestNode2DAncestor.transform.rotation + this.transform.rotation,
    } : this.transform;
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

export interface Node2D_Options extends CanvasNode_Options {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
  transform?: Transform2DOptions;
}
