import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { Vector2D } from '../../Vector2D';
import { describe, expect, it } from 'vitest';

describe('AxisAlignedBoundingBoxCollisionResolver2D', () => {
  it.each([
    {
      relation: 'to the left of',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(-BOX_DOUBLE_WIDTH, 0)),
        BOX_CENTERED[1].add(new Vector2D(-BOX_DOUBLE_WIDTH, 0)),
        BOX_CENTERED[2].add(new Vector2D(-BOX_DOUBLE_WIDTH, 0)),
        BOX_CENTERED[3].add(new Vector2D(-BOX_DOUBLE_WIDTH, 0)),
      ],
    },
    {
      relation: 'to the right of',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(BOX_DOUBLE_WIDTH, 0)),
        BOX_CENTERED[1].add(new Vector2D(BOX_DOUBLE_WIDTH, 0)),
        BOX_CENTERED[2].add(new Vector2D(BOX_DOUBLE_WIDTH, 0)),
        BOX_CENTERED[3].add(new Vector2D(BOX_DOUBLE_WIDTH, 0)),
      ],
    },
    {
      relation: 'above',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(0, BOX_DOUBLE_HEIGHT)),
        BOX_CENTERED[1].add(new Vector2D(0, BOX_DOUBLE_HEIGHT)),
        BOX_CENTERED[2].add(new Vector2D(0, BOX_DOUBLE_HEIGHT)),
        BOX_CENTERED[3].add(new Vector2D(0, BOX_DOUBLE_HEIGHT)),
      ],
    },
    {
      relation: 'below',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(0, -BOX_DOUBLE_HEIGHT)),
        BOX_CENTERED[1].add(new Vector2D(0, -BOX_DOUBLE_HEIGHT)),
        BOX_CENTERED[2].add(new Vector2D(0, -BOX_DOUBLE_HEIGHT)),
        BOX_CENTERED[3].add(new Vector2D(0, -BOX_DOUBLE_HEIGHT)),
      ],
    },
  ])('should not detect collision if one box is $relation the other box ', ({ boundingBoxB }) => {
    const boundingBoxA = BOX_CENTERED;
    const collisionResolver = new AxisAlignedBoundingBoxCollisionResolver2D(boundingBoxA, boundingBoxB);

    expect(collisionResolver.resolveCollision()).toBe(false);
  });

  it.each([
    {
      relation: 'on the left border of',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(-BOX_WIDTH, 0)),
        BOX_CENTERED[1].add(new Vector2D(-BOX_WIDTH, 0)),
        BOX_CENTERED[2].add(new Vector2D(-BOX_WIDTH, 0)),
        BOX_CENTERED[3].add(new Vector2D(-BOX_WIDTH, 0)),
      ],
    },
    {
      relation: 'on the right border of',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(BOX_WIDTH, 0)),
        BOX_CENTERED[1].add(new Vector2D(BOX_WIDTH, 0)),
        BOX_CENTERED[2].add(new Vector2D(BOX_WIDTH, 0)),
        BOX_CENTERED[3].add(new Vector2D(BOX_WIDTH, 0)),
      ],
    },
    {
      relation: 'on the top border of',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(0, BOX_HEIGHT)),
        BOX_CENTERED[1].add(new Vector2D(0, BOX_HEIGHT)),
        BOX_CENTERED[2].add(new Vector2D(0, BOX_HEIGHT)),
        BOX_CENTERED[3].add(new Vector2D(0, BOX_HEIGHT)),
      ],
    },
    {
      relation: 'on the bottom border of',
      boundingBoxB: [
        BOX_CENTERED[0].add(new Vector2D(0, -BOX_HEIGHT)),
        BOX_CENTERED[1].add(new Vector2D(0, -BOX_HEIGHT)),
        BOX_CENTERED[2].add(new Vector2D(0, -BOX_HEIGHT)),
        BOX_CENTERED[3].add(new Vector2D(0, -BOX_HEIGHT)),
      ],
    },
    {
      relation: 'completely overlapping',
      boundingBoxB: [
        BOX_CENTERED[0],
        BOX_CENTERED[1],
        BOX_CENTERED[2],
        BOX_CENTERED[3],
      ],
    },
  ])('should detect collision if one box is $relation the other box ', ({ boundingBoxB }) => {
    const boundingBoxA = BOX_CENTERED;
    const collisionResolver = new AxisAlignedBoundingBoxCollisionResolver2D(boundingBoxA, boundingBoxB);

    expect(collisionResolver.resolveCollision()).toBe(true);
  });
});

const BOX_WIDTH = 1;
const BOX_HALF_WIDTH = BOX_WIDTH / 2;
const BOX_DOUBLE_WIDTH = BOX_WIDTH * 2;
const BOX_HEIGHT = 1;
const BOX_HALF_HEIGHT = BOX_HEIGHT / 2;
const BOX_DOUBLE_HEIGHT = BOX_HEIGHT * 2;
const BOX_CENTERED = [
  new Vector2D(BOX_HALF_WIDTH, BOX_HALF_HEIGHT),
  new Vector2D(-BOX_HALF_WIDTH, BOX_HALF_HEIGHT),
  new Vector2D(-BOX_HALF_WIDTH, -BOX_HALF_HEIGHT),
  new Vector2D(BOX_HALF_WIDTH, -BOX_HALF_HEIGHT),
];
