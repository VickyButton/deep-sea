import { describe, expect, it } from 'vitest';
import { ColorRGB, ColorRGBA } from './Colors';

describe('ColorRGB', () => {
  it('should set RGB components', () => {
    const color = new ColorRGB();

    color.set(100, 100, 100);

    expect(color.r).toBe(100);
    expect(color.g).toBe(100);
    expect(color.b).toBe(100);
  });

  it('should clamp RGB values', () => {
    const color = new ColorRGB(-1, -1, -1);

    expect(color.r).toBe(0);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);

    color.set(256, 256, 256);

    expect(color.r).toBe(255);
    expect(color.g).toBe(255);
    expect(color.b).toBe(255);
  });

  it('should compare RGB equality', () => {
    expect(ColorRGB.black.equalsRgb(ColorRGB.white)).toBe(false);
    expect(ColorRGB.black.equalsRgb(ColorRGB.black)).toBe(true);
  });

  it('should convert color to RGB string', () => {
    const color = ColorRGBA.black;

    expect(color.toString()).toBe('rgb(0,0,0)');
  });
});

describe('ColorRGBA', () => {
  it('should set alpha component', () => {
    const color = new ColorRGBA();

    color.set(0, 0, 0, 0.5);

    expect(color.a).toBe(0.5);
  });

  it('should clamp alpha value', () => {
    const color = new ColorRGBA(0, 0, 0, -1);

    expect(color.a).toBe(0);

    color.set(0, 0, 0, 2);

    expect(color.a).toBe(1);
  });

  it('should compare RGBA equality', () => {
    const color1 = ColorRGBA.black;
    const color2 = ColorRGBA.black;

    expect(color1.equalsRgba(color2)).toBe(true);

    color1.a = 0;

    expect(color1.equalsRgba(color2)).toBe(false);
  });

  it('should convert color to RGBA string', () => {
    const color = ColorRGBA.black;

    expect(color.toString()).toBe('rgba(0,0,0,1)');
  });
});
