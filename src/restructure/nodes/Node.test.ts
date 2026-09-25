import { Node } from './Node';
import { Event } from '../events/Event';
import { describe, expect, it, vi } from 'vitest';

describe('Node', () => {
  it('should not be listening by default', () => {
    expect(new Node('node').isListening).toBe(false);
  });

  it('should start listening', () => {
    const node = new Node('node');

    node.start();

    expect(node.isListening).toBe(true);
  });

  it('should stop listening', () => {
    const node = new Node('node');

    node.start();
    node.stop();

    expect(node.isListening).toBe(false);
  });

  it('should not listen for event before starting', () => {
    const node = new Node('node');
    const event = new Event<void>();
    const listener = vi.fn();

    node.addEventListener(event, listener);
    event.emit();

    expect(node.isListening).toBe(false);
    expect(listener).not.toHaveBeenCalled();
  });

  it('should listen for event after starting', () => {
    const node = new Node('node');
    const event = new Event<void>();
    const listener = vi.fn();

    node.addEventListener(event, listener);
    node.start();
    event.emit();

    expect(node.isListening).toBe(true);
    expect(listener).toHaveBeenCalled();
  });

  it('should not listen for event after stopping', () => {
    const node = new Node('node');
    const event = new Event<void>();
    const listener = vi.fn();

    node.addEventListener(event, listener);
    node.start();
    node.stop();
    event.emit();

    expect(node.isListening).toBe(false);
    expect(listener).not.toHaveBeenCalled();
  });

  it('should not listen for event after removing listener', () => {
    const node = new Node('node');
    const event = new Event<void>();
    const listener = vi.fn();

    node.addEventListener(event, listener);
    node.start();
    node.removeEventListener(event, listener);
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should have no children by default', () => {
    const node = new Node('node');

    expect(node.children.length).toBe(0);
  });

  it('should not have parent by default', () => {
    const node = new Node('node');

    expect(node.hasParent).toBe(false);
  });

  it('should have null parent by default', () => {
    const node = new Node('node');

    expect(node.parent).toBe(null);
  });

  it('should assign a child relationship', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    parent.addChild(child);

    expect(child.parent).toBe(parent);
    expect(parent.children[0]).toBe(child);
  });

  it('should throw an error if trying to assign itself as a child', () => {
    const node = new Node('node');

    expect(() => node.addChild(node)).toThrowError();
  });

  it('should throw an error if trying to assign a child relationship with a child that already has a parent', () => {
    const parent = new Node('parent');
    const child = new Node('child');
    const node = new Node('node');

    parent.addChild(child);

    expect(() => node.addChild(child)).toThrowError();
  });

  it('should assign a parent relationship with another node', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    child.assignParent(parent);

    expect(child.parent).toBe(parent);
  });

  it('should throw an error if trying to assign a parent relationship with itself', () => {
    const self = new Node('self');

    expect(() => self.assignParent(self)).toThrowError();
  });

  it('should unassign a parent relationship with another node', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    child.assignParent(parent);
    child.unassignParent();

    expect(child.parent).toBe(null);
  });

  it('should unassign a child relationship with another node', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    parent.addChild(child);
    parent.removeChild(child);

    expect(child.parent).toBe(null);
    expect(parent.children.length).toBe(0);
  });

  it('should reparent itself to a new parent', () => {
    const originalParent = new Node('originalParent');
    const newParent = new Node('newParent');
    const child = new Node('child');

    originalParent.addChild(child);
    child.reparent(newParent);

    expect(child.parent).toBe(newParent);
    expect(newParent.children[0]).toBe(child);
    expect(originalParent.children.length).toBe(0);
  });

  it('should remove all child relationships on teardown', () => {
    const node = new Node('node');
    const child1 = new Node('child1');
    const child2 = new Node('child2');

    node.addChild(child1);
    node.addChild(child2);
    node.teardown();

    expect(node.children.length).toBe(0);
  });

  it('should traverse tree in post-order', () => {
    const root = new Node('1');
    const rootLeft = new Node('2');
    const rootRight = new Node('3');
    const rootLeftLeft = new Node('4');
    const rootLeftRight = new Node('5');
    const rootRightRight = new Node('6');

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
