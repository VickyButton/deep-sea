import { describe, expect, it, vi } from 'vitest';
import { Camera } from './Camera';
import { Node } from './entities/Node';
import { Point2D } from './interfaces/Point2D';

const ORIGIN_POINT = {
  x: 0,
  y: 0,
} as const;

class TargetNode extends Node<{ position: Point2D; width: number; height: number }> {
  public initialize = vi.fn();
  public update = vi.fn();

  protected getDefaultState() {
    return {
      position: ORIGIN_POINT,
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
    const targetPosition = {
      x: ORIGIN_POINT.x + 1,
      y: ORIGIN_POINT.y + 1,
    };

    target.state.position = targetPosition;

    // Set target and update.
    camera.setTarget(target);
    camera.update();

    // Assert that camera is at target position.
    expect(camera.state.position).toEqual(targetPosition);
  });

  it('should calculate position relative to camera', () => {
    const camera = new Camera(cameraConfiguration);

    // Set camera position to origin.
    camera.setPosition(ORIGIN_POINT);

    // Assert that target position is equal to origin point.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT)).toEqual(ORIGIN_POINT);

    // Offset camera position to top and left of origin.
    camera.setPosition({
      x: ORIGIN_POINT.x - 1,
      y: ORIGIN_POINT.y - 1,
    });

    // Assert that target position is to bottom and right relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT)).toEqual({
      x: 1,
      y: 1,
    });

    // Offset camera position to top and right of origin.
    camera.setPosition({
      x: ORIGIN_POINT.x + 1,
      y: ORIGIN_POINT.y - 1,
    });

    // Assert that target position is to bottom and left relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT)).toEqual({
      x: -1,
      y: 1,
    });

    // Offset camera position to bottom and right of origin.
    camera.setPosition({
      x: ORIGIN_POINT.x + 1,
      y: ORIGIN_POINT.y + 1,
    });

    // Assert that target position is to top and left relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT)).toEqual({
      x: -1,
      y: -1,
    });

    // Offset camera position to bottom and left of origin.
    camera.setPosition({
      x: ORIGIN_POINT.x - 1,
      y: ORIGIN_POINT.y + 1,
    });

    // Assert that target position is to top and right relative of camera.
    expect(camera.getPositionRelativeToCamera(ORIGIN_POINT)).toEqual({
      x: 1,
      y: -1,
    });
  });

  it('should calculate if a node is off screen', () => {
    const camera = new Camera(cameraConfiguration);

    // Set camera position to origin.
    camera.setPosition(ORIGIN_POINT);

    // Set up target at origin.
    const target = new TargetNode();

    target.state.position = ORIGIN_POINT;

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera to top left corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x - 100,
      y: ORIGIN_POINT.y - 100,
    });

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past top left corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x - 101,
      y: ORIGIN_POINT.y - 101,
    });

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);

    // Move camera to top right corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x + 100,
      y: ORIGIN_POINT.y - 100,
    });

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past top right corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x + 101,
      y: ORIGIN_POINT.y - 101,
    });

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);

    // Move camera to bottom right corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x + 100,
      y: ORIGIN_POINT.y + 100,
    });

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past bottom right corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x + 101,
      y: ORIGIN_POINT.y + 101,
    });

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);

    // Move camera to bottom left corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x - 100,
      y: ORIGIN_POINT.y + 100,
    });

    // Assert that target is not off screen.
    expect(camera.isOffScreen(target)).toBe(false);

    // Move camera past bottom left corner of target.
    camera.setPosition({
      x: ORIGIN_POINT.x - 101,
      y: ORIGIN_POINT.y + 101,
    });

    // Assert that target is off screen.
    expect(camera.isOffScreen(target)).toBe(true);
  });
});
