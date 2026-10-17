import { Vector2D } from './Vector2D';
import { describe, expect, it } from 'vitest';

describe('Vector2D', () => {
  it('should have components accessible via array accessors', () => {
    const vector = new Vector2D(1, 2);

    expect(vector[0]).toBe(vector.x);
    expect(vector[1]).toBe(vector.y);
  });

  it('should set components via array accessors', () => {
    const vector = new Vector2D(0, 0);
    vector[0] = 1;
    vector[1] = 2;

    expect(vector.x).toBe(vector[0]);
    expect(vector.y).toBe(vector[1]);
  });

  it('should get vector length', () => {
    const vector = new Vector2D(1, 0);

    expect(vector.length).toBe(1);
  });

  it('should get vector angle', () => {
    const vector = new Vector2D(1, 1);

    expect(vector.angle).toBe(Math.PI / 4);
  });

  it('should get normalized vector', () => {
    const vector = new Vector2D(2, 0);

    expect(vector.normalized).toEqual(new Vector2D(1, 0));
  });

  it('should add two vectors', () => {
    const left = new Vector2D(1, 1);
    const right = new Vector2D(-1, -1);
    const result = left.add(right);

    expect(result).toEqual(new Vector2D(0, 0));
  });

  it('should subtract two vectors', () => {
    const left = new Vector2D(1, 1);
    const right = new Vector2D(1, 1);
    const result = left.subtract(right);

    expect(result).toEqual(new Vector2D(0, 0));
  });

  it('should multiply two vectors', () => {
    const left = new Vector2D(2, 2);
    const right = new Vector2D(2, 2);
    const result = left.multiply(right);

    expect(result).toEqual(new Vector2D(4, 4));
  });

  it('should divide two vectors', () => {
    const left = new Vector2D(2, 2);
    const right = new Vector2D(2, 2);
    const result = left.divide(right);

    expect(result).toEqual(new Vector2D(1, 1));
  });

  it('should compute the dot product of two vectors', () => {
    const left = new Vector2D(1, 2);
    const right = new Vector2D(1, 2);
    const result = left.computeDotProduct(right);

    expect(result).toBe(5);
  });

  it('should determine that two vectors are equal', () => {
    const left = new Vector2D(1, 1);
    const right = new Vector2D(1, 1);
    const result = left.equals(right);

    expect(result).toBe(true);
  });

  it('should determine that two vectors are not equal', () => {
    const left = new Vector2D(1, 1);
    const right = new Vector2D(-1, -1);
    const result = left.equals(right);

    expect(result).toBe(false);
  });

  it('should create a vector copy', () => {
    const vector = new Vector2D(1, 1);
    const copy = vector.copy();

    expect(copy).toEqual(vector);
    expect(copy).not.toBe(vector);
  });

  it('should create a vector pointing up', () => {
    const vector = Vector2D.UP;

    expect(vector).toEqual(new Vector2D(0, 1));
  });

  it('should create a vector pointing down', () => {
    const vector = Vector2D.DOWN;

    expect(vector).toEqual(new Vector2D(0, -1));
  });

  it('should create a vector pointing right', () => {
    const vector = Vector2D.RIGHT;

    expect(vector).toEqual(new Vector2D(1, 0));
  });

  it('should create a vector pointing left', () => {
    const vector = Vector2D.LEFT;

    expect(vector).toEqual(new Vector2D(-1, 0));
  });
});
