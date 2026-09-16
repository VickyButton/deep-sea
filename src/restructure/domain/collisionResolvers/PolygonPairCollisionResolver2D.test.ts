import { PolygonShape2D } from '../shapes/PolygonShape2D';
import { Vector2D } from '../Vector2D';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { describe, expect, it } from 'vitest';

describe('PolygonPairCollisionResolver2D', () => {
  it('should not detect collision if polygons do not overlap', () => {
    const shapeA = new PolygonShape2D({
      polygon: POLYGON,
    });
    const shapeB = new PolygonShape2D({
      polygon: POLYGON,
      transform: {
        rotation: Math.PI,
        translation: [1, 1],
      },
    });
    const collisionResolver = new PolygonPairCollisionResolver2D(shapeA, shapeB);

    expect(collisionResolver.resolveCollision()).toBe(false);
  });

  it('should detect collision if polygons overlap', () => {
    const shapeA = new PolygonShape2D({
      polygon: POLYGON,
    });
    const shapeB = new PolygonShape2D({
      polygon: POLYGON,
      transform: {
        rotation: Math.PI,
      },
    });
    const collisionResolver = new PolygonPairCollisionResolver2D(shapeA, shapeB);

    expect(collisionResolver.resolveCollision()).toBe(true);
  });
});

const POLYGON = [
  new Vector2D(1, 0),
  new Vector2D(-0.4999999999999998, 0.8660254037844387),
  new Vector2D(-0.5000000000000004, -0.8660254037844385),
];
