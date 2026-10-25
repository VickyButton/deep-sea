import { ShapeNode2D } from './ShapeNode2D';
import { Shape2D_Rectangle } from '../../domain/shape2D/Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('ShapeNode2D', () => {
  it('should have a rectangle shape by default', () => {
    const node = new ShapeNode2D('node');

    expect(node.shape).toEqual(new Shape2D_Rectangle());
  });

  it('should emit "shape_changed" signal if shape has changed', () => {
    const node = new ShapeNode2D('node');
    const newShape = new Shape2D_Rectangle();
    const emitSpy = vi.spyOn(node.shape_changed, 'emit');

    node.shape = newShape;

    expect(emitSpy).toHaveBeenCalledWith(newShape);
  });
});
