import { Node } from './Node';
import { Event } from '../events/Event';
import { describe, expect, it, vi } from 'vitest';

describe('Node', () => {
  it('should not be active by default', () => {
    const node = new Node('node');

    expect(node.isActive).toBe(false);
  });

  it('should activate itself', () => {
    const node = new Node('node');

    node.activate();

    expect(node.isActive).toBe(true);
  });

  it('should deactivate itself', () => {
    const node = new Node('node');

    node.activate();
    node.deactivate();

    expect(node.isActive).toBe(false);
  });

  it('should not be ready by default', () => {
    const node = new Node('node');

    expect(node.isReady).toBe(false);
  });

  it('should ready itself', () => {
    const node = new Node('node');

    node.ready();

    expect(node.isReady).toBe(true);
  });

  it('should unready itself', () => {
    const node = new Node('node');

    node.ready();
    node.unready();

    expect(node.isReady).toBe(false);
  });

  it('should add an event listener before being activated', () => {
    const node = new Node('node');
    const event = new Event(Symbol('event'));
    const listener = vi.fn();
    const data = -1;

    node.addEventListener(event, listener);
    node.activate();
    event.emit(data);

    expect(listener).toHaveBeenCalledWith(data);
  });

  it('should add an event listener while active', () => {
    const node = new Node('node');
    const event = new Event<void>(Symbol('event'));
    const listener = vi.fn();

    node.activate();
    node.addEventListener(event, listener);
    event.emit();

    expect(listener).toHaveBeenCalled();
  });

  it('should add an event listener while inactive', () => {
    const node = new Node('node');
    const event = new Event<void>(Symbol('event'));
    const listener = vi.fn();

    node.deactivate();
    node.addEventListener(event, listener);
    node.activate();
    event.emit();

    expect(listener).toHaveBeenCalled();
  });

  it('should not execute event listener if event emitted while inactive', () => {
    const node = new Node('node');
    const event = new Event<void>(Symbol('event'));
    const listener = vi.fn();

    node.addEventListener(event, listener);
    node.deactivate();
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should keep an event listener after being activated, deactivated, and then activated again', () => {
    const node = new Node('node');
    const event = new Event<void>(Symbol('event'));
    const listener = vi.fn();

    node.addEventListener(event, listener);
    node.activate();
    node.deactivate();
    node.activate();
    event.emit();

    expect(listener).toHaveBeenCalled();
  });

  it('should remove an event listener', () => {
    const node = new Node('node');
    const event = new Event<void>(Symbol('event'));
    const listener = vi.fn();

    node.addEventListener(event, listener);
    node.removeEventListener(event, listener);
    node.activate();
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should have no parent by default', () => {
    const node = new Node('node');

    expect(node.parent).toBe(null);
    expect(node.hasParent).toBe(false);
  });

  it('should have no children by default', () => {
    const node = new Node('node');

    expect(node.children.length).toBe(0);
  });

  it('should assign a parent to itself', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    child.assignParent(parent);

    expect(child.parent).toBe(parent);
  });

  it('should throw an error if assigning itself as parent', () => {
    const node = new Node('node');

    expect(() => node.assignParent(node)).toThrowError();
  });

  it('should unassign a parent from itself', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    child.assignParent(parent);
    child.unassignParent();

    expect(child.parent).toBe(null);
  });

  it('should add a child', () => {
    const parent = new Node('parent');
    const child = new Node('child');

    parent.addChild(child);

    expect(child.parent).toBe(parent);
    expect(parent.children[0]).toBe(child);
  });

  it('should throw an error if trying to add itself as a child', () => {
    const node = new Node('node');

    expect(() => node.addChild(node)).toThrowError();
  });

  it('should throw an error if trying to add a child that already has a parent', () => {
    const originalParent = new Node('originalParent');
    const newParent = new Node('newParent');
    const child = new Node('child');

    originalParent.addChild(child);

    expect(() => newParent.addChild(child)).toThrowError();
  });

  it('should remove a child', () => {
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
