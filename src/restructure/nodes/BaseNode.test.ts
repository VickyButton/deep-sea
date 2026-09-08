import { BaseNode } from './BaseNode';
import { describe, expect, it } from 'vitest';

describe('BaseNode', () => {
  it('should not be active by default', () => {
    const node = new BaseNode('node');

    expect(node.isActive).toBe(false);
  });

  it('should activate', () => {
    const node = new BaseNode('node');

    node.activate();

    expect(node.isActive).toBe(true);
  });

  it('should deactivate', () => {
    const node = new BaseNode('node');

    node.activate();
    node.deactivate();

    expect(node.isActive).toBe(false);
  });

  it('should not be ready by default', () => {
    const node = new BaseNode('node');

    expect(node.isReady).toBe(false);
  });

  it('should ready', () => {
    const node = new BaseNode('node');

    node.ready();

    expect(node.isReady).toBe(true);
  });

  it('should unready', () => {
    const node = new BaseNode('node');

    node.ready();
    node.unready();

    expect(node.isReady).toBe(false);
  });

  it('should have no parent by default', () => {
    const node = new BaseNode('node');

    expect(node.parent).toBe(null);
  });

  it('should have no children by default', () => {
    const node = new BaseNode('node');

    expect(node.children.length).toBe(0);
  });

  it('should throw an error if setting self as parent', () => {
    const node = new BaseNode('node');

    expect(() => node.setParent(node)).toThrowError();
  });

  it('should add a child node', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    parent.addChild(child);

    expect(child.parent).toBe(parent);
    expect(parent.children[0]).toBe(child);
  });

  it('should not allow self to be added as a child', () => {
    const node = new BaseNode('node');

    expect(() => node.addChild(node)).toThrowError();
  });

  it('should remove a child node', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    parent.addChild(child);
    parent.removeChild(child);

    expect(child.parent).toBe(null);
    expect(parent.children.length).toBe(0);
  });

  it('should remove node from original parent when setting new parent', () => {
    const originalParent = new BaseNode('originalParent');
    const newParent = new BaseNode('newParent');
    const child = new BaseNode('child');

    originalParent.addChild(child);
    newParent.addChild(child);

    expect(originalParent.children.length).toBe(0);
    expect(newParent.children[0]).toBe(child);
  });

  it('should traverse tree in post-order', () => {
    const root = new BaseNode('1');
    const rootLeft = new BaseNode('2');
    const rootRight = new BaseNode('3');
    const rootLeftLeft = new BaseNode('4');
    const rootLeftRight = new BaseNode('5');
    const rootRightRight = new BaseNode('6');

    root.addChild(rootLeft);
    root.addChild(rootRight);
    rootLeft.addChild(rootLeftLeft);
    rootLeft.addChild(rootLeftRight);
    rootRight.addChild(rootRightRight);

    const order: string[] = [];

    root.traversePostorder((node) => {
      order.push(node.id);
    });

    expect(order).toEqual(['4', '5', '2', '6', '3', '1']);
  });
});
