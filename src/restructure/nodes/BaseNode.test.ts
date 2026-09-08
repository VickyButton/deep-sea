import { BaseNode } from './BaseNode';
import { describe, expect, it } from 'vitest';

describe('BaseNode', () => {
  it('should not be active by default', () => {
    const node = new BaseNode('node');

    expect(node.isActive).toBe(false);
  });

  it('should activate itself', () => {
    const node = new BaseNode('node');

    node.activate();

    expect(node.isActive).toBe(true);
  });

  it('should deactivate itself', () => {
    const node = new BaseNode('node');

    node.activate();
    node.deactivate();

    expect(node.isActive).toBe(false);
  });

  it('should not be ready by default', () => {
    const node = new BaseNode('node');

    expect(node.isReady).toBe(false);
  });

  it('should ready itself', () => {
    const node = new BaseNode('node');

    node.ready();

    expect(node.isReady).toBe(true);
  });

  it('should unready itself', () => {
    const node = new BaseNode('node');

    node.ready();
    node.unready();

    expect(node.isReady).toBe(false);
  });

  it('should have no parent by default', () => {
    const node = new BaseNode('node');

    expect(node.parent).toBe(null);
    expect(node.hasParent).toBe(false);
  });

  it('should have no children by default', () => {
    const node = new BaseNode('node');

    expect(node.children.length).toBe(0);
  });

  it('should assign a parent to itself', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    child.assignParent(parent);

    expect(child.parent).toBe(parent);
  });

  it('should throw an error if assigning itself as parent', () => {
    const node = new BaseNode('node');

    expect(() => node.assignParent(node)).toThrowError();
  });

  it('should unassign a parent from itself', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    child.assignParent(parent);
    child.unassignParent();

    expect(child.parent).toBe(null);
  });

  it('should add a child', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    parent.addChild(child);

    expect(child.parent).toBe(parent);
    expect(parent.children[0]).toBe(child);
  });

  it('should throw an error if trying to add itself as a child', () => {
    const node = new BaseNode('node');

    expect(() => node.addChild(node)).toThrowError();
  });

  it('should throw an error if trying to add a child that already has a parent', () => {
    const originalParent = new BaseNode('originalParent');
    const newParent = new BaseNode('newParent');
    const child = new BaseNode('child');

    originalParent.addChild(child);

    expect(() => newParent.addChild(child)).toThrowError();
  });

  it('should remove a child', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    parent.addChild(child);
    parent.removeChild(child);

    expect(child.parent).toBe(null);
    expect(parent.children.length).toBe(0);
  });

  it('should reparent itself to a new parent', () => {
    const originalParent = new BaseNode('originalParent');
    const newParent = new BaseNode('newParent');
    const child = new BaseNode('child');

    originalParent.addChild(child);
    child.reparent(newParent);

    expect(child.parent).toBe(newParent);
    expect(newParent.children[0]).toBe(child);
    expect(originalParent.children.length).toBe(0);
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
