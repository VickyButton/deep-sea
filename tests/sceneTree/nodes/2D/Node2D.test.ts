import { Vector2 } from '../../../../src/core/math/Vector2';
import { Node2D } from '../../../../src/sceneTree/nodes/2D/Node2D';
import { describe, expect, it } from 'vitest';

describe('Node2D', () => {
  it('should be locally positioned at (0,0) by default', () => {
    expect(createNode2D().position).toEqual({
      x: 0,
      y: 0,
    });
  });

  it('should set local position', () => {
    const node = createNode2D();

    node.position = new Vector2(1, 1);

    expect(node.position).toEqual({
      x: 1,
      y: 1,
    });
  });

  it('should translate locally', () => {
    const node = createNode2D();

    node.translate(new Vector2(1, 1));

    expect(node.position).toEqual({
      x: 1,
      y: 1,
    });
  });

  it('should not be locally rotated by default', () => {
    expect(createNode2D().rotation).toBe(0);
  });

  it('should set local rotation', () => {
    const node = createNode2D();

    node.rotation = 1;

    expect(node.rotation).toBe(1);
  });

  it('should rotate locally', () => {
    const node = createNode2D();

    node.rotate(1);

    expect(node.rotation).toBe(1);
  });

  it('should not be locally scaled by default', () => {
    expect(createNode2D().scale).toEqual({
      x: 1,
      y: 1,
    });
  });

  it('should set local scale', () => {
    const node = createNode2D();

    node.scale = new Vector2(2, 2);

    expect(node.scale).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('should apply scale locally', () => {
    const node = createNode2D();

    node.applyScale(new Vector2(2, 2));

    expect(node.scale).toEqual({
      x: 2,
      y: 2,
    });
  });
});

function createNode2D() {
  return new Node2D({
    id: 'ID',
  });
}
