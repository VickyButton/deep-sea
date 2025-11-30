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
    const nodeA = new GameNode();
    const nodeB = new GameNode();
    const nodeC = new GameNode();

    // Arrange a node tree with a depth of 2.
    nodeA.addChild(nodeB);
    nodeB.addChild(nodeC);

    // For each recursion, iterate a count variable.
    let count = 0;
    const callback = () => {
      count++;
    };

    // Scenario: Node traverses to root.
    nodeC.traverseToRoot(callback);
    expect(count).toBe(2);
  });

  it('should traverse to leaves', () => {
    const nodeA = new GameNode();
    const nodeB = new GameNode();
    const nodeC = new GameNode();
    const nodeD = new GameNode();

    // Arrange a node tree with a depth of 2.
    nodeA.addChild(nodeB);
    nodeB.addChild(nodeC);
    nodeB.addChild(nodeD);

    // For each recursion, iterate a count variable.
    let count = 0;
    const callback = () => {
      count++;
    };

    // Scenario: Node traverses to root.
    nodeA.traverseToLeaves(callback);
    expect(count).toBe(3);
  });
});
