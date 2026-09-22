import { Node2D } from './Node2D';
import { Vector2D } from '../domain/Vector2D';
import { describe, expect, it } from 'vitest';

describe('Node2D', () => {
  it('should use position, scale, and rotation for transform', () => {
    const node = new Node2D('node', {
      position: new Vector2D(1, 1),
      scale: new Vector2D(2, 2),
      rotation: 1,
    });

    expect(node.transform).toEqual({
      translation: new Vector2D(1, 1),
      scale: new Vector2D(2, 2),
      rotation: 1,
    });
  });

  it('should calculate global position', () => {
    const parent = new Node2D('parent', {
      position: new Vector2D(1, 1),
    });
    const child = new Node2D('child', {
      position: new Vector2D(1, 1),
    });

    parent.addChild(child);

    expect(child.globalPosition).toEqual(new Vector2D(2, 2));
  });

  it('should calculate global scale', () => {
    const parent = new Node2D('parent', {
      scale: new Vector2D(2, 2),
    });
    const child = new Node2D('child', {
      scale: new Vector2D(2, 2),
    });

    parent.addChild(child);

    expect(child.globalScale).toEqual(new Vector2D(4, 4));
  });

  it('should calculate global rotation', () => {
    const parent = new Node2D('parent', {
      rotation: 1,
    });
    const child = new Node2D('child', {
      rotation: 1,
    });

    parent.addChild(child);

    expect(child.globalRotation).toBe(2);
  });

  it('should calculate global transform', () => {
    const parent = new Node2D('parent', {
      position: new Vector2D(1, 1),
      scale: new Vector2D(2, 2),
      rotation: 1,
    });
    const child = new Node2D('child', {
      position: new Vector2D(1, 1),
      scale: new Vector2D(2, 2),
      rotation: 1,
    });

    parent.addChild(child);

    expect(child.globalTransform).toEqual({
      translation: new Vector2D(2, 2),
      scale: new Vector2D(4, 4),
      rotation: 2,
    });
  });

  it('should move node by a distance', () => {
    const node = new Node2D('node', {
      position: new Vector2D(0, 0),
    });
    const distance = new Vector2D(1, 1);

    node.moveBy(distance);

    expect(node.position).toEqual(new Vector2D(1, 1));
  });

  it('should scale node by a scalar', () => {
    const node = new Node2D('node', {
      scale: new Vector2D(2, 2),
    });
    const scalar = new Vector2D(2, 2);

    node.scaleBy(scalar);

    expect(node.scale).toEqual(new Vector2D(4, 4));
  });

  it('should rotate node by number of radians', () => {
    const node = new Node2D('node', {
      rotation: 1,
    });
    const radians = 2;

    node.rotateBy(radians);

    expect(node.rotation).toBe(3);
  });
});
