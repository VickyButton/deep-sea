import { ShapeNode2D_Main } from './ShapeNode2D_Main';
import { Shape2D_Rectangle } from '../../domain/shape2D/Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('ShapeNode2D_Main', () => {
  it('should have a rectangle shape by default', () => {
    const node = new ShapeNode2D_Main('node');

    expect(node.shape).toEqual(new Shape2D_Rectangle({
      width: 1,
      height: 1,
    }));
  });

  it('should emit "shape_changed" signal if shape has changed', () => {
    const node = new ShapeNode2D_Main('node');
    const newShape = new Shape2D_Rectangle({
      width: 2,
      height: 2,
    });
    const emitSpy = vi.spyOn(node.shape_changed, 'emit');

    node.shape = newShape;

    expect(emitSpy).toHaveBeenCalledWith(newShape);
  });
});
