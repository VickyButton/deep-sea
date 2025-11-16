import { describe, expect, it, vi } from 'vitest';
import { Camera } from './Camera';
import { Node } from './entities/Node';
import { Point2D } from './interfaces/Point2D';

class TargetNode extends Node<{ position: Point2D }> {
  public initialize = vi.fn();
  public update = vi.fn();

  protected getDefaultState() {
    return {
      position: {
        x: 0,
        y: 0,
      },
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

    // Assert that camera is at origin position.
    expect(camera.state.position).toEqual({
      x: 0,
      y: 0,
    });

    // Set up target.
    const target = new TargetNode();
    const targetPosition = {
      x: 100,
      y: 100,
    };

    target.state.position = targetPosition;

    // Set target and update.
    camera.setTarget(target);
    camera.update();

    // Assert that camera is at target position.
    expect(camera.state.position).toEqual(targetPosition);
  });
});
