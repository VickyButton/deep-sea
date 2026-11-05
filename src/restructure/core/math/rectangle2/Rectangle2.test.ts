import { Rectangle2 } from './Rectangle2';
import { describe, expect, it } from 'vitest';

describe('Rectangle2', () => {
  it('should be positioned at origin by default', () => {
    expect(new Rectangle2().position).toEqual({
      x: 0,
      y: 0,
    });
  });

  it('should be a square by default', () => {
    expect(new Rectangle2().size).toEqual({
      x: 1,
      y: 1,
    });
  });

  it('should get X component of position', () => {
    expect(new Rectangle2().x).toBe(0);
  });

  it('should set X component of position', () => {
    const rectangle = new Rectangle2();

    rectangle.x = 1;

    expect(rectangle.x).toBe(1);
  });

  it('should get Y component of position', () => {
    expect(new Rectangle2().y).toBe(0);
  });

  it('should set Y component of position', () => {
    const rectangle = new Rectangle2();

    rectangle.y = 1;

    expect(rectangle.y).toBe(1);
  });

  it('should get width', () => {
    expect(new Rectangle2().width).toBe(1);
  });

  it('should set width', () => {
    const rectangle = new Rectangle2();

    rectangle.width = 2;

    expect(rectangle.width).toBe(2);
  });

  it('should get height', () => {
    expect(new Rectangle2().height).toBe(1);
  });

  it('should set height', () => {
    const rectangle = new Rectangle2();

    rectangle.height = 2;

    expect(rectangle.height).toBe(2);
  });

  it('should get X component of the left side', () => {
    expect(new Rectangle2().left).toBe(0);
  });

  it('should get X component of the right side', () => {
    expect(new Rectangle2().right).toBe(1);
  });

  it('should get Y component of the bottom side', () => {
    expect(new Rectangle2().bottom).toBe(0);
  });

  it('should get Y component of the bottom side', () => {
    expect(new Rectangle2().top).toBe(1);
  });
});
