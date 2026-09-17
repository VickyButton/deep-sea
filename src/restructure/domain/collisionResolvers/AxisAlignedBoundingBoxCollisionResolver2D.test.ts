import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { describe, expect, it } from 'vitest';

describe('AxisAlignedBoundingBoxCollisionResolver2D', () => {
  it.each([
    {
      relation: 'to the left of',
      boundingBoxB: {
        left: BOX_CENTERED.left - 2 * BOX_WIDTH,
        right: BOX_CENTERED.right - 2 * BOX_WIDTH,
        top: BOX_CENTERED.top,
        bottom: BOX_CENTERED.bottom,
      },
    },
    {
      relation: 'to the right of',
      boundingBoxB: {
        left: BOX_CENTERED.left + 2 * BOX_WIDTH,
        right: BOX_CENTERED.right + 2 * BOX_WIDTH,
        top: BOX_CENTERED.top,
        bottom: BOX_CENTERED.bottom,
      },
    },
    {
      relation: 'above',
      boundingBoxB: {
        left: BOX_CENTERED.left,
        right: BOX_CENTERED.right,
        top: BOX_CENTERED.top + 2 * BOX_HEIGHT,
        bottom: BOX_CENTERED.bottom + 2 * BOX_HEIGHT,
      },
    },
    {
      relation: 'below',
      boundingBoxB: {
        left: BOX_CENTERED.left,
        right: BOX_CENTERED.right,
        top: BOX_CENTERED.top - 2 * BOX_HEIGHT,
        bottom: BOX_CENTERED.bottom - 2 * BOX_HEIGHT,
      },
    },
  ])('should not detect collision if one box is $relation the other box ', ({ boundingBoxB }) => {
    const boundingBoxA = BOX_CENTERED;
    const collisionResolver = new AxisAlignedBoundingBoxCollisionResolver2D(boundingBoxA, boundingBoxB);

    expect(collisionResolver.resolveCollision()).toBe(false);
  });

  it.each([
    {
      relation: 'on the left border of',
      boundingBoxB: {
        left: BOX_CENTERED.left - BOX_WIDTH,
        right: BOX_CENTERED.right - BOX_WIDTH,
        top: BOX_CENTERED.top,
        bottom: BOX_CENTERED.bottom,
      },
    },
    {
      relation: 'on the right border of',
      boundingBoxB: {
        left: BOX_CENTERED.left + BOX_WIDTH,
        right: BOX_CENTERED.right + BOX_WIDTH,
        top: BOX_CENTERED.top,
        bottom: BOX_CENTERED.bottom,
      },
    },
    {
      relation: 'on the top border of',
      boundingBoxB: {
        left: BOX_CENTERED.left,
        right: BOX_CENTERED.right,
        top: BOX_CENTERED.top + BOX_HEIGHT,
        bottom: BOX_CENTERED.bottom + BOX_HEIGHT,
      },
    },
    {
      relation: 'on the bottom border of',
      boundingBoxB: {
        left: BOX_CENTERED.left,
        right: BOX_CENTERED.right,
        top: BOX_CENTERED.top - BOX_HEIGHT,
        bottom: BOX_CENTERED.bottom - BOX_HEIGHT,
      },
    },
    {
      relation: 'completely overlapping',
      boundingBoxB: {
        left: BOX_CENTERED.left,
        right: BOX_CENTERED.right,
        top: BOX_CENTERED.top,
        bottom: BOX_CENTERED.bottom,
      },
    },
  ])('should detect collision if one box is $relation the other box ', ({ boundingBoxB }) => {
    const boundingBoxA = BOX_CENTERED;
    const collisionResolver = new AxisAlignedBoundingBoxCollisionResolver2D(boundingBoxA, boundingBoxB);

    expect(collisionResolver.resolveCollision()).toBe(true);
  });
});

const BOX_WIDTH = 1;
const BOX_HALF_WIDTH = BOX_WIDTH / 2;
const BOX_HEIGHT = 1;
const BOX_HALF_HEIGHT = BOX_HEIGHT / 2;
const BOX_CENTERED = {
  left: -BOX_HALF_WIDTH,
  right: BOX_HALF_WIDTH,
  top: BOX_HALF_HEIGHT,
  bottom: -BOX_HALF_HEIGHT,
};
