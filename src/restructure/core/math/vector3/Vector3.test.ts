import { Vector3 } from './Vector3';
import { Vector2 } from '../vector2/Vector2';
import { describe, expect, it } from 'vitest';

describe('Vector3', () => {
  it('should have components accessible via array accessors', () => {
    const vector = new Vector3(1, 2, 3);

    expect(vector[0]).toBe(vector.x);
    expect(vector[1]).toBe(vector.y);
    expect(vector[2]).toBe(vector.z);
  });

  it('should set components via array accessors', () => {
    const vector = new Vector3(0, 0);
    vector[0] = 1;
    vector[1] = 2;
    vector[2] = 3;

    expect(vector.x).toBe(vector[0]);
    expect(vector.y).toBe(vector[1]);
    expect(vector.z).toBe(vector[2]);
  });

  it('should get vector length', () => {
    const vector = new Vector3(0, 0, 1);

    expect(vector.length).toBe(1);
  });

  it('should get normalized vector', () => {
    const vector = new Vector3(0, 0, 2);

    expect(vector.normalized).toEqual(new Vector3(0, 0, 1));
  });

  it('should normalize vector', () => {
    const vector = new Vector3(0, 0, 2);

    vector.normalize();

    expect(vector).toEqual({
      x: 0,
      y: 0,
      z: 1,
    });
  });

  it('should scale components by a scalar', () => {
    const vector = new Vector3(1, 2, 3);

    vector.scale(3);

    expect(vector).toEqual({
      x: 3,
      y: 6,
      z: 9,
    });
  });

  it('should add two vectors', () => {
    const vector = new Vector3(1, 1, 1);

    vector.add(new Vector3(2, 2, 2));

    expect(vector).toEqual({
      x: 3,
      y: 3,
      z: 3,
    });
  });

  it('should subtract two vectors', () => {
    const vector = new Vector3(3, 3, 3);

    vector.subtract(new Vector3(2, 2, 2));

    expect(vector).toEqual({
      x: 1,
      y: 1,
      z: 1,
    });
  });

  it('should compute the dot product of two vectors', () => {
    expect(new Vector3(1, 2, 3).dot(new Vector3(1, 2, 3))).toBe(14);
  });

  it('should compute the cross product of two vectors', () => {
    expect(new Vector3(1, 2, 3).cross(new Vector3(3, 2, 1))).toEqual({
      x: -4,
      y: 8,
      z: -4,
    });
  });

  it('should determine that two vectors are equal', () => {
    expect(new Vector3(1, 1, 1).equals(new Vector3(1, 1, 1))).toBe(true);
  });

  it('should determine that two vectors are not equal', () => {
    expect(new Vector3(1, 1, 1).equals(new Vector3(-1, -1, -1))).toBe(false);
  });

  it('should create a vector copy', () => {
    const original = new Vector3(1, 1, 1);
    const copy = original.copy();

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
  });

  it('should copy to a 2D vector', () => {
    expect(new Vector3(1, 1, 1).to2D()).toEqual(new Vector2(1, 1));
  });

  it('should create a 3D vector from a 2D vector', () => {
    expect(Vector3.from2D(new Vector2(1, 1))).toEqual(new Vector3(1, 1, 0));
  });
});
