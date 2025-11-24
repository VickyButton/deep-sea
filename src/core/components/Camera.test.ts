import { Vector2D } from '@core/entities/Vector2D';
import { describe, expect, it, vi } from 'vitest';
import { Camera } from './Camera';
import { Node } from '../entities/Node';

const ORIGIN_POINT = new Vector2D(0, 0);

class TargetNode extends Node<{ position: Vector2D; width: number; height: number }> {
  public setup = vi.fn();
  public update = vi.fn();
  public teardown = vi.fn();

  protected getDefaultState() {
    return {
      position: new Vector2D(ORIGIN_POINT.x, ORIGIN_POINT.y),
      width: 100,
      height: 100,
    };
  }
}

const cameraConfiguration = {
  width: 100,
  height: 100,
};

describe('Camera', () => {
  it('should follow target node', () => {
    const camera = new Camera(cameraConfiguration);

    // Set camera position to origin.
    camera.setPosition(ORIGIN_POINT);

    // Set up target.
    const target = new TargetNode();
    const targetPosition = new Vector2D(ORIGIN_POINT.x + 1, ORIGIN_POINT.y + 1);

    target.state.position.set(targetPosition);

    // Set target and update.
    camera.setTarget(target);
    camera.update();

    // Assert that camera is at target position.
    expect(camera.position.equals(target.state.position)).toBe(true);
  });

  it('should move the camera', () => {
    const camera = new Camera(cameraConfiguration);

    camera.setPosition(ORIGIN_POINT);

    // Move camera down and right.
    camera.move(new Vector2D(1, 1));

    expect(camera.position.equals(new Vector2D(1, 1))).toBe(true);
  });

  it('should calculate position relative to camera', () => {
    const camera = new Camera(cameraConfiguration);

    // Set camera position to origin.
    camera.setPosition(ORIGIN_POINT);

    // Assert that target position is equal to origin point.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT).equals(ORIGIN_POINT)).toBe(true);

    // Offset camera position to top and left of origin.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x - 1, ORIGIN_POINT.y - 1));

    // Assert that target position is to bottom and right relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT).equals(new Vector2D(1, 1))).toBe(true);

    // Offset camera position to top and right of origin.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x + 1, ORIGIN_POINT.y - 1));

    // Assert that target position is to bottom and left relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT).equals(new Vector2D(-1, 1))).toBe(true);

    // Offset camera position to bottom and right of origin.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x + 1, ORIGIN_POINT.y + 1));

    // Assert that target position is to top and left relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT).equals(new Vector2D(-1, -1))).toBe(
      true,
    );

    // Offset camera position to bottom and left of origin.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x - 1, ORIGIN_POINT.y + 1));

    // Assert that target position is to top and right relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT).equals(new Vector2D(1, -1))).toBe(true);
  });

  it('should calculate if a node is off screen', () => {
    const camera = new Camera(cameraConfiguration);

    // Set camera position to origin.
    camera.setPosition(ORIGIN_POINT);

    // Set up target at origin.
    const target = new TargetNode();

    target.state.position.set(ORIGIN_POINT);

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera to top left corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x - 100, ORIGIN_POINT.y - 100));

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past top left corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x - 101, ORIGIN_POINT.y - 101));

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);

    // Move camera to top right corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x + 100, ORIGIN_POINT.y - 100));

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past top right corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x + 101, ORIGIN_POINT.y - 101));

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);

    // Move camera to bottom right corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x + 100, ORIGIN_POINT.y + 100));

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past bottom right corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x + 101, ORIGIN_POINT.y + 101));

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);

    // Move camera to bottom left corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x - 100, ORIGIN_POINT.y + 100));

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past bottom left corner of target.
    camera.setPosition(new Vector2D(ORIGIN_POINT.x - 101, ORIGIN_POINT.y + 101));

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);
  });
});
