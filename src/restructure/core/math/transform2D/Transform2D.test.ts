import { Transform2D } from './Transform2D';
import { Vector2 } from '../vector2/Vector2';
import { describe, expect, it } from 'vitest';

describe('Transform2D', () => {
  it('should get determinant', () => {
    expect(new Transform2D().determinant).toBe(1);
  });

  it('should apply rotation to a 2D vector', () => {
    expect(Transform2D.fromRotation(Math.PI).applyTo(new Vector2(1, 1))).toEqual({
      x: -1.0000000000000002,
      y: -0.9999999999999999,
    });
  });

  it('should apply scaling to a 2D vector', () => {
    expect(Transform2D.fromScale(new Vector2(2, 2)).applyTo(new Vector2(1, 1))).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('should apply translation to a 2D vector', () => {
    expect(Transform2D.fromTranslation(new Vector2(1, 1)).applyTo(new Vector2(1, 1))).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('should apply affine transform to a 2D vector', () => {
    expect(new Transform2D(Math.PI, new Vector2(2, 2), new Vector2(1, 1)).applyTo(new Vector2(1, 1))).toEqual({
      x: -1.0000000000000004,
      y: -0.9999999999999998,
    });
  });

  it('should apply basis transform to a 2D vector', () => {
    expect(new Transform2D(Math.PI, new Vector2(2, 2), new Vector2(1, 1)).applyBasisTo(new Vector2(1, 1))).toEqual({
      x: -2.0000000000000004,
      y: -1.9999999999999998,
    });
  });

  it('should create a copy of itself', () => {
    const original = new Transform2D();
    const copy = original.copy();

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
  });
});
