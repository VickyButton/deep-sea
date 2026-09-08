import { Node2D } from './Node2D';
import { describe, expect, it } from 'vitest';

describe('Node2D', () => {
  it('should calculate global position', () => {
    const parent = new Node2D('parent', {
      position: [1, 1],
    });
    const child = new Node2D('child', {
      position: [1, 1],
    });

    parent.addChild(child);

    expect(child.globalPosition).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('should calculate global scale', () => {
    const parent = new Node2D('parent', {
      scale: [2, 2],
    });
    const child = new Node2D('child', {
      scale: [2, 2],
    });

    parent.addChild(child);

    expect(child.globalScale).toEqual({
      x: 4,
      y: 4,
    });
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
      transform: {
        position: [1, 1],
        scale: [2, 2],
        rotation: 1,
      },
    });
    const child = new Node2D('child', {
      transform: {
        position: [1, 1],
        scale: [2, 2],
        rotation: 1,
      },
    });

    parent.addChild(child);

    expect(child.globalTransform).toEqual({
      position: {
        x: 2,
        y: 2,
      },
      scale: {
        x: 4,
        y: 4,
      },
      rotation: 2,
    });
  });
});
