import { Vector2D } from '@structures/Vector2D';
import { describe, expect, it } from 'vitest';
import { GameNode2D } from './GameNode2D';

describe('GameNode2D', () => {
  it('should default position to zero', () => {
    const anchor = new GameNode2D();

    // Scenario: Anchor is positioned at zero by default.
    expect(anchor.position.equals(Vector2D.zero)).toBe(true);
  });

  it('should default scale to one', () => {
    const anchor = new GameNode2D();

    // Scenario: Anchor is at base scale of one by default.
    expect(anchor.scale.equals(Vector2D.one)).toBe(true);
  });

  it('should calculate global position', () => {
    const nodeA = new GameNode2D();
    const nodeB = new GameNode2D();
    const nodeC = new GameNode2D();

    // Arrange a node tree with a depth of 2.
    nodeA.addChild(nodeB);
    nodeB.addChild(nodeC);

    // Adjust local positions of each node.
    nodeA.position = Vector2D.zero;
    nodeB.position = Vector2D.one;
    nodeC.position = Vector2D.one;

    // Scenario: Global position should be calculated as sum of all ancestor positions.
    expect(nodeC.globalPosition.equals(new Vector2D(2, 2))).toBe(true);
  });

  it('should calculate global scale', () => {
    const nodeA = new GameNode2D();
    const nodeB = new GameNode2D();
    const nodeC = new GameNode2D();

    // Arrange a node tree with a depth of 2.
    nodeA.addChild(nodeB);
    nodeB.addChild(nodeC);

    // Adjust local scales of each node.
    nodeA.scale = new Vector2D(2, 2);
    nodeB.scale = new Vector2D(2, 2);
    nodeC.scale = new Vector2D(2, 2);

    // Scenario: Global scale should be calculated as product of all ancestor scales.
    expect(nodeC.globalScale.equals(new Vector2D(8, 8))).toBe(true);
  });

  it('should move', () => {
    const anchor = new GameNode2D();

    // Scenario: Anchor moves right and down.
    anchor.move(Vector2D.right);
    anchor.move(Vector2D.down);
    expect(anchor.position.equals(Vector2D.one)).toBe(true);
  });
});
