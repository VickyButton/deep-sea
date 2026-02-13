import { Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { useConfig } from 'config';
import { GameNode2D } from './GameNode2D';

export class CameraNode2D extends GameNode2D {
  /**
   * The size of the camera.
   */
  public size = this.defaultSize();

  /**
   * The camera bounding box, relative to the global space.
   */
  public get rectangle() {
    const position = this.globalPosition;
    const size = Vector2D.multiply(this.globalScale, this.size);

    return new Rectangle(position.x, position.y, size.x, size.y);
  }

  /**
   * Calculates position relative to active camera.
   * @param position The global position.
   * @returns The position relative to active camera.
   */
  public calculateRelativePosition(position: Vector2D) {
    return Vector2D.subtract(position, this.globalPosition);
  }

  private defaultSize() {
    const config = useConfig();

    return new Vector2D(config.graphics.width, config.graphics.height);
  }
}
