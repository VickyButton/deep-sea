import { describe, expect, it, vi } from 'vitest';
import { GameNode } from './GameNode';

describe('GameNode', () => {
  it('should add child', () => {
    const node = new GameNode();
    const child = new GameNode();

    // Scenario: Child node is added.
    node.addChild(child);
    expect(child.parent).toBe(node);
  });

  it('should remove child', () => {
    const node = new GameNode();
    const child = new GameNode();

    // Scenario: Child node is added.
    node.addChild(child);
    expect(child.parent).toBe(node);

    // Scenario: Child node is removed.
    node.removeChild(child);
    expect(child.parent).toBe(null);
  });

  it('should setup children on setup', () => {
    const node = new GameNode();
    const child = new GameNode();
    const childSetupSpy = vi.spyOn(child, 'setup');

    node.addChild(child);

    // Scenario: Node setup is called.
    node.setup();
    expect(childSetupSpy).toHaveBeenCalled();
  });

  it('should update children on update', () => {
    const node = new GameNode();
    const child = new GameNode();
    const childUpdateSpy = vi.spyOn(child, 'update');

    node.addChild(child);

    // Scenario: Node update is called.
    node.update(0);
    expect(childUpdateSpy).toHaveBeenCalledWith(0);
  });

  it('should teardown children on teardown', () => {
    const node = new GameNode();
    const child = new GameNode();
    const childTeardownSpy = vi.spyOn(child, 'teardown');

    node.addChild(child);

    // Scenario: Node teardown is called.
    node.teardown();
    expect(childTeardownSpy).toHaveBeenCalled();
  });

  it('should traverse to root', () => {
    const node = new GameNode();
    const firstChild = new GameNode();
    const secondChild = new GameNode();

    // Add children to create a node tree 3 levels deep.
    node.addChild(firstChild);
    firstChild.addChild(secondChild);

    // For each recursion, iterate a count variable.
    let count = 0;
    const callback = () => {
      count++;
    };

    // Scenario: Node traverses to root.
    secondChild.traverseToRoot(callback);
    expect(count).toBe(2);
  });
});
