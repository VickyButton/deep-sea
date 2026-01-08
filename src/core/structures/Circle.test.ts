import { describe, expect, it } from 'vitest';
import { Circle } from './Circle';
import { Vector2D } from './Vector2D';

describe('Circle', () => {
  it('should check if the circle contains a point', () => {
    const circle = new Circle(0, 0, 1);

    // Assert that a point at the center is contained.
    expect(circle.contains(Vector2D.zero)).toBe(true);

    // Assert that a point on the circumference of the circle is not contained.
    expect(circle.contains(Vector2D.right)).toBe(false);

    // Assert that a point outside the circle is not contained.
    expect(circle.contains(Vector2D.one)).toBe(false);
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
