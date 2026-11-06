import { Color } from './Color';
import { describe, expect, it } from 'vitest';

describe('Color', () => {
  it('should default to fully-opaque white color', () => {
    const color = new Color();

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should clamp red value up to 0', () => {
    const color = new Color({
      r: Number.MIN_SAFE_INTEGER,
    });

    expect(color.r).toEqual(0);
  });

  it('should clamp red value down to 255', () => {
    const color = new Color({
      r: Number.MAX_SAFE_INTEGER,
    });

    expect(color.r).toEqual(255);
  });

  it('should clamp green value up to 0', () => {
    const color = new Color({
      g: Number.MIN_SAFE_INTEGER,
    });

    expect(color.g).toEqual(0);
  });

  it('should clamp green value down to 255', () => {
    const color = new Color({
      g: Number.MAX_SAFE_INTEGER,
    });

    expect(color.g).toEqual(255);
  });

  it('should clamp blue value up to 0', () => {
    const color = new Color({
      b: Number.MIN_SAFE_INTEGER,
    });

    expect(color.b).toEqual(0);
  });

  it('should clamp blue value down to 255', () => {
    const color = new Color({
      b: Number.MAX_SAFE_INTEGER,
    });

    expect(color.b).toEqual(255);
  });

  it('should clamp alpha value up to 0', () => {
    const color = new Color({
      a: Number.MIN_SAFE_INTEGER,
    });

    expect(color.a).toEqual(0);
  });

  it('should clamp alpha value down to 1', () => {
    const color = new Color({
      a: Number.MAX_SAFE_INTEGER,
    });

    expect(color.a).toEqual(1);
  });

  it('should convert color into a canvas-ready color string', () => {
    const color = new Color();

    expect(color.toString()).toEqual('rgba(255,255,255,1)');
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
