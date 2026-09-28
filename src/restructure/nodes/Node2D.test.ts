import type { Node2DEvents } from './Node2D';
import { Node2D } from './Node2D';
import { Vector2D } from '../domain/Vector2D';
import { Event } from '../events';
import { describe, expect, it } from 'vitest';

describe('Node2D', () => {
  // TODO: Add unit test: default position = (0, 0)
  // TODO: Add unit test: default scale = (1, 1)
  // TODO: Add unit test: default rotation = 1

  it('should use position, scale, and rotation for transform', () => {
    const node = createNode2D('node');
    node.position = new Vector2D(1, 1);
    node.scale = new Vector2D(2, 2);
    node.rotation = 1;

    expect(node.transform).toEqual({
      translation: new Vector2D(1, 1),
      scale: new Vector2D(2, 2),
      rotation: 1,
    });
  });

  it('should calculate global position', () => {
    const parent = createNode2D('parent');
    const child = createNode2D('child');
    parent.position = new Vector2D(1, 1);
    child.position = new Vector2D(1, 1);

    parent.addChild(child);

    expect(child.globalPosition).toEqual(new Vector2D(2, 2));
  });

  it('should calculate global scale', () => {
    const parent = createNode2D('parent');
    const child = createNode2D('child');
    parent.scale = new Vector2D(2, 2);
    child.scale = new Vector2D(2, 2);

    parent.addChild(child);

    expect(child.globalScale).toEqual(new Vector2D(4, 4));
  });

  it('should calculate global rotation', () => {
    const parent = createNode2D('parent');
    const child = createNode2D('child');
    parent.rotation = 1;
    child.rotation = 1;

    parent.addChild(child);

    expect(child.globalRotation).toBe(2);
  });

  it('should calculate global transform', () => {
    const parent = createNode2D('parent');
    const child = createNode2D('child');
    parent.position = new Vector2D(1, 1);
    parent.scale = new Vector2D(2, 2);
    parent.rotation = 1;
    child.position = new Vector2D(1, 1);
    child.scale = new Vector2D(2, 2);
    child.rotation = 1;

    parent.addChild(child);

    expect(child.globalTransform).toEqual({
      translation: new Vector2D(2, 2),
      scale: new Vector2D(4, 4),
      rotation: 2,
    });
  });

  it('should move', () => {
    const node = createNode2D('node');
    node.position = new Vector2D(0, 0);

    node.moveBy(new Vector2D(1, 1));

    expect(node.position).toEqual(new Vector2D(1, 1));
  });

  it('should scale node by a scalar', () => {
    const node = createNode2D('node');
    const scalar = new Vector2D(2, 2);
    node.scale = new Vector2D(2, 2);

    node.scaleBy(scalar);

    expect(node.scale).toEqual(new Vector2D(4, 4));
  });

  it('should rotate node by number of radians', () => {
    const node = createNode2D('node');
    const radians = 2;
    node.rotation = 1;

    node.rotateBy(radians);

    expect(node.rotation).toBe(3);
  });
});

function createNode2D(id: string) {
  return new Node2D(id, createEvents());
}

function createEvents(): Node2DEvents {
  return {
    graphics: {
      ClearCanvas: new Event(),
      ClearDrawCommandQueue: new Event(),
      DeleteCachedDrawCommand: new Event(),
      ProcessDrawCommandQueue: new Event(),
      QueueDrawCommand: new Event(),
    },
  };
}
