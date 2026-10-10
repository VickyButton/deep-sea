import { ShapeNode2D_Base } from './ShapeNode2D_Base';
import { SignalController_Test } from '../../controllers/SignalController_Test';
import { RectangleShape2D } from '../../domain/shapes';
import { Signal_Test } from '../../signals/signal/Signal_Test';
import { describe, expect, it, vi } from 'vitest';

describe('ShapeNode2D_Base', () => {
  it('should have a rectangle shape by default', () => {
    const node = new ShapeNode2D_Base('node', dependencies);

    expect(node.shape).toEqual(new RectangleShape2D({
      width: 1,
      height: 1,
    }));
  });

  it('should emit "shape_changed" signal if shape has changed', () => {
    const node = new ShapeNode2D_Base('node', dependencies);
    const newShape = new RectangleShape2D({
      width: 2,
      height: 2,
    });
    const emitSpy = vi.spyOn(node.shape_changed, 'emit');

    node.shape = newShape;

    expect(emitSpy).toHaveBeenCalledWith(newShape);
  });
});

const dependencies = {
  Signal: Signal_Test,
  SignalController: SignalController_Test,
};
