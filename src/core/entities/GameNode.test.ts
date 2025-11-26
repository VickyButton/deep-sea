import { describe, expect, it, vi } from 'vitest';
import { GameNode } from './GameNode';

describe('GameNode', () => {
  it('should add child', () => {
    const parent = new GameNode();
    const child = new GameNode();

    // Scenario: Child node is added.
    parent.addChild(child);
    expect(child.parent).toBe(parent);
  });

  it('should remove child', () => {
    const parent = new GameNode();
    const child = new GameNode();

    // Scenario: Child node is added.
    parent.addChild(child);
    expect(child.parent).toBe(parent);

    // Scenario: Child node is removed.
    parent.removeChild(child);
    expect(child.parent).toBe(null);
  });

  it('should setup children on setup', () => {
    const parent = new GameNode();
    const child = new GameNode();
    const childSetupSpy = vi.spyOn(child, 'setup');

    parent.addChild(child);

    // Scenario: setup is called on parent.
    parent.setup();
    expect(childSetupSpy).toHaveBeenCalled();
  });

  it('should update children on update', () => {
    const parent = new GameNode();
    const child = new GameNode();
    const childUpdateSpy = vi.spyOn(child, 'update');

    parent.addChild(child);

    // Scenario: update is called on parent.
    parent.update(0);
    expect(childUpdateSpy).toHaveBeenCalledWith(0);
  });

  it('should teardown children on teardown', () => {
    const parent = new GameNode();
    const child = new GameNode();
    const childTeardownSpy = vi.spyOn(child, 'teardown');

    parent.addChild(child);

    // Scenario: teardown is called on parent.
    parent.teardown();
    expect(childTeardownSpy).toHaveBeenCalled();
  });

  it('should traverse to root', () => {
    const rootNode = new GameNode();
    const middleNode = new GameNode();
    const leafNode = new GameNode();

    // Add children to create a node tree 3 levels deep.
    rootNode.addChild(middleNode);
    middleNode.addChild(leafNode);

    // For each recursion, iterate a count variable.
    let count = 0;
    const callback = () => {
      count++;
    };

    // Scenario: Node traverses to root.
    leafNode.traverseToRoot(callback);
    expect(count).toBe(2);
  });
});
