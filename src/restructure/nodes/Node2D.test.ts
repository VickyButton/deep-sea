import { Node2D } from './Node2D';
import { describe, expect, it } from 'vitest';

describe('Node2D', () => {
  it('should calculate global position', () => {
    const parent = Node2D.create('parent', {
      position: {
        x: 1,
        y: 1,
      },
    });
    const child = Node2D.create('child', {
      position: {
        x: 1,
        y: 1,
      },
    });

    parent.addChild(child);

    expect(child.globalPosition).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('should calculate global scale', () => {
    const parent = Node2D.create('parent', {
      scale: {
        x: 2,
        y: 2,
      },
    });
    const child = Node2D.create('child', {
      scale: {
        x: 2,
        y: 2,
      },
    });

    parent.addChild(child);

    expect(child.globalScale).toEqual({
      x: 4,
      y: 4,
    });
  });

  it('should calculate global rotation', () => {
    const parent = Node2D.create('parent', {
      rotation: 1,
    });
    const child = Node2D.create('child', {
      rotation: 1,
    });

    parent.addChild(child);

    expect(child.globalRotation).toBe(2);
  });
});
