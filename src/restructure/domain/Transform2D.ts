import { Vector2D } from './Vector2D';

/**
 * A 2D transform matrix.
 */
export class Transform2D {
  /** The transform position matrix. */
  public position: Vector2D;
  /** The transform scale matrix. */
  public scale: Vector2D;
  /** The transform rotation in radians. */
  public rotation: number;

  constructor(options?: Transform2D_Options) {
    this.position = options?.position ? new Vector2D(options.position[0], options.position[1]) : new Vector2D();
    this.scale = options?.scale ? new Vector2D(options.scale[0], options.scale[1]) : new Vector2D(1, 1);
    this.rotation = options?.rotation ?? 0;
  }
}

export interface Transform2D_Options {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
}
