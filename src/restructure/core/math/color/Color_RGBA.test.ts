import { Color_RGBA } from './Color_RGBA';
import { describe, expect, it } from 'vitest';

describe('Color_RGBA', () => {
  it('should default to fully-opaque white color', () => {
    const color = new Color_RGBA();

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should clamp red value up to 0', () => {
    const color = new Color_RGBA({
      r: Number.MIN_SAFE_INTEGER,
    });

    expect(color.r).toEqual(0);
  });

  it('should clamp red value down to 255', () => {
    const color = new Color_RGBA({
      r: Number.MAX_SAFE_INTEGER,
    });

    expect(color.r).toEqual(255);
  });

  it('should clamp green value up to 0', () => {
    const color = new Color_RGBA({
      g: Number.MIN_SAFE_INTEGER,
    });

    expect(color.g).toEqual(0);
  });

  it('should clamp green value down to 255', () => {
    const color = new Color_RGBA({
      g: Number.MAX_SAFE_INTEGER,
    });

    expect(color.g).toEqual(255);
  });

  it('should clamp blue value up to 0', () => {
    const color = new Color_RGBA({
      b: Number.MIN_SAFE_INTEGER,
    });

    expect(color.b).toEqual(0);
  });

  it('should clamp blue value down to 255', () => {
    const color = new Color_RGBA({
      b: Number.MAX_SAFE_INTEGER,
    });

    expect(color.b).toEqual(255);
  });

  it('should clamp alpha value up to 0', () => {
    const color = new Color_RGBA({
      a: Number.MIN_SAFE_INTEGER,
    });

    expect(color.a).toEqual(0);
  });

  it('should clamp alpha value down to 1', () => {
    const color = new Color_RGBA({
      a: Number.MAX_SAFE_INTEGER,
    });

    expect(color.a).toEqual(1);
  });

  it('should convert color into a canvas-ready color string', () => {
    const color = new Color_RGBA();

    expect(color.toString()).toEqual('rgba(255,255,255,1)');
  });

  it('should create red color', () => {
    const color = Color_RGBA.RED;

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });

  it('should create green color', () => {
    const color = Color_RGBA.GREEN;

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });

  it('should create blue color', () => {
    const color = Color_RGBA.BLUE;

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should create white color', () => {
    const color = Color_RGBA.WHITE;

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should create black color', () => {
    const color = Color_RGBA.BLACK;

    expect(color.r).toEqual(0);
    expect(color.g).toEqual(0);
    expect(color.b).toEqual(0);
    expect(color.a).toEqual(1);
  });
});
