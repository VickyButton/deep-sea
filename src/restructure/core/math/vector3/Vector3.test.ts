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

  it('should add two vectors', () => {
    const left = new Vector3(1, 1, 1);
    const right = new Vector3(-1, -1, -1);
    const result = left.add(right);

    expect(result).toEqual(new Vector3(0, 0, 0));
  });

  it('should subtract two vectors', () => {
    const left = new Vector3(1, 1, 1);
    const right = new Vector3(1, 1, 1);
    const result = left.subtract(right);

    expect(result).toEqual(new Vector3(0, 0, 0));
  });

  it('should multiply two vectors', () => {
    const left = new Vector3(2, 2, 2);
    const right = new Vector3(2, 2, 2);
    const result = left.multiply(right);

    expect(result).toEqual(new Vector3(4, 4, 4));
  });

  it('should divide two vectors', () => {
    const left = new Vector3(2, 2, 2);
    const right = new Vector3(2, 2, 2);
    const result = left.divide(right);

    expect(result).toEqual(new Vector3(1, 1, 1));
  });

  it('should compute the dot product of two vectors', () => {
    const left = new Vector3(1, 2, 3);
    const right = new Vector3(1, 2, 3);
    const result = left.computeDotProduct(right);

    expect(result).toBe(14);
  });

  it('should determine that two vectors are equal', () => {
    const left = new Vector3(1, 1, 1);
    const right = new Vector3(1, 1, 1);
    const result = left.equals(right);

    expect(result).toBe(true);
  });

  it('should determine that two vectors are not equal', () => {
    const left = new Vector3(1, 1, 1);
    const right = new Vector3(-1, -1, -1);
    const result = left.equals(right);

    expect(result).toBe(false);
  });

  it('should create a vector copy', () => {
    const vector = new Vector3(1, 1, 1);
    const copy = vector.copy();

    expect(copy).toEqual(vector);
    expect(copy).not.toBe(vector);
  });

  it('should copy to a 2D vector', () => {
    const vector = new Vector3(1, 1, 1);

    expect(vector.to2D()).toEqual(new Vector2(1, 1));
  });

  it('should create a 3D vector from a 2D vector', () => {
    const vector2D = new Vector2(1, 1);

    expect(Vector3.from2D(vector2D)).toEqual(new Vector3(1, 1, 0));
  });
});
