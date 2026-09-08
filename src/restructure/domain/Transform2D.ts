import { Vector2D } from './Vector2D';

export class Transform2D {
  public position: Vector2D;
  public scale: Vector2D;
  public rotation: number;

  constructor(options?: Transform2DOptions) {
    this.position = options?.position ? new Vector2D(options.position[0], options.position[1]) : new Vector2D();
    this.scale = options?.scale ? new Vector2D(options.scale[0], options.scale[1]) : new Vector2D(1, 1);
    this.rotation = options?.rotation ?? 0;
  }
}

export interface Transform2DOptions {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
}
