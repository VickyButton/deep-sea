import { Vector2 } from '../../../src/core/math/Vector2';
import { describe, expect, it } from 'vitest';

describe('Vector2', () => {
  it('should have components accessible via array accessors', () => {
    const vector = new Vector2(1, 2);

    expect(vector[0]).toBe(vector.x);
    expect(vector[1]).toBe(vector.y);
  });

  it('should set components via array accessors', () => {
    const vector = new Vector2(0, 0);
    vector[0] = 1;
    vector[1] = 2;

    expect(vector.x).toBe(vector[0]);
    expect(vector.y).toBe(vector[1]);
  });

  it('should get vector length', () => {
    expect(new Vector2(1, 0).length).toBe(1);
  });

  it('should get vector angle', () => {
    expect(new Vector2(1, 1).angle).toBe(Math.PI / 4);
  });

  it('should get normalized vector', () => {
    expect(new Vector2(2, 0).normalized).toEqual({
      x: 1,
      y: 0,
    });
  });

  it('should normalize vector', () => {
    const vector = new Vector2(2, 0);

    vector.normalize();

    expect(vector).toEqual({
      x: 1,
      y: 0,
    });
  });

  it('should scale components by a scalar', () => {
    const vector = new Vector2(1, 2);

    vector.scale(3);

    expect(vector).toEqual({
      x: 3,
      y: 6,
    });
  });

  it('should add two vectors', () => {
    expect(new Vector2(1, 1).add(new Vector2(2, 2))).toEqual({
      x: 3,
      y: 3,
    });
  });

  it('should subtract two vectors', () => {
    expect(new Vector2(3, 3).subtract(new Vector2(2, 2))).toEqual({
      x: 1,
      y: 1,
    });
  });

  it('should compute the dot product of two vectors', () => {
    expect(new Vector2(1, 2).dot(new Vector2(1, 2))).toBe(5);
  });

  it('should compute the cross product of two vectors', () => {
    expect(new Vector2(1, 0).cross(new Vector2(0, 1))).toBe(1);
  });

  it('should determine that two vectors are equal', () => {
    expect(new Vector2(1, 1).equals(new Vector2(1, 1))).toBe(true);
  });

  it('should determine that two vectors are not equal', () => {
    expect(new Vector2(1, 1).equals(new Vector2(-1, -1))).toBe(false);
  });

  it('should compute a vector that is perpendicular to the vector in the clockwise direction', () => {
    expect(new Vector2(1, 0).perpendicularClockwise).toEqual({
      x: 0,
      y: -1,
    });
  });

  it('should compute a vector that is perpendicular to the vector in the counterclockwise direction', () => {
    expect(new Vector2(1, 0).perpendicularCounterclockwise).toEqual({
      x: 0,
      y: 1,
    });
  });

  it('should create a vector copy', () => {
    const original = new Vector2(1, 1);
    const copy = original.copy();

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
  });

  it('should create a vector pointing up', () => {
    expect(Vector2.UP).toEqual({
      x: 0,
      y: 1,
    });
  });

  it('should create a vector pointing down', () => {
    expect(Vector2.DOWN).toEqual({
      x: 0,
      y: -1,
    });
  });

  it('should create a vector pointing right', () => {
    expect(Vector2.RIGHT).toEqual({
      x: 1,
      y: 0,
    });
  });

  it('should create a vector pointing left', () => {
    expect(Vector2.LEFT).toEqual({
      x: -1,
      y: 0,
    });
  });
});
