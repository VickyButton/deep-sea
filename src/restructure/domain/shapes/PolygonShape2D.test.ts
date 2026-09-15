import { Vector2D } from '../Vector2D';
import { PolygonShape2D } from './PolygonShape2D';
import { describe, expect, it } from 'vitest';

describe('PolygonShape2D', () => {
  it('should be a triangle by default', () => {
    const polygonShape = new PolygonShape2D();

    expect(polygonShape.polygon).toEqual([
      new Vector2D(1, 0),
      new Vector2D(-0.4999999999999998, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should throw if an invalid polygon is passed', () => {
    expect(() => new PolygonShape2D({
      polygon: [],
    })).toThrowError();
  });

  it('should compute vertices', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
    });

    expect(polygonShape.vertices).toEqual([
      new Vector2D(1, 0),
      new Vector2D(-0.4999999999999998, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should compute bounding rectangle', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
    });

    expect(polygonShape.boundingRectangle).toEqual({
      left: -0.5000000000000004,
      right: 1,
      top: 0.8660254037844387,
      bottom: -0.8660254037844385,
    });
  });

  it('should apply rotation', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
      transform: {
        rotation: Math.PI, // 180 degrees
      },
    });

    expect(polygonShape.vertices).toEqual([
      new Vector2D(-1, 1.2246467991473532e-16),
      new Vector2D(0.49999999999999967, -0.8660254037844388),
      new Vector2D(0.5000000000000006, 0.8660254037844384),
    ]);
  });

  it('should apply scaling', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
      transform: {
        scale: [2, 2],
      },
    });

    expect(polygonShape.vertices).toEqual([
      new Vector2D(2, 0),
      new Vector2D(-0.9999999999999996, 1.7320508075688774),
      new Vector2D(-1.0000000000000009, -1.732050807568877),
    ]);
  });

  it('should apply translation', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
      transform: {
        translation: [1, 1],
      },
    });

    expect(polygonShape.vertices).toEqual([
      new Vector2D(2, 1),
      new Vector2D(0.5000000000000002, 1.8660254037844388),
      new Vector2D(0.49999999999999956, 0.13397459621556151),
    ]);
  });

  it('should apply composite transformation matrix', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
      transform: {
        rotation: Math.PI, // 180 degrees
        scale: [2, 2],
        translation: [1, 1],
      },
    });

    expect(polygonShape.vertices).toEqual([
      new Vector2D(-1, 1.0000000000000002),
      new Vector2D(1.9999999999999993, -0.7320508075688776),
      new Vector2D(2.000000000000001, 2.7320508075688767),
    ]);
  });
});

const POLYGON = [
  new Vector2D(1, 0),
  new Vector2D(-0.4999999999999998, 0.8660254037844387),
  new Vector2D(-0.5000000000000004, -0.8660254037844385),
];
