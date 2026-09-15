import { AxisAlignedRectanglePairCollisionResolver2D } from './AxisAlignedRectanglePairCollisionResolver2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';
import { describe, expect, it } from 'vitest';

describe('AxisAlignedRectanglePairCollisionResolver2D', () => {
  it('should throw if at least one rectangle is not axis aligned', () => {
    const rectangleA = new RectangleShape2D();
    const rectangleB = new RectangleShape2D({
      transform: {
        rotation: Math.PI / 4,
      },
    });
    const collisionResolver = new AxisAlignedRectanglePairCollisionResolver2D(rectangleA, rectangleB);

    expect(() => collisionResolver.resolveCollision()).toThrowError();
  });

  it('should not detect collision if there is a gap between the rectangles', () => {
    const rectangleA = new RectangleShape2D({
      size: [1, 1],
    });
    const rectangleB = new RectangleShape2D({
      size: [1, 1],
      transform: {
        translation: [2, 0],
      },
    });
    const collisionResolver = new AxisAlignedRectanglePairCollisionResolver2D(rectangleA, rectangleB);

    expect(collisionResolver.resolveCollision()).toBe(false);
  });

  it.each([
    {
      relation: 'on the left border of',
      translation: [-1, 0] as Tuple2,
    },
    {
      relation: 'on the right border of',
      translation: [1, 0] as Tuple2,
    },
    {
      relation: 'on the top border of',
      translation: [0, 1] as Tuple2,
    },
    {
      relation: 'on the bottom border of',
      translation: [0, -1] as Tuple2,
    },
    {
      relation: 'completely overlapping',
      translation: [0, 0] as Tuple2,
    },
  ])('should detect collision if one rectangle is $relation the other rectangle ', ({ translation }) => {
    const rectangleA = new RectangleShape2D({
      size: [1, 1],
    });
    const rectangleB = new RectangleShape2D({
      size: [1, 1],
      transform: {
        translation,
      },
    });
    const collisionResolver = new AxisAlignedRectanglePairCollisionResolver2D(rectangleA, rectangleB);

    expect(collisionResolver.resolveCollision()).toBe(true);
  });
});

type Tuple2 = [number, number];
