import { Vector2D } from './Vector2D';
import { Vector3D } from './Vector3D';
import { describe, expect, it } from 'vitest';

describe('Vector3D', () => {
  it('should have components accessible via array accessors', () => {
    const vector = new Vector3D(1, 2, 3);

    expect(vector[0]).toBe(vector.x);
    expect(vector[1]).toBe(vector.y);
    expect(vector[2]).toBe(vector.z);
  });

  it('should set components via array accessors', () => {
    const vector = new Vector3D(0, 0);
    vector[0] = 1;
    vector[1] = 2;
    vector[2] = 3;

    expect(vector.x).toBe(vector[0]);
    expect(vector.y).toBe(vector[1]);
    expect(vector.z).toBe(vector[2]);
  });

  it('should compute vector length', () => {
    const vector = new Vector3D(0, 0, 1);

    expect(vector.length).toBe(1);
  });

  it('should add two vectors', () => {
    const left = new Vector3D(1, 1, 1);
    const right = new Vector3D(-1, -1, -1);
    const result = left.add(right);

    expect(result).toEqual(new Vector3D(0, 0, 0));
  });

  it('should subtract two vectors', () => {
    const left = new Vector3D(1, 1, 1);
    const right = new Vector3D(1, 1, 1);
    const result = left.subtract(right);

    expect(result).toEqual(new Vector3D(0, 0, 0));
  });

  it('should multiply two vectors', () => {
    const left = new Vector3D(2, 2, 2);
    const right = new Vector3D(2, 2, 2);
    const result = left.multiply(right);

    expect(result).toEqual(new Vector3D(4, 4, 4));
  });

  it('should divide two vectors', () => {
    const left = new Vector3D(2, 2, 2);
    const right = new Vector3D(2, 2, 2);
    const result = left.divide(right);

    expect(result).toEqual(new Vector3D(1, 1, 1));
  });

  it('should determine that two vectors are equal', () => {
    const left = new Vector3D(1, 1, 1);
    const right = new Vector3D(1, 1, 1);
    const result = left.equals(right);

    expect(result).toBe(true);
  });

  it('should determine that two vectors are not equal', () => {
    const left = new Vector3D(1, 1, 1);
    const right = new Vector3D(-1, -1, -1);
    const result = left.equals(right);

    expect(result).toBe(false);
  });

  it('should normalize a vector', () => {
    const vector = new Vector3D(0, 0, 2);
    const result = vector.normalize();

    expect(result).toEqual(new Vector3D(0, 0, 1));
  });

  it('should copy to a 2D vector', () => {
    const vector = new Vector3D(1, 1, 1);

    expect(vector.to2D()).toEqual(new Vector2D(1, 1));
  });

  it('should create a 3D vector from a 2D vector', () => {
    const vector2D = new Vector2D(1, 1);

    expect(Vector3D.from2D(vector2D)).toEqual(new Vector3D(1, 1, 0));
  });
});
