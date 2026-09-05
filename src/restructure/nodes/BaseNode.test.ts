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

  it('should have no parent by default', () => {
    const node = new BaseNode('node');

    expect(node.getParent()).toBe(null);
  });

  it('should have no children by default', () => {
    const node = new BaseNode('node');

    expect(node.getChildren().length).toBe(0);
  });

  it('should add a child node', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    parent.addChild(child);

    expect(child.getParent()).toBe(parent);
    expect(parent.getChildren().length).toBe(1);
  });

  it('should remove a child node', () => {
    const parent = new BaseNode('parent');
    const child = new BaseNode('child');

    parent.addChild(child);
    parent.removeChild(child);

    expect(child.getParent()).toBe(null);
    expect(parent.getChildren().length).toBe(0);
  });
});
