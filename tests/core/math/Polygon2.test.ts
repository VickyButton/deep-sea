
import { Polygon2 } from '../../../src/core/math/polygon2/Polygon2';
import { Vector2 } from '../../../src/core/math/Vector2';
import { describe, expect, it } from 'vitest';

describe('Polygon2', () => {
  it('should intersect with intersecting polygon', () => {
    expect(new Polygon2([
      new Vector2(1, 1),
      new Vector2(2, 1),
      new Vector2(2, 2),
    ]).intersects(new Polygon2([
      new Vector2(1, 1),
      new Vector2(2, 1),
      new Vector2(2, 2),
    ]))).toBe(true);
  });

  it('should not intersect with non-intersecting polygon', () => {
    expect(new Polygon2([
      new Vector2(1, 1),
      new Vector2(2, 1),
      new Vector2(2, 2),
    ]).intersects(new Polygon2([
      new Vector2(-1, -1),
      new Vector2(-2, -1),
      new Vector2(-2, -2),
    ]))).toBe(false);
  });
});
