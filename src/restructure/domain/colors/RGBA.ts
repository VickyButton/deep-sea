import { Color } from './Color';
import { clamp } from '../../utils/clamp';

const COLOR_COMPONENT_MIN = 0;
const COLOR_COMPONENT_MAX = 255;
const ALPHA_COMPONENT_MIN = 0;
const ALPHA_COMPONENT_MAX = 1;

export class RGBA extends Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;

  constructor(options?: RGBA_Options) {
    super();

    this._r = options?.r !== undefined ? this.clampColorComponent(options.r) : COLOR_COMPONENT_MAX;
    this._g = options?.g !== undefined ? this.clampColorComponent(options.g) : COLOR_COMPONENT_MAX;
    this._b = options?.b !== undefined ? this.clampColorComponent(options.b) : COLOR_COMPONENT_MAX;
    this._a = options?.a !== undefined ? this.clampAlphaComponent(options.a) : ALPHA_COMPONENT_MAX;
  }

  /** The color's red value, ranging from 0 to 255 inclusive. */
  public get r() {
    return this._r;
  }

  public set r(r: number) {
    this._r = this.clampColorComponent(r);
  }

  /** The color's green value, ranging from 0 to 255 inclusive. */
  public get g() {
    return this._g;
  }

  public set g(g: number) {
    this._g = this.clampColorComponent(g);
  }

  /** The color's blue value, ranging from 0 to 255 inclusive. */
  public get b() {
    return this._b;
  }

  public set b(b: number) {
    this._b = this.clampColorComponent(b);
  }

  private clampColorComponent(value: number) {
    return clamp(value, COLOR_COMPONENT_MIN, COLOR_COMPONENT_MAX);
  }

  /** The color's alpha value, ranging from 0 to 1 inclusive. */
  public get a() {
    return this._a;
  }

  public set a(a: number) {
    this._a = this.clampAlphaComponent(a);
  }

  private clampAlphaComponent(value: number) {
    return clamp(value, ALPHA_COMPONENT_MIN, ALPHA_COMPONENT_MAX);
  }

  public toString() {
    return `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }

  public static get RED() {
    return new RGBA({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });
  }

  public static get GREEN() {
    return new RGBA({
      r: 0,
      g: 255,
      b: 0,
      a: 1,
    });
  }

  public static get BLUE() {
    return new RGBA({
      r: 0,
      g: 0,
      b: 255,
      a: 1,
    });
  }

  public static get WHITE() {
    return new RGBA({
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    });
  }

  public static get BLACK() {
    return new RGBA({
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    });
  }
}

export interface RGBA_Options {
  r?: number;
  g?: number;
  b?: number;
  a?: number;
}
