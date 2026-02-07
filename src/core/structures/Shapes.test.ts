import { describe, expect, it } from 'vitest';
import { Circle, Rectangle } from './Shapes';
import { Vector2D } from './Vector2D';

describe('Circle', () => {
  it('should check if the circle contains a point', () => {
    const circle = new Circle(0, 0, 1);

    // Assert that a point at the center is contained.
    expect(circle.containsPoint(Vector2D.zero)).toBe(true);

    // Assert that a point on the circumference of the circle is not contained.
    expect(circle.containsPoint(Vector2D.right)).toBe(false);

    // Assert that a point outside the circle is not contained.
    expect(circle.containsPoint(Vector2D.one)).toBe(false);
  });

  it('should check if two circles overlap', () => {
    const circle = new Circle(0, 0, 1);

    // Assert that circle overlaps itself.
    expect(circle.overlaps(circle)).toBe(true);

    // Assert that an intersecting circle overlaps circle.
    expect(circle.overlaps(new Circle(1, 0, 1))).toBe(true);

    // Assert that two circles overlap at the ends.
    expect(circle.overlaps(new Circle(2, 0, 1))).toBe(true);

    // Assert that two non-overlapping circles do not overlap.
    expect(circle.overlaps(new Circle(3, 0, 1))).toBe(false);

    // Assert that a circle contained inside of a circle does not overlap.
    expect(circle.overlaps(new Circle(0, 0, 0.5))).toBe(false);
  });
});

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
    expect(rectangle.containsPoint(new Vector2D(0, 0))).toBe(false);

    // Assert that a point that lies on the top-right corner is not contained.
    expect(rectangle.containsPoint(new Vector2D(0, 1))).toBe(false);

    // Assert that a point that lies on the bottom-right corner is not contained.
    expect(rectangle.containsPoint(new Vector2D(1, 1))).toBe(false);

    // Assert that a point that lies on the bottom-left corner is not contained.
    expect(rectangle.containsPoint(new Vector2D(0, 1))).toBe(false);

    // Assert that a point that lies in the middle of the rectangle is contained.
    expect(rectangle.containsPoint(new Vector2D(0.5, 0.5))).toBe(true);
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
