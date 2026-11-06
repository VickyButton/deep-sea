import { Color } from './Color';
import { describe, expect, it } from 'vitest';

describe('Color', () => {
  it('should default to fully-opaque black color', () => {
    const color = new Color();

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });

  it('should clamp red value up to 0', () => {
    const color = new Color(Number.MIN_SAFE_INTEGER, 0, 0, 1);

    expect(color.r).toEqual(0);
  });

  it('should clamp red value down to 255', () => {
    const color = new Color(Number.MAX_SAFE_INTEGER, 0, 0, 1);

    expect(color.r).toEqual(255);
  });

  it('should clamp green value up to 0', () => {
    const color = new Color(0, Number.MIN_SAFE_INTEGER, 0, 1);

    expect(color.g).toEqual(0);
  });

  it('should clamp green value down to 255', () => {
    const color = new Color(0, Number.MAX_SAFE_INTEGER, 0, 1);

    expect(color.g).toEqual(255);
  });

  it('should clamp blue value up to 0', () => {
    const color = new Color(0, 0, Number.MIN_SAFE_INTEGER, 1);

    expect(color.b).toEqual(0);
  });

  it('should clamp blue value down to 255', () => {
    const color = new Color(0, 0, Number.MAX_SAFE_INTEGER, 1);

    expect(color.b).toEqual(255);
  });

  it('should clamp alpha value up to 0', () => {
    const color = new Color(0, 0, 0, Number.MIN_SAFE_INTEGER);

    expect(color.a).toEqual(0);
  });

  it('should clamp alpha value down to 1', () => {
    const color = new Color(0, 0, 0, Number.MAX_SAFE_INTEGER);

    expect(color.a).toEqual(1);
  });

  it('should convert color into a canvas-ready color string', () => {
    const color = new Color(0, 0, 0, 1);

    expect(color.toString()).toEqual('rgba(0,0,0,1)');
  });

  it('should create red color', () => {
    const color = Color.RED;

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });

  it('should create green color', () => {
    const color = Color.GREEN;

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });

  it('should create blue color', () => {
    const color = Color.BLUE;

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should create white color', () => {
    const color = Color.WHITE;

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should create black color', () => {
    const color = Color.BLACK;

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });
});
