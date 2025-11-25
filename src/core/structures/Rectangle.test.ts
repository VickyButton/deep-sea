import { describe, expect, it } from 'vitest';
import { Rectangle } from './Rectangle';
import { Vector2D } from './Vector2D';

describe('Rectangle', () => {
  it('should calculate sides correctly', () => {
    const rectangle = new Rectangle(0, 0, 1, 1);

    expect(rectangle.top).toBe(0);
    expect(rectangle.left).toBe(0);
    expect(rectangle.bottom).toBe(1);
    expect(rectangle.right).toBe(1);
  });

  it('should check if the rectangle contains a point', () => {
    const rectangle = new Rectangle(0, 0, 1, 1);

    // Assert that a point that lies on the top-left corner is not contained.
    expect(rectangle.contains(new Vector2D(0, 0))).toBe(false);

    // Assert that a point that lies on the top-right corner is not contained.
    expect(rectangle.contains(new Vector2D(0, 1))).toBe(false);

    // Assert that a point that lies on the bottom-right corner is not contained.
    expect(rectangle.contains(new Vector2D(1, 1))).toBe(false);

    // Assert that a point that lies on the bottom-left corner is not contained.
    expect(rectangle.contains(new Vector2D(0, 1))).toBe(false);

    // Assert that a point that lies in the middle of the rectangle is contained.
    expect(rectangle.contains(new Vector2D(0.5, 0.5))).toBe(true);
  });

  it('should check if the rectangle overlaps another rectangle', () => {
    const rectangle = new Rectangle(0, 0, 1, 1);

    // Assert that a rectangle to the top and left of the rectangle does not overlap.
    expect(rectangle.overlaps(new Rectangle(-1, -1, 1, 1))).toBe(false);

    // Assert that a rectangle to the top and right of the rectangle does not overlap.
    expect(rectangle.overlaps(new Rectangle(1, -1, 1, 1))).toBe(false);

    // Assert that a rectangle to the bottom and right of the rectangle does not overlap.
    expect(rectangle.overlaps(new Rectangle(1, 1, 1, 1))).toBe(false);

    // Assert that a rectangle to the bottom and left of the rectangle does not overlap.
    expect(rectangle.overlaps(new Rectangle(-1, 1, 1, 1))).toBe(false);

    // Assert that a rectangle overlaps itself.
    expect(rectangle.overlaps(rectangle)).toBe(true);
  });
});
