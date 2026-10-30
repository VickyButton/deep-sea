import { Vector2 } from './Vector2';
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

  it('should scale components by a constant scalar', () => {
    expect(new Vector2(1, 2).scale(3)).toEqual({
      x: 3,
      y: 6,
    });
  });

  it('should compute the dot product of two vectors', () => {
    expect(new Vector2(1, 2).dot(new Vector2(1, 2))).toBe(5);
  });

  it('should compute the cross product of two vectors', () => {
    expect(new Vector2(1, 0).cross(new Vector2(0, 1))).toBe(1);
  });

  it('should determine that two vectors are equal', () => {
    const left = new Vector2(1, 1);
    const right = new Vector2(1, 1);
    const result = left.equals(right);

    expect(result).toBe(true);
  });

  it('should determine that two vectors are not equal', () => {
    const left = new Vector2(1, 1);
    const right = new Vector2(-1, -1);
    const result = left.equals(right);

    expect(result).toBe(false);
  });

  it('should create a vector copy', () => {
    const vector = new Vector2(1, 1);
    const copy = vector.copy();

    expect(copy).toEqual(vector);
    expect(copy).not.toBe(vector);
  });

  it('should create a vector pointing up', () => {
    const vector = Vector2.UP;

    expect(vector).toEqual(new Vector2(0, 1));
  });

  it('should create a vector pointing down', () => {
    const vector = Vector2.DOWN;

    expect(vector).toEqual(new Vector2(0, -1));
  });

  it('should create a vector pointing right', () => {
    const vector = Vector2.RIGHT;

    expect(vector).toEqual(new Vector2(1, 0));
  });

  it('should create a vector pointing left', () => {
    const vector = Vector2.LEFT;

    expect(vector).toEqual(new Vector2(-1, 0));
  });
});
