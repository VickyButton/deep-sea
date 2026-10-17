import { Node2D_Main } from './Node2D_Main';
import { Vector2D } from '../../domain';
import { Transform2D } from '../../domain/transform2D/Transform2D';
import { describe, expect, it, vi } from 'vitest';

describe('Node2D_Main', () => {
  it('should be positioned at origin by default', () => {
    const node = new Node2D_Main('node');

    expect(node.position).toEqual(new Vector2D(0, 0));
  });

  it('should not emit "position_changed" signal if position has not changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.position;
    const emitSpy = vi.spyOn(node.position_changed, 'emit');

    node.position = newValue;

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit "position_changed" signal if position has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.position.add(new Vector2D(1, 1));
    const emitSpy = vi.spyOn(node.position_changed, 'emit');

    node.position = newValue;

    expect(emitSpy).toHaveBeenCalledWith(newValue);
  });

  it('should emit "transform_changed" signal if position has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.position.add(new Vector2D(1, 1));
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');

    node.position = newValue;

    expect(emitSpy).toHaveBeenCalledWith(node.transform);
  });

  it('should not be rotated by default', () => {
    const node = new Node2D_Main('node');

    expect(node.rotation).toBe(0);
  });

  it('should not emit "rotation_changed" signal if rotation has not changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.rotation;
    const emitSpy = vi.spyOn(node.rotation_changed, 'emit');

    node.rotation = newValue;

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit "rotation_changed" signal if rotation has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.rotation + 1;
    const emitSpy = vi.spyOn(node.rotation_changed, 'emit');

    node.rotation = newValue;

    expect(emitSpy).toHaveBeenCalledWith(newValue);
  });

  it('should emit "transform_changed" signal if rotation has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.rotation + 1;
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');

    node.rotation = newValue;

    expect(emitSpy).toHaveBeenCalledWith(node.transform);
  });

  it('should not be scaled by default', () => {
    const node = new Node2D_Main('node');

    expect(node.scale).toEqual(new Vector2D(1, 1));
  });

  it('should not emit "scale_changed" signal if scale has not changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.scale;
    const emitSpy = vi.spyOn(node.scale_changed, 'emit');

    node.scale = newValue;

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit "scale_changed" signal if scale has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.scale.add(new Vector2D(1, 1));
    const emitSpy = vi.spyOn(node.scale_changed, 'emit');

    node.scale = newValue;

    expect(emitSpy).toHaveBeenCalledWith(newValue);
  });

  it('should emit "transform_changed" signal if scale has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.scale.add(new Vector2D(1, 1));
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');

    node.scale = newValue;

    expect(emitSpy).toHaveBeenCalledWith(node.transform);
  });

  it('should not be transformed by default', () => {
    const node = new Node2D_Main('node');

    expect(node.transform).toEqual(new Transform2D({
      rotation: 0,
      scale: new Vector2D(1, 1),
      translation: new Vector2D(0, 0),
    }));
  });

  it('should not emit "transform_changed" signal if transform has not changed', () => {
    const node = new Node2D_Main('node');
    const newValue = node.transform;
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');

    node.transform = newValue;

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit "transform_changed" signal once if transform has changed', () => {
    const node = new Node2D_Main('node');
    const newValue = new Transform2D({
      rotation: node.transform.rotation + 1,
      scale: node.transform.scale.add(new Vector2D(1, 1)),
      translation: node.transform.translation.add(new Vector2D(1, 1)),
    });
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');

    node.transform = newValue;

    expect(emitSpy).toHaveBeenCalledOnce();
    expect(emitSpy).toHaveBeenCalledWith(newValue);
  });

  it('should emit "position_changed" signal if transform has changed with new position', () => {
    const node = new Node2D_Main('node');
    const newPosition = node.transform.translation.add(new Vector2D(1, 1));
    const newTransform = new Transform2D({
      rotation: node.transform.rotation,
      scale: node.transform.scale,
      translation: newPosition,
    });
    const emitSpy = vi.spyOn(node.position_changed, 'emit');

    node.transform = newTransform;

    expect(emitSpy).toHaveBeenCalledWith(newPosition);
  });

  it('should emit "rotation_changed" signal if transform has changed with new rotation', () => {
    const node = new Node2D_Main('node');
    const newRotation = node.transform.rotation + 1;
    const newTransform = new Transform2D({
      rotation: newRotation,
      scale: node.transform.scale,
      translation: node.transform.translation,
    });
    const emitSpy = vi.spyOn(node.rotation_changed, 'emit');

    node.transform = newTransform;

    expect(emitSpy).toHaveBeenCalledWith(newRotation);
  });

  it('should emit "scale_changed" signal if transform has changed with new scale', () => {
    const node = new Node2D_Main('node');
    const newScale = node.transform.scale.add(new Vector2D(1, 1));
    const newTransform = new Transform2D({
      rotation: node.transform.rotation,
      scale: newScale,
      translation: node.transform.translation,
    });
    const emitSpy = vi.spyOn(node.scale_changed, 'emit');

    node.transform = newTransform;

    expect(emitSpy).toHaveBeenCalledWith(newScale);
  });

  it('should be positioned at origin globally by default', () => {
    const node = new Node2D_Main('node');

    expect(node.globalPosition).toEqual(new Vector2D(0, 0));
  });

  it('should determine global position from closest ancestor', () => {
    const node = new Node2D_Main('node');
    node.position = new Vector2D(1, 1);
    const parent = new Node2D_Main('ancestor');
    parent.position = new Vector2D(2, 2);

    parent.addChild(node);

    expect(node.globalPosition).toEqual(new Vector2D(3, 3));
  });

  it('should not be rotated globally by default', () => {
    const node = new Node2D_Main('node');

    expect(node.globalRotation).toBe(0);
  });

  it('should determine global rotation from closest ancestor', () => {
    const node = new Node2D_Main('node');
    node.rotation = 1;
    const parent = new Node2D_Main('ancestor');
    parent.rotation = 2;

    parent.addChild(node);

    expect(node.globalRotation).toEqual(3);
  });

  it('should not be scaled globally by default', () => {
    const node = new Node2D_Main('node');

    expect(node.globalScale).toEqual(new Vector2D(1, 1));
  });

  it('should determine global scale from closest ancestor', () => {
    const node = new Node2D_Main('node');
    node.scale = new Vector2D(2, 2);
    const parent = new Node2D_Main('ancestor');
    parent.scale = new Vector2D(3, 3);

    parent.addChild(node);

    expect(node.globalScale).toEqual(new Vector2D(6, 6));
  });

  it('should rotate node', () => {
    const node = new Node2D_Main('node');
    node.rotation = 1;

    node.rotateBy(1);

    expect(node.rotation).toBe(2);
  });

  it('should emit "rotation_changed" signal on rotate', () => {
    const node = new Node2D_Main('node');
    const emitSpy = vi.spyOn(node.rotation_changed, 'emit');
    node.rotation = 1;

    node.rotateBy(1);

    expect(emitSpy).toHaveBeenLastCalledWith(2);
  });

  it('should emit "transform_changed" signal on rotate', () => {
    const node = new Node2D_Main('node');
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');
    node.rotation = 1;

    node.rotateBy(1);

    expect(emitSpy).toHaveBeenLastCalledWith(node.transform);
  });

  it('should scale node', () => {
    const node = new Node2D_Main('node');
    node.scale = new Vector2D(2, 2);

    node.scaleBy(new Vector2D(3, 3));

    expect(node.scale).toEqual(new Vector2D(6, 6));
  });

  it('should emit "scale_changed" signal on scale', () => {
    const node = new Node2D_Main('node');
    const emitSpy = vi.spyOn(node.scale_changed, 'emit');
    node.scale = new Vector2D(2, 2);

    node.scaleBy(new Vector2D(3, 3));

    expect(emitSpy).toHaveBeenLastCalledWith(new Vector2D(6, 6));
  });

  it('should emit "transform_changed" signal on scale', () => {
    const node = new Node2D_Main('node');
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');
    node.scale = new Vector2D(2, 2);

    node.scaleBy(new Vector2D(3, 3));

    expect(emitSpy).toHaveBeenLastCalledWith(node.transform);
  });

  it('should translate node', () => {
    const node = new Node2D_Main('node');
    node.position = new Vector2D(1, 1);

    node.translateBy(new Vector2D(2, 2));

    expect(node.position).toEqual(new Vector2D(3, 3));
  });

  it('should emit "position_changed" signal on translate', () => {
    const node = new Node2D_Main('node');
    const emitSpy = vi.spyOn(node.position_changed, 'emit');
    node.position = new Vector2D(1, 1);

    node.translateBy(new Vector2D(2, 2));

    expect(emitSpy).toHaveBeenLastCalledWith(new Vector2D(3, 3));
  });

  it('should emit "transform_changed" signal on translate', () => {
    const node = new Node2D_Main('node');
    const emitSpy = vi.spyOn(node.transform_changed, 'emit');
    node.position = new Vector2D(1, 1);

    node.translateBy(new Vector2D(2, 2));

    expect(emitSpy).toHaveBeenLastCalledWith(node.transform);
  });
});
