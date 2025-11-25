import { Vector2D } from '@core/structures/Vector2D';
import { describe, expect, it } from 'vitest';
import { AnchorNode2D } from './AnchorNode2D';

describe('AnchorNode2D', () => {
  it('should default position to zero', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor is positioned at zero by default.
    expect(anchor.state.position.equals(Vector2D.zero)).toBe(true);
  });

  it('should set position', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor position is set to one.
    anchor.setPosition(Vector2D.one);
    expect(anchor.state.position.equals(Vector2D.one)).toBe(true);
  });

  it('should move', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor moves right and down.
    anchor.move(Vector2D.right);
    anchor.move(Vector2D.down);
    expect(anchor.state.position.equals(Vector2D.one)).toBe(true);
  });

  it('should default rotation to zero', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor is not rotated by default.
    expect(anchor.state.rotation.equals(Vector2D.zero)).toBe(true);
  });

  it('should set rotation', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor rotation is set to one radian.
    anchor.setRotation(Vector2D.one);
    expect(anchor.state.rotation.equals(Vector2D.one)).toBe(true);
  });

  it('should rotate', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor rotates one radian.
    anchor.rotate(Vector2D.one);
    expect(anchor.state.rotation.equals(Vector2D.one)).toBe(true);
  });

  it('should default scale to one', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor is at base scale of one by default.
    expect(anchor.state.scale.equals(Vector2D.one)).toBe(true);
  });

  it('should set scale', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor scale is set to two.
    anchor.setScale(new Vector2D(2, 2));
    expect(anchor.state.scale.equals(new Vector2D(2, 2))).toBe(true);
  });

  it('should scale', () => {
    const anchor = new AnchorNode2D();

    // Scenario: Anchor scales by two.
    anchor.scale(new Vector2D(2, 2));
    expect(anchor.state.scale.equals(new Vector2D(2, 2))).toBe(true);
  });
});
