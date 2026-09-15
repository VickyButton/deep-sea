import { Vector2D } from '../Vector2D';
import { PolygonShape2D } from './PolygonShape2D';
import { describe, expect, it } from 'vitest';

describe('PolygonShape2D', () => {
  it('should be a triangle by default', () => {
    const polygonShape = new PolygonShape2D();

    expect(polygonShape.polygon).toEqual([
      new Vector2D(6.123233995736766e-17, 1),
      new Vector2D(0.8660254037844387, -0.49999999999999983),
      new Vector2D(-0.8660254037844385, -0.5000000000000003),
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
      new Vector2D(6.123233995736766e-17, 1),
      new Vector2D(0.8660254037844387, -0.49999999999999983),
      new Vector2D(-0.8660254037844385, -0.5000000000000003),
    ]);
  });

  it('should compute bounding rectangle', () => {
    const polygonShape = new PolygonShape2D({
      polygon: POLYGON,
    });

    expect(polygonShape.boundingRectangle).toEqual({
      left: -0.8660254037844385,
      right: 0.8660254037844387,
      top: 1,
      bottom: -0.5000000000000003,
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
      new Vector2D(-1.8369701987210297e-16, -1),
      new Vector2D(-0.8660254037844386, 0.49999999999999994),
      new Vector2D(0.8660254037844386, 0.5000000000000002),
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
      new Vector2D(1.2246467991473532e-16, 2),
      new Vector2D(1.7320508075688774, -0.9999999999999997),
      new Vector2D(-1.732050807568877, -1.0000000000000007),
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
      new Vector2D(1, 2),
      new Vector2D(1.8660254037844388, 0.5000000000000002),
      new Vector2D(0.13397459621556151, 0.49999999999999967),
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
      new Vector2D(0.9999999999999997, -1),
      new Vector2D(-0.7320508075688772, 2),
      new Vector2D(2.732050807568877, 2.0000000000000004),
    ]);
  });
});

const POLYGON = [
  new Vector2D(6.123233995736766e-17, 1),
  new Vector2D(0.8660254037844387, -0.49999999999999983),
  new Vector2D(-0.8660254037844385, -0.5000000000000003),
];
