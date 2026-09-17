import { Vector2D } from '../Vector2D';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';
import { describe, expect, it } from 'vitest';

describe('SeparatingAxisTheoremCollisionResolver2D', () => {
  it('should not detect collision if polygons do not overlap', () => {
    const polygonA = CENTERED_POLYGON;
    const polygonB = [
      polygonA[0].add(new Vector2D(2, 2)),
      polygonA[1].add(new Vector2D(2, 2)),
      polygonA[2].add(new Vector2D(2, 2)),
      polygonA[3].add(new Vector2D(2, 2)),
    ];
    const collisionResolver = new SeparatingAxisTheoremCollisionResolver2D(polygonA, polygonB);

    expect(collisionResolver.resolveCollision()).toBe(false);
  });

  it('should detect collision if polygons overlap', () => {
    const polygonA = CENTERED_POLYGON;
    const polygonB = [
      polygonA[0].add(new Vector2D(1, 1)),
      polygonA[1].add(new Vector2D(1, 1)),
      polygonA[2].add(new Vector2D(1, 1)),
      polygonA[3].add(new Vector2D(1, 1)),
    ];
    const collisionResolver = new SeparatingAxisTheoremCollisionResolver2D(polygonA, polygonB);

    expect(collisionResolver.resolveCollision()).toBe(true);
  });
});

const CENTERED_POLYGON = [
  new Vector2D(1, 0),
  new Vector2D(0, 1),
  new Vector2D(-1, 0),
  new Vector2D(0, -1),
];
