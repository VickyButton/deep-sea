import { Rectangle } from '@core/structures/Rectangle';
import { Vector2D } from '@core/structures/Vector2D';
import { game } from 'game';
import { GameNode2D } from './GameNode2D';

export class Camera2D extends GameNode2D {
  /**
   * The size of the camera.
   */
  public size = new Vector2D(game.graphics.width, game.graphics.height);

  /**
   * The camera bounding box, relative to the global space.
   */
  public get rectangle() {
    const position = this.globalPosition;
    const size = Vector2D.multiply(this.globalScale, this.size);

    return new Rectangle(position.x, position.y, size.x, size.y);
  }

  /**
   * Moves the camera by the specified distance.
   *
   * @param distance The distance to move the camera by.
   */
  public move(distance: Vector2D) {
    this.position = Vector2D.add(this.position, distance);
  }
}
