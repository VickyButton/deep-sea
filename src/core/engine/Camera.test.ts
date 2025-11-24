import { Rectangle } from '@core/entities/Rectangle';
import { Vector2D } from '@core/entities/Vector2D';
import { describe, expect, it, vi } from 'vitest';
import { Camera } from './Camera';
import { Node } from '../entities/Node';

class TargetNode extends Node<{ rectangle: Rectangle }> {
  public setup = vi.fn();
  public update = vi.fn();
  public teardown = vi.fn();

  protected getDefaultState() {
    return {
      rectangle: new Rectangle(0, 0, 1, 1),
    };
  }
}

const cameraConfiguration = {
  position: Vector2D.zero,
  size: Vector2D.one,
};

describe('Camera', () => {
  it('should move the camera', () => {
    const camera = new Camera(cameraConfiguration);

    // Scenario: Move camera right and down from zero.
    camera.setPosition(Vector2D.zero);
    camera.move(Vector2D.right);
    camera.move(Vector2D.down);
    expect(camera.position.equals(new Vector2D(1, 1))).toBe(true);
  });

  it('should calculate position relative to camera', () => {
    const camera = new Camera(cameraConfiguration);

    // Scenario: Position is zero.
    expect(camera.getPositionRelativeToCamera(Vector2D.zero).equals(Vector2D.zero)).toBe(true);

    // Scenario: Camera is above target.
    camera.setPosition(Vector2D.up);
    expect(camera.getPositionRelativeToCamera(Vector2D.zero).equals(Vector2D.down)).toBe(true);

    // Scenario: Camera is to the left of target.
    camera.setPosition(Vector2D.left);
    expect(camera.getPositionRelativeToCamera(Vector2D.zero).equals(Vector2D.right)).toBe(true);

    // Scenario: Camera is below target.
    camera.setPosition(Vector2D.down);
    expect(camera.getPositionRelativeToCamera(Vector2D.zero).equals(Vector2D.up)).toBe(true);

    // Scenario: Camera is to the right of target.
    camera.setPosition(Vector2D.right);
    expect(camera.getPositionRelativeToCamera(Vector2D.zero).equals(Vector2D.left)).toBe(true);
  });

  it('should calculate if a node is off screen', () => {
    const camera = new Camera(cameraConfiguration);
    const target = new TargetNode();

    // Scenario: Target position is zero.
    expect(camera.isOffScreen(target)).toBe(false);

    // Scenario: Camera is above target.
    camera.setPosition(Vector2D.up);
    expect(camera.isOffScreen(target)).toBe(true);

    // Scenario: Camera is to the left of target.
    camera.setPosition(Vector2D.left);
    expect(camera.isOffScreen(target)).toBe(true);

    // Scenario: Camera is below target.
    camera.setPosition(Vector2D.down);
    expect(camera.isOffScreen(target)).toBe(true);

    // Scenario: Camera is to the right of target.
    camera.setPosition(Vector2D.right);
    expect(camera.isOffScreen(target)).toBe(true);
  });
});
