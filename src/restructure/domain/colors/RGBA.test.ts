import { RGBA } from './RGBA';
import { describe, expect, it } from 'vitest';

describe('RGBA', () => {
  it('should default to fully-opaque white color', () => {
    const color = new RGBA();

    expect(color.r).toEqual(255);
    expect(color.g).toEqual(255);
    expect(color.b).toEqual(255);
    expect(color.a).toEqual(1);
  });

  it('should clamp red value up to 0', () => {
    const color = new RGBA({
      r: Number.MIN_SAFE_INTEGER,
    });

    expect(color.r).toEqual(0);
  });

  it('should clamp red value down to 255', () => {
    const color = new RGBA({
      r: Number.MAX_SAFE_INTEGER,
    });

    expect(color.r).toEqual(255);
  });

  it('should clamp green value up to 0', () => {
    const color = new RGBA({
      g: Number.MIN_SAFE_INTEGER,
    });

    expect(color.g).toEqual(0);
  });

  it('should clamp green value down to 255', () => {
    const color = new RGBA({
      g: Number.MAX_SAFE_INTEGER,
    });

    expect(color.g).toEqual(255);
  });

  it('should clamp blue value up to 0', () => {
    const color = new RGBA({
      b: Number.MIN_SAFE_INTEGER,
    });

    expect(color.b).toEqual(0);
  });

  it('should clamp blue value down to 255', () => {
    const color = new RGBA({
      b: Number.MAX_SAFE_INTEGER,
    });

    expect(color.b).toEqual(255);
  });

  it('should clamp alpha value up to 0', () => {
    const color = new RGBA({
      a: Number.MIN_SAFE_INTEGER,
    });

    expect(color.a).toEqual(0);
  });

  it('should clamp alpha value down to 1', () => {
    const color = new RGBA({
      a: Number.MAX_SAFE_INTEGER,
    });

    expect(color.a).toEqual(1);
  });

  it('should convert color into a canvas-ready color string', () => {
    const color = new RGBA();

    expect(color.toString()).toEqual('rgba(255,255,255,1)');
  });
});
